import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { publicRoutes, authRoutes, adminRoutes } from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { MEDIA_DIR, MEDIA_URL } from './config/storage.js';
import { restoreFromDatabase } from './utils/mediaStore.js';

const app = express();
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' }, contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.CLIENT_URL?.split(',') || '*' }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

// images, videos and brochures from server/media; an uploaded file missing on disk
// (fresh Render deploy) is rebuilt from the database copy on its first request
app.use(MEDIA_URL, express.static(MEDIA_DIR, { maxAge: '30d', fallthrough: true }), restoreFromDatabase);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Production: serve the built React app (client/dist) from the same server
const CLIENT_DIST = path.resolve(MEDIA_DIR, '../../client/dist');
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST, { index: false, maxAge: '7d' }));
  app.get(/^\/(?!api\/|media\/).*/, (req, res) => res.sendFile(path.join(CLIENT_DIST, 'index.html')));
}

app.use(notFound);
app.use(errorHandler);
export default app;
