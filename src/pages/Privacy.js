import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 mb-6 text-sm">Last Updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            At Summar, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and 
            safeguard your information when you use our platform. Please read this policy carefully. By using Summar, 
            you consent to the data practices described in this statement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
          <h3 className="text-lg font-medium mt-4 mb-2">Personal Information</h3>
          <p className="mb-3">We may collect personal information that you voluntarily provide when creating an account or using our services, including:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Profile information</li>
            <li>Payment information</li>
          </ul>

          <h3 className="text-lg font-medium mt-4 mb-2">Content Information</h3>
          <p className="mb-3">To provide our services, we collect and process content you upload or create using our platform, including:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>Text and media content you upload</li>
            <li>Content you generate using our AI tools</li>
            <li>Interactions with the platform features</li>
          </ul>

          <h3 className="text-lg font-medium mt-4 mb-2">Automatically Collected Information</h3>
          <p className="mb-3">We may collect certain information automatically when you use our platform:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>Device information (type, operating system, browser)</li>
            <li>IP address and location data</li>
            <li>Usage data and interaction with our services</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-3">We use the information we collect for various purposes, including:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>Providing and maintaining our services</li>
            <li>Personalizing your experience</li>
            <li>Processing transactions</li>
            <li>Improving our AI models and algorithms</li>
            <li>Communicating with you about our services</li>
            <li>Analyzing usage patterns to improve our platform</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Data Sharing and Disclosure</h2>
          <p className="mb-3">We may share your information with:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>Service providers who help us deliver our services</li>
            <li>Analytics and advertising partners</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners with your consent</li>
          </ul>
          <p className="mb-4">
            We use Google's Gemini 1.5 AI technology, and some information may be processed by Google in accordance 
            with their privacy policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal information. However, no method of 
            transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
          <p className="mb-3">Depending on your location, you may have rights regarding your personal information, including:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>Accessing your personal information</li>
            <li>Correcting inaccurate information</li>
            <li>Deleting your personal information</li>
            <li>Restricting or objecting to processing</li>
            <li>Data portability</li>
            <li>Withdrawing consent</li>
          </ul>
          <p className="mb-4">
            To exercise these rights, please contact us using the information provided in the "Contact Us" section.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new 
            policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            <a href="mailto:privacy@summar.app" className="text-indigo-600 hover:underline">privacy@summar.app</a>
          </p>
        </section>

        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
