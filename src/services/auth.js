import axios from 'axios';
import { setToken, setUser, getToken, removeToken, removeUser } from './storage';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

/**
 * Set up axios interceptors to include auth token in all requests
 */
export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Object} User data and token
 */
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    const { user, token } = response.data;
    
    // Save auth data to storage
    setToken(token);
    setUser(user);
    
    return user;
  } catch (error) {
    const message = error.response?.data?.message || 'Registration failed';
    throw new Error(message);
  }
};

/**
 * Log in a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} User data
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { user, token } = response.data;
    
    // Save auth data to storage
    setToken(token);
    setUser(user);
    
    return user;
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';
    throw new Error(message);
  }
};

/**
 * Log out the current user
 */
export const logout = () => {
  removeToken();
  removeUser();
};

/**
 * Get current user from storage
 * @returns {Object|null} User data
 */
export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('summar_user'));
  } catch (error) {
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = () => {
  return !!getToken();
};
