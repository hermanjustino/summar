import axios from 'axios';
import { setToken, getToken, setUser, getUser, clearAuth } from './storage';

// API URL (would normally come from environment variable)
const API_URL = 'http://localhost:5000/api';

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User data
 */
export const login = async (email, password) => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    
    // Mock successful login response
    const mockResponse = {
      data: {
        token: 'mock-jwt-token',
        user: {
          id: '123',
          name: 'Test User',
          email,
          createdAt: new Date().toISOString()
        }
      }
    };
    
    // Store authentication data
    setToken(mockResponse.data.token);
    setUser(mockResponse.data.user);
    
    return mockResponse.data.user;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || 'Failed to login');
  }
};

/**
 * Register new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} User data
 */
export const register = async (userData) => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const response = await axios.post(`${API_URL}/auth/register`, userData);
    
    // Mock successful registration response
    const mockResponse = {
      data: {
        token: 'mock-jwt-token',
        user: {
          id: '123',
          name: userData.name,
          email: userData.email,
          createdAt: new Date().toISOString()
        }
      }
    };
    
    // Store authentication data
    setToken(mockResponse.data.token);
    setUser(mockResponse.data.user);
    
    return mockResponse.data.user;
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error(error.response?.data?.message || 'Failed to register');
  }
};

/**
 * Logout user
 */
export const logout = () => {
  clearAuth();
};

/**
 * Check if user is authenticated
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Get current user
 * @returns {Object|null} User data
 */
export const getCurrentUser = () => {
  return getUser();
};

/**
 * Configure axios to add auth token to all requests
 */
export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};
