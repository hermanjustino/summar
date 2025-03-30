import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { getToken } from '../services/storage';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, isAuthenticated } = useAuth();

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

  // Fetch content when component mounts or when auth token changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchContent();
    }
  }, [isAuthenticated]);

  const fetchContent = async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const currentToken = token || getToken(); // Get token from context or storage as backup
      
      const response = await axios.get(`${API_URL}/content`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      setContent(response.data);
    } catch (err) {
      console.error('Error fetching content:', err);
      setError('Failed to load your content. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const addContent = async (newContent) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get token directly from storage as a backup
      const currentToken = token || getToken();
      
      if (!currentToken) {
        throw new Error('Authentication token not found');
      }
      
      // Save to backend first
      const response = await axios.post(`${API_URL}/content`, newContent, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      
      // Update local state with the response from server (includes ID and timestamp)
      setContent(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      console.error('Error adding content:', err);
      setError('Failed to save your content. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const generatePost = async (contentId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This will be connected to your backend generate endpoint
      const response = await axios.post(`${API_URL}/generate`, { contentId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      console.error('Error generating posts:', err);
      setError('Failed to generate posts. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      isLoading, 
      error, 
      addContent,
      generatePost,
      refreshContent: fetchContent
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
