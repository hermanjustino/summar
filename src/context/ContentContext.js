import React, { createContext, useState, useContext, useEffect } from 'react';

// Sample initial content - will be replaced with API data
const initialContent = [
  {
    id: '1',
    title: 'How AI is Transforming Data Science',
    description: 'LinkedIn article about the latest trends in AI and their impact on data science roles.',
    tags: ['LinkedIn', 'AI'],
    dateAdded: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    url: 'https://example.com/ai-data-science'
  }
];

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addContent = (newContent) => {
    setContent(prev => [
      {
        id: Date.now().toString(),
        dateAdded: new Date(),
        ...newContent
      },
      ...prev
    ]);
  };

  const generatePost = (contentId) => {
    // Placeholder for API call to generate posts
    console.log(`Generating post for content ID: ${contentId}`);
    // This will be replaced with actual API integration
  };

  // Future methods: fetchContent, deleteContent, updateContent

  return (
    <ContentContext.Provider value={{ 
      content, 
      isLoading, 
      error, 
      addContent,
      generatePost
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
