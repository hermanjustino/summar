import api from './api';

/**
 * Get all content for the logged-in user
 * @returns {Promise} Promise object representing the user's content
 */
export const getUserContent = async () => {
  try {
    const response = await api.get('/api/content');
    return response.data;
  } catch (error) {
    console.error('Error fetching content:', error);
    throw error;
  }
};

/**
 * Create new content
 * @param {Object} contentData - Content data to create
 * @returns {Promise} Promise object representing the created content
 */
export const createContent = async (contentData) => {
  try {
    const response = await api.post('/api/content', contentData);
    return response.data;
  } catch (error) {
    console.error('Error creating content:', error);
    throw error;
  }
};

/**
 * Update existing content
 * @param {string} id - Content ID to update
 * @param {Object} contentData - Updated content data
 * @returns {Promise} Promise object representing the updated content
 */
export const updateContent = async (id, contentData) => {
  try {
    const response = await api.put(`/api/content/${id}`, contentData);
    return response.data;
  } catch (error) {
    console.error('Error updating content:', error);
    throw error;
  }
};

/**
 * Delete content
 * @param {string} id - Content ID to delete
 * @returns {Promise} Promise object representing the delete operation
 */
export const deleteContent = async (id) => {
  try {
    const response = await api.delete(`/api/content/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting content:', error);
    throw error;
  }
};
