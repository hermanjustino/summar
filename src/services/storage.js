/**
 * Local storage service for storing and retrieving data
 */

const TOKEN_KEY = 'summar_auth_token';
const USER_KEY = 'summar_user';

/**
 * Set token in local storage
 * @param {string} token - JWT token
 */
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Get token from local storage
 * @returns {string|null} JWT token
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove token from local storage
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Set user data in local storage
 * @param {Object} userData - User data
 */
export const setUser = (userData) => {
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
};

/**
 * Get user data from local storage
 * @returns {Object|null} User data
 */
export const getUser = () => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Remove user data from local storage
 */
export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

/**
 * Clear all authentication data
 */
export const clearAuth = () => {
  removeToken();
  removeUser();
};
