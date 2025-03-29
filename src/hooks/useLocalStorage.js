import { useState, useEffect } from 'react';

/**
 * Custom hook for using localStorage with React state
 * @param {string} key - Local storage key
 * @param {any} initialValue - Initial value if key is not found
 * @returns {[any, Function]} Current value and setter function
 */
const useLocalStorage = (key, initialValue) => {
  // Get stored value or initialize
  const readValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  // Update localStorage when storedValue changes
  const setValue = (value) => {
    try {
      // Allow value to be a function so we can use the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
      // Dispatch a custom event so other instances can update
      window.dispatchEvent(new Event('local-storage-update'));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes across instances/tabs
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        setStoredValue(readValue());
      }
    };
    
    // Listen for storage events (for cross-tab synchronization)
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage-update', readValue);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-update', readValue);
    };
  }, [key]);

  return [storedValue, setValue];
};

export default useLocalStorage;
