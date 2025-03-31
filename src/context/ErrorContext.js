import React, { createContext, useContext, useState, useCallback } from 'react';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [globalError, setGlobalError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  
  const clearErrors = useCallback(() => {
    setGlobalError(null);
    setFieldErrors({});
  }, []);
  
  const handleError = useCallback((error) => {
    // Clear previous errors
    clearErrors();
    
    console.error('Error occurred:', error);
    
    // Handle Axios errors
    if (error.response) {
      const { data, status } = error.response;
      
      // Handle validation errors (typically 400)
      if (status === 400 && data.errors) {
        // Set field-specific errors if provided
        if (Array.isArray(data.errors)) {
          const errorMap = data.errors.reduce((acc, err) => {
            acc[err.field] = err.message;
            return acc;
          }, {});
          setFieldErrors(errorMap);
        }
        
        setGlobalError(data.message || 'Validation failed. Please check your input.');
        return;
      }
      
      // Handle authentication errors
      if (status === 401) {
        setGlobalError('Authentication failed. Please log in again.');
        // Optionally trigger a logout here
        return;
      }
      
      // Handle authorization errors
      if (status === 403) {
        setGlobalError('You do not have permission to perform this action.');
        return;
      }
      
      // Handle not found errors
      if (status === 404) {
        setGlobalError('The requested resource was not found.');
        return;
      }
      
      // Handle server errors
      if (status >= 500) {
        setGlobalError('Server error. Please try again later.');
        return;
      }
      
      // Default error message for other status codes
      setGlobalError(data.message || 'An error occurred. Please try again.');
    } else if (error.request) {
      // Network error (no response received)
      setGlobalError('Network error. Please check your connection and try again.');
    } else {
      // Default error handling
      setGlobalError(error.message || 'An unexpected error occurred.');
    }
  }, [clearErrors]);
  
  return (
    <ErrorContext.Provider value={{
      globalError,
      fieldErrors,
      handleError,
      clearErrors,
    }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

export default ErrorContext;
