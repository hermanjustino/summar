const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  originalContent: {
    type: String,
    required: true
  },
  generatedContent: {
    type: String,
    default: ''
  },
  contentType: {
    type: String,
    enum: {
      values: ['summary', 'social', 'blog', 'email', 'other'],
      message: 'Content type must be one of: summary, social, blog, email, or other'
    },
    default: 'other'
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('content', ContentSchema);
