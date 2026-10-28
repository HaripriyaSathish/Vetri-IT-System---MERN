import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// always server/.env, whichever folder the server is started from (no file on Render: env vars are used)
dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../.env') });
