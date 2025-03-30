import React, { useEffect } from 'react';
import { useContent } from '../context/ContentContext';

const Library = () => {
  const { content, isLoading, refreshContent } = useContent();

  // Refresh content when component mounts
  useEffect(() => {
    refreshContent();
  }, []);

  // Helper function to safely format dates
  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    try {
      const date = new Date(dateString);
      return isNaN(date) ? "Invalid date" : date.toLocaleDateString();
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Date error";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading content...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Content Library</h1>
        <button 
          onClick={refreshContent}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>
      
      {content.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">Your content library is empty.</p>
          <p className="mt-2">Add some content from the Dashboard to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item) => (
            <div key={item._id || item.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-2">
                  {formatDate(item.createdAt)}
                </p>
                
                <div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded inline-block mb-3">
                  {item.contentType || 'general'}
                </div>
                
                {item.originalContent && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-700 font-medium">Original:</p>
                    <p className="text-gray-600 text-sm line-clamp-2">{item.originalContent}</p>
                  </div>
                )}
                
                {item.generatedContent && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-700 font-medium">Generated:</p>
                    <p className="text-gray-600 text-sm line-clamp-3">{item.generatedContent}</p>
                  </div>
                )}
                
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
