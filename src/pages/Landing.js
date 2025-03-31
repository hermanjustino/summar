import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-indigo-900">
            Your Digital Presence, <span className="text-indigo-600">Perfected</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-700">
            Summar combines AI-powered content generation with personal branding tools to give you a complete digital presence solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Get Started Free
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-lg text-lg font-medium hover:bg-indigo-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Your Complete Digital Presence Solution</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">AI-Powered Content</h3>
              <p className="text-gray-700">
                Generate engaging, on-brand content for any platform with our Gemini 1.5 AI integration.
              </p>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Brand Consistency</h3>
              <p className="text-gray-700">
                Maintain a cohesive digital identity across all your online channels and platforms.
              </p>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Performance Analytics</h3>
              <p className="text-gray-700">
                Track engagement and optimize your content strategy with detailed analytics.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the professionals who trust Summar to manage their digital identity.
          </p>
          <Link 
            to="/register" 
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
