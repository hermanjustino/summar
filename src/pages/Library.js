import React from 'react';
import { useContent } from '../context/ContentContext';

const Library = () => {
  const { content, isLoading } = useContent();

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
      <h1 className="text-2xl font-bold mb-6">Content Library</h1>
      
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
                
                {item.description && (
                  <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                )}
                
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {item.url && (
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View original content
                  </a>
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
