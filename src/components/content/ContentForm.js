import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';

const ContentForm = () => {
  const { addContent, isLoading, error } = useContent();
  const [formData, setFormData] = useState({
    title: '',
    originalContent: '',
    contentType: 'other',
    url: '',
    tags: [],
    isPublic: false
  });
  const [tagInput, setTagInput] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const addTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    // Validate required fields
    if (!formData.title || !formData.originalContent) {
      return; // Form validation will show errors
    }

    try {
      await addContent(formData);
      
      // Reset form on success
      setFormData({
        title: '',
        originalContent: '',
        contentType: 'other',
        url: '',
        tags: [],
        isPublic: false
      });
      
      setSuccessMessage('Content added successfully!');
    } catch (err) {
      // Error is handled by ContentContext
      console.error("Content form error:", err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Content</h2>
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
          {successMessage}
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Title for your content"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Content Type</label>
          <select
            name="contentType"
            value={formData.contentType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="other">Other</option>
            <option value="summary">Summary</option>
            <option value="social">Social Media</option>
            <option value="blog">Blog Post</option>
            <option value="email">Email</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Content *</label>
          <textarea
            name="originalContent"
            value={formData.originalContent}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter or paste your content here"
            required
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">URL</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="https://example.com/article"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Tags</label>
          <div className="flex">
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-l-lg"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
            >
              Add
            </button>
          </div>
          
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-2 py-1 rounded flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-gray-500 hover:text-red-500"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-gray-700">Make this content public</span>
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:bg-blue-400"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : 'Add Content'}
        </button>
      </form>
    </div>
  );
};

export default ContentForm;
