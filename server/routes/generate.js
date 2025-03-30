const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * @route   POST api/generate
 * @desc    Generate AI content suggestions
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  try {
    const { prompt, contentType } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }
    
    // Initialize the Gemini API
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      return res.status(500).json({ message: 'API key not configured' });
    }
    
    console.log(`Processing generation request: ${contentType} - "${prompt.substring(0, 30)}..."`);
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    
    // Prepare the generation prompt based on content type
    let generationPrompt;
    if (contentType === 'summary') {
      generationPrompt = `Please summarize the following text in a concise but comprehensive manner:\n\n${prompt}`;
    } else if (contentType === 'social') {
      generationPrompt = `Generate engaging social media posts based on this content:\n\n${prompt}\n\nProvide one post each for Twitter, LinkedIn, and Instagram.`;
    } else if (contentType === 'blog') {
      generationPrompt = `Generate a blog post outline based on this topic:\n\n${prompt}`;
    } else if (contentType === 'email') {
      generationPrompt = `Write a professional email based on this prompt:\n\n${prompt}`;
    } else {
      generationPrompt = prompt;
    }
    
    // Generate content
    console.log(`Generating ${contentType} content with prompt: ${prompt.substring(0, 50)}...`);
    const result = await model.generateContent(generationPrompt);
    const generatedText = result.response.text();
    
    console.log(`Successfully generated content (${generatedText.length} chars)`);
    
    res.json({
      message: 'Content generated successfully',
      content: generatedText,
      contentType
    });
  } catch (error) {
    console.error('Content generation error:', error);
    res.status(500).json({ 
      message: 'Server error during content generation',
      error: error.message
    });
  }
});

module.exports = router;
