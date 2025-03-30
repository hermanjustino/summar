import React from 'react';

const ContentList = ({ content }) => {
  // Helper function for formatting dates
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

  return (
    <div className="space-y-4">
      {content.map((item) => (
        <div 
          key={item._id || item.id} 
          className="bg-white dark:bg-gray-700 rounded-lg shadow p-4"
        >
          <h3 className="font-bold text-lg mb-2 dark:text-white">{item.title}</h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-300 mb-2 flex items-center justify-between">
            <span>{formatDate(item.createdAt)}</span>
            <span className="capitalize px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
              {item.type}
            </span>
          </div>
          
          {item.description && (
            <div className="mt-3 mb-4">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {item.description}
              </p>
            </div>
          )}
          
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {item.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContentList;
