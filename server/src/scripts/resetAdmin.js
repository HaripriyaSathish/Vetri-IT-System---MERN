// Resets the admin password to ADMIN_USERNAME / ADMIN_PASSWORD from .env
import { initDatabase } from '../config/db.js';
import pool from '../config/db.js';
import { resetAdminFromEnv } from '../controllers/authController.js';

await initDatabase();
const username = await resetAdminFromEnv();
console.log(`✅ Admin password reset from .env for user: ${username}`);
await pool.end();
