import React from 'react';

const Generated = () => {
  // This would typically come from a context or API
  const generatedPosts = [];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Generated Posts</h1>
      
      {generatedPosts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">You don't have any generated posts yet.</p>
          <p className="mt-2">Go to your content library to generate posts.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Generated posts will be rendered here */}
        </div>
      )}
    </div>
  );
};

export default Generated;
