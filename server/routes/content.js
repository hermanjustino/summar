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
    const content = await Content.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST api/content
 * @desc    Add new content
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  const { title, originalContent, contentType, generatedContent, isPublic, tags } = req.body;

  try {
    console.log('Creating content with type:', contentType);
    
    // Validate contentType against schema enum
    const validContentTypes = ['summary', 'social', 'blog', 'email', 'other'];
    if (!validContentTypes.includes(contentType)) {
      return res.status(400).json({ 
        message: `Invalid content type: ${contentType}. Must be one of: ${validContentTypes.join(', ')}`
      });
    }
    
    const newContent = new Content({
      title,
      originalContent,
      contentType,
      generatedContent,
      isPublic,
      tags,
      user: req.user.id
    });

    const content = await newContent.save();
    res.json(content);
  } catch (err) {
    // Improved error logging with validation errors
    console.error('Content creation error:', err);
    
    // Better error details for validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ 
        message: 'Validation Error', 
        errors 
      });
    }
    
    res.status(500).json({ 
      message: 'Server Error', 
      error: err.message 
    });
  }
});

/**
 * @route   PUT api/content/:id
 * @desc    Update content
 * @access  Private
 */
router.put('/:id', auth, async (req, res) => {
  const updates = { ...req.body, updatedAt: Date.now() };

  try {
    let content = await Content.findById(req.params.id);

    if (!content) return res.status(404).json({ msg: 'Content not found' });
    
    // Make sure user owns content
    if (content.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    content = await Content.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   DELETE api/content/:id
 * @desc    Delete content
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    let content = await Content.findById(req.params.id);

    if (!content) return res.status(404).json({ msg: 'Content not found' });

    // Make sure user owns content
    if (content.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Content.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Content removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
