import React, { useEffect } from 'react';
import ContentGenerator from '../components/content/ContentGenerator';
import ContentList from '../components/content/ContentList';
import { useContent } from '../context/ContentContext';

const Generated = () => {
  const { content, isLoading, error, refreshContent } = useContent();
  
  // Refresh content when component mounts
  useEffect(() => {
    refreshContent();
  }, []);
  
  // Filter to only show AI-generated content - updated to use contentType instead of type
  const generatedContent = content.filter(item => 
    item.contentType === 'summary' || 
    item.contentType === 'social' || 
    item.contentType === 'blog' || 
    item.contentType === 'email' || 
    item.contentType === 'other'
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">AI Content Generator</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ContentGenerator />
        </div>
        
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Generated Content</h2>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          ) : generatedContent.length === 0 ? (
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
              <p className="dark:text-white">No generated content yet. Try creating some!</p>
            </div>
          ) : (
            <ContentList content={generatedContent} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Generated;
