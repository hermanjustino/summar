const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['article', 'podcast', 'video', 'book', 'summary', 'social', 'blog', 'general', 'other'],
    default: 'article'
  },
  url: {
    type: String,
    trim: true
  },
  tags: [String],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Add fields specific to AI-generated content
  originalPrompt: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;
