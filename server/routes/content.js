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
    
    const newContent = new Content({
      title,
      description,
      type,
      url,
      tags,
      userId: req.userId
    });
    
    const savedContent = await newContent.save();
    res.status(201).json(savedContent);
  } catch (error) {
    console.error('Content creation error:', error);
    res.status(500).json({ message: 'Server error during content creation' });
  }
});

module.exports = router;
