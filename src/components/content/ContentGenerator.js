import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useAI } from '../../context/AIContext';
import axios from 'axios';
import { getToken } from '../../services/storage';

const ContentGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('other'); // Changed from 'general' to 'other'
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const { addContent, refreshContent } = useContent();
  const { generateContent } = useAI();
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    setResult(null);
    
    try {
      console.log('Generating content with:', { prompt, contentType });
      
      // Get token for authorization
      const currentToken = getToken();
      if (!currentToken) {
        throw new Error('Authentication token not found');
      }
      
      // Call the backend API for content generation
      const response = await axios.post(`${API_URL}/generate`, 
        { prompt, contentType }, 
        { headers: { Authorization: `Bearer ${currentToken}` }}
      );
      
      console.log('Generation response:', response.data);
      
      const generatedText = response.data.content;
      
      if (!generatedText) {
        throw new Error('No content was generated');
      }
      
      setResult(generatedText);
      
      // Save the generated content with proper field mapping for server model
      const newContent = {
        title: prompt.substring(0, 50) + (prompt.length > 50 ? '...' : ''),
        originalContent: prompt,
        generatedContent: generatedText,
        contentType: contentType, // This must match schema enum: 'summary', 'social', 'blog', 'email', 'other'
        isPublic: false,
        tags: ["ai-generated", contentType]
      };
      
      console.log('Saving content:', newContent);
      const savedContent = await addContent(newContent);
      console.log('Content saved:', savedContent);
      
      // Refresh content list to show the new item
      await refreshContent();
      
      // Clear the form after successful generation
      setPrompt('');
    } catch (err) {
      console.error("Generation error:", err);
      console.error("Error details:", err.response?.data);
      setError(err.response?.data?.message || err.message || 'Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Generate Content</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Content Type
          </label>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="summary">Text Summary</option>
            <option value="social">Social Media Posts</option>
            <option value="blog">Blog Post</option>
            <option value="email">Email</option>
            <option value="other">Other Content</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            {contentType === 'summary' ? 'Text to Summarize' : 'Your Prompt'}
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={contentType === 'summary' 
              ? "Paste the text you want to summarize..." 
              : "Describe the content you want to generate..."}
          ></textarea>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {result && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
            <p className="font-medium mb-1">Generated Content:</p>
            <p className="text-sm whitespace-pre-line">{result.slice(0, 150)}...</p>
            <p className="text-xs text-green-600 mt-1">Successfully saved to your library!</p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : 'Generate Content'}
        </button>
      </form>
    </div>
  );
};

export default ContentGenerator;
