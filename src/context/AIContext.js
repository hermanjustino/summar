import React, { createContext, useContext, useState } from 'react';
import aiService from '../services/ai';

const AIContext = createContext();

export const AIProvider = ({ children }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [error, setError] = useState(null);
  
  const generateContent = async (prompt, options) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const content = await aiService.generateContent(prompt, options);
      setGeneratedContent(content);
      return content;
    } catch (err) {
      setError(err.message || 'Failed to generate content');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };
  
  const summarizeContent = async (text) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const summary = await aiService.summarizeContent(text);
      return summary;
    } catch (err) {
      setError(err.message || 'Failed to summarize content');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };
  
  const generateSocialPosts = async (content, platforms) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const posts = await aiService.generateSocialPosts(content, platforms);
      return posts;
    } catch (err) {
      setError(err.message || 'Failed to generate social posts');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <AIContext.Provider value={{
      isGenerating,
      generatedContent,
      error,
      generateContent,
      summarizeContent,
      generateSocialPosts
    }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

export default AIContext;
