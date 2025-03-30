/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Server error:', err.stack);
  
  res.status(err.statusCode || 500).json({
    message: err.message || 'An unexpected error occurred',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
};

module.exports = errorHandler;
