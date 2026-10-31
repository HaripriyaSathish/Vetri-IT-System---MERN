import './config/env.js';
import app from './app.js';
import { initDatabase } from './config/db.js';
import { ensureAdmin } from './controllers/authController.js';
import { seedIfEmpty } from './db/seed.js';
import { registerSiteFiles } from './utils/mediaStore.js';
import { checkMailer } from './utils/sendEmail.js';

const PORT = process.env.PORT || 5000;

try {
  await initDatabase();
  await ensureAdmin();
  await seedIfEmpty();
  await registerSiteFiles();
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  checkMailer();
} catch (err) {
  console.error('❌ Startup failed:', err.message);
  process.exit(1);
}
