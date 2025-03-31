import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-xl font-bold">Summar</Link>
            <p className="text-sm text-gray-400 mt-1">Your personalized digital presence in a box</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/about" className="text-sm text-gray-300 hover:text-white">About</Link>
            <Link to="/privacy" className="text-sm text-gray-300 hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-300 hover:text-white">Terms of Service</Link>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700 text-center text-sm text-gray-400">
          &copy; {year} Summar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
