// Media files live in server/media and are served at /media/... by the API server.
// Set VITE_MEDIA_URL (e.g. https://api.example.com) only when the API runs on a different domain.
const MEDIA_BASE = (import.meta.env.VITE_MEDIA_URL || '').replace(/\/$/, '');

export const mediaUrl = (url) => (url && MEDIA_BASE && url.startsWith('/media/') ? MEDIA_BASE + url : url);

// Downloadable documents (brochures) rather than images
export const isFileUrl = (url = '') => /\.(pdf|zip)(\?|$)/i.test(url);
export const isFile = (m) => m?.type === 'file' || isFileUrl(m?.url);

export const isVideo = (m) => m?.type === 'video' || /\.(mp4|webm|mov)(\?|$)/i.test(m?.url || '');
