const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import database connection
const connectDB = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to database
connectDB();

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'connected' });
});

// Register route handlers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/content', require('./routes/content'));
app.use('/api/generate', require('./routes/generate'));

const PORT = process.env.PORT || 5001;

// Try to start server with better error handling
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Try using a different port.`);
      // Try alternative port
      const altPort = parseInt(PORT) + 1;
      console.log(`Attempting to use port ${altPort} instead...`);
      app.listen(altPort, () => {
        console.log(`Server running on alternative port ${altPort}`);
      });
    } else {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
  }
};

startServer();
