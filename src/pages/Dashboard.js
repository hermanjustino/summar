import React from 'react';
import ContentForm from '../components/content/ContentForm';

const Dashboard = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Content</h2>
        <ContentForm />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
