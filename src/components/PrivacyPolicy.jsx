/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header Section */}
      <header className="bg-[#1E3A8A] text-white py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm md:text-base opacity-90">
            Effective Date: March 03, 2025
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          {/* Introduction */}
          <article className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
              1. Introduction
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              At Marcom("we," "us," or "our"), we value your privacy and are dedicated to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, share, and protect your data when you access our news content website marcom.com, including our articles, videos, newsletters, and related services. By using our Services, you agree to the practices described in this policy.
            </p>
          </article>

          {/* Information We Collect */}
          <article className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
              2. Information We Collect
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              We collect various types of information to deliver timely news, enhance user experience, and support our operations:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-3 text-sm md:text-base">
              <li>
                <strong>Personal Information:</strong> Information you voluntarily provide, such as your name, email address, or payment details when subscribing to premium content, signing up for newsletters, or submitting feedback.
              </li>
              <li>
                <strong>Automatically Collected Data:</strong> Device information (e.g., IP address, browser type, operating system), browsing behavior (e.g., pages viewed, articles read, time spent), and referral sources.
              </li>
              <li>
                <strong>Location Information:</strong> General location derived from your IP address or precise location if you opt into location-based features (e.g., local news alerts).
              </li>
              <li>
                <strong>User-Generated Content:</strong> Comments, forum posts, or other contributions you make on our platform.
              </li>
            </ul>
          </article>

          {/* How We Use Your Information */}
          <article className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
              3. How We Use Your Information
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              We use your information to provide and improve our news services, including:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-3 text-sm md:text-base">
              <li>Delivering news articles, videos, and updates relevant to your interests.</li>
              <li>Personalizing your experience, such as recommending stories or sending tailored notifications.</li>
              <li>Processing subscriptions or transactions for premium content.</li>
              <li>Analyzing usage patterns to optimize our website and content offerings.</li>
              <li>Communicating with you, including responding to inquiries and sending news alerts (with your consent).</li>
            </ul>
          </article>

          {/* Information Sharing */}
          <article className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
              4. How We Share Your Information
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              We do not sell your personal information to third parties. We may share it under these circumstances:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-3 text-sm md:text-base">
              <li>
                <strong>Service Providers:</strong> With trusted partners who assist with hosting, analytics, payment processing, or advertising services, bound by confidentiality agreements.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When compelled by law, court order, or to protect our rights, property, or safety of our users.
              </li>
              <li>
                <strong>Advertising Partners:</strong> Aggregated or anonymized data may be shared for targeted advertising, with your consent where required.
              </li>
            </ul>
          </article>

          {/* Cookies and Tracking */}
          <article className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
              5. Cookies and Tracking Technologies
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              We use cookies, pixels, and similar technologies to improve functionality, track usage, and deliver personalized ads. You can control cookie preferences via our consent popup or your browser settings. Essential cookies are required for the Services to function, while optional ones (e.g., for analytics or ads) depend on your approval.
            </p>
          </article>

          {/* Your Choices and Rights */}
          <article className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
              6. Your Choices and Rights
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              You have control over your information and certain rights, including:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-3 text-sm md:text-base">
              <li>Unsubscribing from newsletters or notifications via the provided link.</li>
              <li>Requesting access to, correction of, or deletion of your personal data.</li>
              <li>Opting out of personalized ads or data sharing where applicable.</li>
              <li>Exercising additional rights under laws like GDPR or CCPA, if you reside in those regions.</li>
            </ul>
            <p className="mt-3 text-sm md:text-base">
              To make a request, contact us using our form
              <a
                href="mailto:privacy@[domain].com"
                className="text-blue-600 hover:underline pl-1"
              >
             <Link to="/contact-us">here</Link>
              </a>.
            </p>
          </article>

          {/* Data Security */}
          <article className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
              7. Data Security
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              We employ robust security measures, such as encryption and access controls, to protect your data. However, no online system is entirely immune to risks, and we strive to promptly address any incidents.
            </p>
          </article>

          {/* Third-Party Links */}
          <article className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
              8. Third-Party Links
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              Our Services may link to external sites (e.g., sources cited in articles). We are not responsible for their privacy practices and recommend reviewing their policies before engaging.
            </p>
          </article>

          {/* Children’s Privacy */}
          {/* <article className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
              9. Children’s Privacy
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              Our Services are not intended for children under 13 (or 16 in some jurisdictions). We do not knowingly collect personal information from minors. If you believe we have, please contact us immediately.
            </p>
          </article> */}

          {/* Updates to Policy */}
          <article className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
              9. Updates to This Privacy Policy
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              We may revise this policy as needed. Updates will be posted here with a revised "Effective Date." Significant changes will be communicated via email or a website notice if you’re a subscriber.
            </p>
          </article>
{/* 
          Contact Us
          <article className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
              11. Contact Us
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              For questions, concerns, or to exercise your rights, reach out to us:
            </p>
            <ul className="list-none pl-0 mt-3 space-y-3 text-sm md:text-base">
              <li>
                Email:{" "}
                <a
                  href="mailto:privacy@[domain].com"
                  className="text-blue-600 hover:underline"
                >
                  privacy@[domain].com
                </a>
              </li>
              <li>Phone: +1-800-NEWS-456</li>
              <li>Address: [News Website Name], 456 Press Street, Media City, MC 67890</li>
            </ul>
          </article> */}
        </section>

        {/* Navigation Back */}
        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-block bg-[#1E3A8A] text-white py-2 px-6 rounded-md hover:bg-blue-900 transition-all duration-300 shadow-md"
          >
            Return to Homepage
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 py-4 text-center text-sm text-gray-600">
        <p>© 2025 Marcom. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;