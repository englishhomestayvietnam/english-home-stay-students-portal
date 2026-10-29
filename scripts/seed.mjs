import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to load DATABASE_URI from .env if not in process.env
function getDatabaseUri() {
  if (process.env.DATABASE_URI) return process.env.DATABASE_URI;
  const envPath = path.join(rootDir, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('DATABASE_URI=')) {
        return trimmed.replace('DATABASE_URI=', '').trim();
      }
    }
  }
  throw new Error('DATABASE_URI not found in environment or .env');
}

const { Pool } = pg;
const pool = new Pool({ connectionString: getDatabaseUri() });

async function seed() {
  console.log('🌱 Starting database seed for Users (final structure)...');

  const usersBackupPath = path.join(__dirname, 'users.json');
  if (!fs.existsSync(usersBackupPath)) {
    throw new Error(`Users backup file not found at: ${usersBackupPath}`);
  }

  const usersData = JSON.parse(fs.readFileSync(usersBackupPath, 'utf8'));
  console.log(`📋 Found ${usersData.length} administrator account(s) to seed.`);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (const user of usersData) {
      const name =
        user.email === 'englishhomestayvietnam02@gmail.com'
          ? 'EHV Admin'
          : 'English Homestay Admin';

      const query = `
        INSERT INTO users (
          id,
          email,
          name,
          role,
          status,
          salt,
          hash,
          xp,
          streak,
          badges,
          admin_notes,
          created_at,
          updated_at,
          login_attempts,
          lock_until
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
        )
        ON CONFLICT (id) DO UPDATE SET
          email = EXCLUDED.email,
          name = EXCLUDED.name,
          role = EXCLUDED.role,
          status = EXCLUDED.status,
          salt = EXCLUDED.salt,
          hash = EXCLUDED.hash,
          xp = EXCLUDED.xp,
          streak = EXCLUDED.streak,
          badges = EXCLUDED.badges,
          admin_notes = EXCLUDED.admin_notes,
          updated_at = NOW()
        RETURNING id, email, name, role, status, xp, streak, badges, admin_notes;
      `;

      const values = [
        user.id,
        user.email,
        name,
        'admin',
        'active',
        user.salt,
        user.hash,
        0, // xp
        0, // streak
        JSON.stringify([]), // badges
        'Official EHV Administrator account',
        user.created_at || new Date().toISOString(),
        user.updated_at || new Date().toISOString(),
        0,
        null,
      ];

      const res = await client.query(query, values);
      console.log(`✅ Seeded admin: ${res.rows[0].email} (Role: ${res.rows[0].role}, Status: ${res.rows[0].status})`);
    }

    // Ensure the auto-increment sequence is synced past existing IDs
    await client.query("SELECT setval('users_id_seq', COALESCE((SELECT MAX(id) FROM users), 1))");
    console.log('🔄 Synced users_id_seq sequence.');

    await client.query('COMMIT');
    console.log('✨ Database seeding completed successfully.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error during database seeding:', error);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((err) => {
  console.error('❌ Seed script failed:', err);
  process.exit(1);
});
