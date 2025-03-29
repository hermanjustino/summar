const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Content routes placeholder
app.get('/api/content', (req, res) => {
  // Will connect to MongoDB later
  res.json({ message: 'Content API placeholder' });
});

// AI generation endpoint placeholder
app.post('/api/generate', (req, res) => {
  // Will integrate with OpenAI later
  res.json({ 
    message: 'Post generation placeholder',
    platforms: {
      linkedin: 'Generated LinkedIn post content...',
      twitter: 'Generated Twitter post content...',
      instagram: 'Generated Instagram post caption...'
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
