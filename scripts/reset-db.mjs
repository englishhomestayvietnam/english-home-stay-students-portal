import pkg from '@next/env';
const { loadEnvConfig } = pkg;
import pg from 'pg';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

if (!process.env.DATABASE_URI) {
  console.error("Error: DATABASE_URI is not set in environment variables");
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URI
});

async function reset() {
  try {
    console.log("Connecting to database to reset...");
    await pool.query('DROP SCHEMA public CASCADE;');
    await pool.query('CREATE SCHEMA public;');
    await pool.query('GRANT ALL ON SCHEMA public TO postgres;');
    await pool.query('GRANT ALL ON SCHEMA public TO public;');
    console.log("✅ Database schema 'public' has been successfully dropped and recreated.");
  } catch (err) {
    console.error("❌ Error resetting database:", err);
  } finally {
    await pool.end();
  }
}

reset();
