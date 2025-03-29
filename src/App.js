import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Placeholder components - will move to separate files later
const Dashboard = () => <div className="p-4">Dashboard Content</div>;
const ContentLibrary = () => <div className="p-4">Content Library</div>;
const GeneratedPosts = () => <div className="p-4">Generated Posts</div>;
const Profile = () => <div className="p-4">User Profile</div>;

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-indigo-600">Summar</h1>
            <nav>
              <ul className="flex space-x-6">
                <li><Link to="/" className="text-gray-600 hover:text-indigo-600">Dashboard</Link></li>
                <li><Link to="/library" className="text-gray-600 hover:text-indigo-600">Content Library</Link></li>
                <li><Link to="/posts" className="text-gray-600 hover:text-indigo-600">Generated Posts</Link></li>
                <li><Link to="/profile" className="text-gray-600 hover:text-indigo-600">Profile</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/library" element={<ContentLibrary />} />
            <Route path="/posts" element={<GeneratedPosts />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        
        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4">
            <p className="text-center">© 2025 Summar - Your Personal Content & Social Media Assistant</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;