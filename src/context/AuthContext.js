import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as authService from '../services/auth';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOGOUT: 'LOGOUT',
  INIT_AUTH: 'INIT_AUTH'
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
        error: null
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: action.payload
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null
      };
    case AUTH_ACTIONS.INIT_AUTH:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        isLoading: false
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Setup axios interceptors
  useEffect(() => {
    authService.setupAxiosInterceptors();
  }, []);

  // Check for existing auth on mount
  useEffect(() => {
    const initAuth = () => {
      const user = authService.getCurrentUser();
      const isAuthenticated = authService.isAuthenticated();

      dispatch({
        type: AUTH_ACTIONS.INIT_AUTH,
        payload: { user, isAuthenticated }
      });
    };

    initAuth();
  }, []);

  // Login method
  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

    try {
      const user = await authService.login(email, password);
      dispatch({ 
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: user
      });
      return user;
    } catch (error) {
      dispatch({ 
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message
      });
      throw error;
    }
  };

  // Register method
  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START });

    try {
      const user = await authService.register(userData);
      dispatch({ 
        type: AUTH_ACTIONS.REGISTER_SUCCESS,
        payload: user
      });
      return user;
    } catch (error) {
      dispatch({ 
        type: AUTH_ACTIONS.REGISTER_FAILURE,
        payload: error.message
      });
      throw error;
    }
  };

  // Logout method
  const logout = () => {
    authService.logout();
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Context value
  const value = {
    ...state,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export the context for direct usage if needed
export { AuthContext };
