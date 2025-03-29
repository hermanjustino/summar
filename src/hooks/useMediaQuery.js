import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design
 * @param {string} query - Media query string (e.g. "(max-width: 768px)")
 * @returns {boolean} Whether the media query matches
 */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Update the state when the media query matches
    const updateMatch = () => {
      setMatches(media.matches);
    };

    // Set initial value
    updateMatch();
    
    // Listen for changes in the media query
    media.addEventListener('change', updateMatch);
    
    // Cleanup
    return () => {
      media.removeEventListener('change', updateMatch);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
