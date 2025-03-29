import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-6">
            <div className="bg-indigo-100 rounded-full p-3">
              <svg className="w-16 h-16 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold">{user?.name || 'User'}</h2>
              <p className="text-gray-600">{user?.email || 'email@example.com'}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
            
            <div className="space-y-4">
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                Change Password
              </button>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium block">
                Notification Settings
              </button>
              <button className="text-red-600 hover:text-red-800 font-medium block">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
