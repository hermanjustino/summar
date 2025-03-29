import React from 'react';
import { useContent } from '../context/ContentContext';

const Library = () => {
  const { content, isLoading } = useContent();

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
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.tags?.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="text-xs text-gray-500">
                  Added: {item.dateAdded.toLocaleDateString()}
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-100">
                <button 
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  onClick={() => {}} // Will add functionality later
                >
                  Generate Posts
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
