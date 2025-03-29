import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">Summar</Link>
        
        <nav>
          <ul className="flex space-x-6 items-center">
            {isAuthenticated ? (
              <>
                <li><Link to="/" className="text-gray-600 hover:text-indigo-600">Dashboard</Link></li>
                <li><Link to="/library" className="text-gray-600 hover:text-indigo-600">Content Library</Link></li>
                <li><Link to="/posts" className="text-gray-600 hover:text-indigo-600">Generated Posts</Link></li>
                <li>
                  <div className="relative group">
                    <button className="flex items-center text-gray-600 hover:text-indigo-600 focus:outline-none">
                      <span className="mr-1">{user?.name || 'User'}</span>
                      <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </button>
                    <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="py-1">
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Log Out
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="text-gray-600 hover:text-indigo-600">Log In</Link></li>
                <li>
                  <Link 
                    to="/register" 
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
