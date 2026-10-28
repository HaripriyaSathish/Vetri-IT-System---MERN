export const notFound = (req, res) => res.status(404).json({ message: `Not found: ${req.originalUrl}` });

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') err.status = 413;
  if (err.code === 'ER_DUP_ENTRY') { err.status = 409; err.message = 'An item with this slug/key already exists'; }
  if (!err.status || err.status >= 500) console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
};
