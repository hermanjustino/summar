import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">About Summar</h1>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <p className="mb-4">
          Summar is your personalized digital presence in a box. We empower you to create, manage, and enhance your online identity across all platforms with minimal effort.
        </p>
        <p className="mb-4">
          Leveraging Google's Gemini 1.5 AI technology, Summar helps you maintain a consistent, professional, and engaging digital footprint that resonates with your audience.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Our Mission</h2>
        <p className="mb-4">
          We're dedicated to democratizing digital presence management by providing powerful, AI-driven tools that allow anyone to build and maintain a compelling online identity without requiring technical expertise.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Features</h2>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">All-in-one digital identity management</li>
          <li className="mb-2">AI-powered content creation and optimization</li>
          <li className="mb-2">Cross-platform consistency tools</li>
          <li className="mb-2">Audience engagement analytics</li>
          <li className="mb-2">Personal brand development assistance</li>
        </ul>
        
        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
