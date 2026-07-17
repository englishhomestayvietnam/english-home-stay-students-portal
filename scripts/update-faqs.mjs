import pkg from '@next/env';
const { loadEnvConfig } = pkg;
import pg from 'pg';
import fs from 'fs';
import path from 'path';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

if (!process.env.DATABASE_URI) {
  console.error("Error: DATABASE_URI is not set in environment variables");
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URI
});

async function run() {
  try {
    console.log("Connecting to database to update FAQs...");
    
    // Read the translated FAQs
    const faqsFile = fs.readFileSync(path.join(projectDir, 'faq-seed.json'), 'utf8');
    const faqs = JSON.parse(faqsFile);
    
    // Delete existing FAQs
    await pool.query('DELETE FROM "faqs";');
    console.log("Deleted old FAQs.");
    
    // Insert new FAQs
    for (const faq of faqs) {
      const now = new Date().toISOString();
      await pool.query(
        'INSERT INTO "faqs" ("category", "question", "answer", "updated_at", "created_at") VALUES ($1, $2, $3, $4, $5)',
        [faq.category, faq.question, faq.answer, now, now]
      );
    }
    
    console.log(`✅ Successfully inserted ${faqs.length} bilingual FAQs into the database.`);
  } catch (err) {
    console.error("❌ Error updating FAQs:", err);
  } finally {
    await pool.end();
  }
}

run();
