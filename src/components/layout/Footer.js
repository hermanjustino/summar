import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">Summar</p>
            <p className="text-gray-400">Your Personal Content & Social Media Assistant</p>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
            <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy</Link>
            <Link to="/terms" className="text-gray-300 hover:text-white">Terms</Link>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Summar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
