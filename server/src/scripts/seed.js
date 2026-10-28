// npm run seed            -> fills empty tables only
// npm run seed -- --force -> resets Home page content to the SEO defaults
import { initDatabase } from '../config/db.js';
import pool from '../config/db.js';
import { seedIfEmpty } from '../db/seed.js';

await initDatabase();
await seedIfEmpty({ force: process.argv.includes('--force') });
console.log('✅ Seed complete');
await pool.end();
