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

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'connected' });
});

// Auth routes
app.use('/api/auth', require('./routes/auth'));

// Content routes placeholder
app.get('/api/content', (req, res) => {
  // Will connect to MongoDB later
  res.json({ message: 'Content API placeholder' });
});

// AI generation endpoint placeholder
app.post('/api/generate', (req, res) => {
  // Will integrate with Gemini 1.5 later
  res.json({ 
    message: 'Post generation placeholder',
    platforms: {
      linkedin: 'Generated LinkedIn post content...',
      twitter: 'Generated Twitter post content...',
      instagram: 'Generated Instagram post caption...'
    }
  });
});

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
