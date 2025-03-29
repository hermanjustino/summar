import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';

const ContentForm = () => {
  const { addContent, isLoading } = useContent();
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleNotesChange = (e) => setNotes(e.target.value);

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newContent = {
      title: url ? new URL(url).hostname : file?.name || 'Untitled Content',
      description: notes,
      tags,
      url: url || null,
      file: file || null,
    };
    
    addContent(newContent);
    setUrl('');
    setFile(null);
    setNotes('');
    setTags([]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">URL or Spotify Link</label>
        <input 
          type="text" 
          value={url}
          onChange={handleUrlChange}
          className="w-full px-4 py-2 border rounded-lg" 
          placeholder="Paste URL here..."
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Or Upload Media</label>
        <input 
          type="file" 
          onChange={handleFileChange}
          className="block w-full text-gray-700"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Your Notes or Thoughts</label>
        <textarea 
          value={notes}
          onChange={handleNotesChange}
          className="w-full px-4 py-2 border rounded-lg" 
          rows="3"
          placeholder="What did you think about this content?"
        ></textarea>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Tags</label>
        <div className="flex items-center">
          <input 
            type="text" 
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg" 
            placeholder="Add a tag..."
          />
          <button 
            type="button"
            onClick={addTag}
            className="ml-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Add
          </button>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <div key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded flex items-center">
              <span>{tag}</span>
              <button 
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-indigo-600 hover:text-indigo-800"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        type="submit"
        disabled={isLoading || (!url && !file)}
        className={`${
          isLoading || (!url && !file) ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
        } text-white px-6 py-2 rounded-lg`}
      >
        {isLoading ? 'Importing...' : 'Import Content'}
      </button>
    </form>
  );
};

export default ContentForm;
