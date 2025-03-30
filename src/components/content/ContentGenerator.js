import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import axios from 'axios';
import { getToken } from '../../services/storage';

const ContentGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('general');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const { addContent } = useContent();
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
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
      
      const generatedText = response.data.content;
      
      // Save the generated content
      if (generatedText) {
        await addContent({
          title: prompt.substring(0, 50) + (prompt.length > 50 ? '...' : ''),
          description: generatedText,
          type: contentType === 'general' ? 'article' : contentType,
          url: "",
          tags: ["ai-generated", contentType]
        });
      }
    } catch (err) {
      console.error("Generation error:", err);
      setError(err.response?.data?.message || 'Failed to generate content. Please try again.');
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
            <option value="general">General Content</option>
            <option value="summary">Text Summary</option>
            <option value="social">Social Media Posts</option>
            <option value="blog">Blog Post</option>
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
          <div className="mb-4 text-red-500 dark:text-red-400">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:bg-blue-400"
        >
          {isGenerating ? 'Generating...' : 'Generate Content'}
        </button>
      </form>
    </div>
  );
};

export default ContentGenerator;
