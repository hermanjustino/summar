import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Terms of Service</h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 mb-6 text-sm">Last Updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing or using Summar ("the Service"), you agree to be bound by these Terms of Service. If you do not 
            agree to these terms, please do not use the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
          <p className="mb-4">
            Summar is a personalized digital presence platform that uses AI technology to help users create, manage, and 
            enhance their online identity across platforms. The Service includes content generation, management tools, and 
            analytics features.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. User Registration and Account</h2>
          <p className="mb-3">
            To use certain features of the Service, you must register for an account. You agree to:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your password and account</li>
            <li>Accept responsibility for all activities that occur under your account</li>
            <li>Notify us immediately of any unauthorized use</li>
          </ul>
          <p className="mb-4">
            We reserve the right to suspend or terminate accounts that violate these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. User Content</h2>
          <p className="mb-3">
            You retain ownership of content you upload to the Service. By submitting content, you grant us a worldwide, 
            non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content for the purpose of 
            providing and improving the Service.
          </p>
          <p className="mb-4">
            You agree not to upload content that:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>Infringes on intellectual property rights</li>
            <li>Contains illegal, harmful, or offensive material</li>
            <li>Contains malware or destructive code</li>
            <li>Violates any applicable laws or regulations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. AI-Generated Content</h2>
          <p className="mb-3">
            Our Service uses Google's Gemini 1.5 AI technology to generate content. Regarding AI-generated content:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>You are responsible for reviewing and editing all AI-generated content before use</li>
            <li>We do not guarantee the accuracy, appropriateness, or quality of AI-generated content</li>
            <li>You retain rights to content generated based on your inputs, subject to our license terms</li>
            <li>AI-generated content should comply with applicable laws and platform guidelines</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Subscription and Payment</h2>
          <p className="mb-3">
            Some features of the Service may require a paid subscription. By subscribing:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>You agree to pay all fees associated with your subscription plan</li>
            <li>Subscriptions automatically renew unless canceled before the renewal date</li>
            <li>We may change pricing with notice before your next billing cycle</li>
            <li>Refunds are subject to our refund policy</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">7. Intellectual Property</h2>
          <p className="mb-4">
            The Service, including its design, features, and content (excluding User Content), is owned by Summar and 
            is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, 
            distribute, sell, or lease any part of the Service without our explicit permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">8. Limitation of Liability</h2>
          <p className="mb-4">
            To the maximum extent permitted by law, Summar shall not be liable for any indirect, incidental, special, 
            consequential, or punitive damages resulting from your use or inability to use the Service. In no event 
            shall our total liability exceed the amount you paid for the Service in the twelve months preceding the claim.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">9. Disclaimer of Warranties</h2>
          <p className="mb-4">
            The Service is provided "as is" without warranties of any kind, either express or implied. We do not warrant 
            that the Service will be uninterrupted, secure, or error-free, or that any content will be accurate or appropriate.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">10. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account and access to the Service at our discretion, without notice, 
            for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, 
            or for any other reason.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">11. Changes to Terms</h2>
          <p className="mb-4">
            We may modify these Terms at any time by posting the revised terms on our website. Your continued use of 
            the Service after such changes constitutes acceptance of the new Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">12. Governing Law</h2>
          <p className="mb-4">
            These Terms shall be governed by the laws of [Your Jurisdiction], without regard to its conflict of law principles.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">13. Contact</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at:
            <br />
            <a href="mailto:legal@summar.app" className="text-indigo-600 hover:underline">legal@summar.app</a>
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

export default Terms;
