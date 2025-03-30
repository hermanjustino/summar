const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Content = require('../models/Content');
const mongoose = require('mongoose');

/**
 * @route   GET api/content
 * @desc    Get all content for the authenticated user
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const contents = await Content.find({ userId: req.userId });
    res.json(contents);
  } catch (error) {
    console.error('Content retrieval error:', error);
    res.status(500).json({ message: 'Server error during content retrieval' });
  }
});

/**
 * @route   POST api/content
 * @desc    Add new content
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, type, url, tags } = req.body;
    
    console.log('Content creation request:', req.body);
    
    // Validate required fields
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    const newContent = new Content({
      title,
      description: description || '',
      type: type || 'article',
      url: url || '',
      tags: Array.isArray(tags) ? tags : [],
      userId: req.userId
    });
    
    const savedContent = await newContent.save();
    console.log('Content saved successfully:', savedContent._id);
    res.status(201).json(savedContent);
  } catch (error) {
    console.error('Content creation error details:', error);
    
    // Detailed error response
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error', 
        details: messages 
      });
    }
    
    res.status(500).json({ 
      message: 'Server error during content creation',
      error: error.message
    });
  }
});

module.exports = router;
