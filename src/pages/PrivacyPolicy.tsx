import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Shield, Database, Share2, Lock, Clock, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: 1,
      title: "Introduction",
      icon: <Shield className="w-6 h-6 text-brand-green" />,
      content: (
        <div className="text-gray-600 text-sm leading-relaxed">
          <p className="mb-3">
            Food Connect ("we," "our," or "us") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our platform to connect
            surplus food with those in need.
          </p>
          <p>
            By accessing or using Food Connect, you agree to this Privacy
            Policy. If you do not agree with our policies and practices, please
            do not use our platform.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Information We Collect",
      icon: <Database className="w-6 h-6 text-brand-green" />,
      content: (
        <div className="text-gray-600 text-sm leading-relaxed">
          <p className="mb-3">
            We collect several types of information from and about users of our
            platform, including:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, and location when you register for an account.
            </li>
            <li>
              <strong>Organization Information:</strong> For donors and
              recipients, we collect organization name, address, registration
              details, and food handling certifications.
            </li>
            <li>
              <strong>Food Donation Data:</strong> Details about food items,
              quantities, expiration dates, and pickup/delivery information.
            </li>
            <li>
              <strong>Usage Information:</strong> How you interact with our
              platform, including pages visited, features used, and time spent.
            </li>
            <li>
              <strong>Device Information:</strong> IP address, browser type,
              operating system, and device identifiers.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 3,
      title: "How We Use Your Information",
      icon: <Share2 className="w-6 h-6 text-brand-green" />,
      content: (
        <div className="text-gray-600 text-sm leading-relaxed">
          <p className="mb-3">We use the information we collect to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Facilitate connections between food donors and recipient
              organizations
            </li>
            <li>Process and manage food donations and requests</li>
            <li>Verify the identity and credentials of users</li>
            <li>Send notifications about food availability and requests</li>
            <li>Improve our platform and user experience</li>
            <li>
              Generate anonymous statistics and reports on food waste reduction
            </li>
            <li>
              Comply with legal obligations and enforce our terms of service
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 4,
      title: "Information Sharing",
      icon: <Share2 className="w-6 h-6 text-brand-green" />,
      content: (
        <div className="text-gray-600 text-sm leading-relaxed">
          <p className="mb-3">We may share your information with:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Other Users:</strong> To facilitate food donations, we
              share relevant information between donors and recipients.
            </li>
            <li>
              <strong>Service Providers:</strong> Third parties who assist us in
              operating our platform, such as payment processors and analytics
              providers.
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law, such as
              in response to a subpoena or court order.
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with a merger,
              acquisition, or sale of assets.
            </li>
          </ul>
          <p className="mt-3">
            We do not sell your personal information to third parties for
            marketing purposes.
          </p>
        </div>
      ),
    },
    {
      id: 5,
      title: "Data Security",
      icon: <Lock className="w-6 h-6 text-brand-green" />,
      content: (
        <div className="text-gray-600 text-sm leading-relaxed">
          <p className="mb-3">
            We implement appropriate technical and organizational measures to
            protect your information against unauthorized access, alteration,
            disclosure, or destruction. However, no method of transmission over
            the Internet or electronic storage is 100% secure.
          </p>
          <p>
            While we strive to protect your personal information, we cannot
            guarantee its absolute security. You are responsible for maintaining
            the confidentiality of your account credentials.
          </p>
        </div>
      ),
    },
    {
      id: 6,
      title: "Data Retention",
      icon: <Clock className="w-6 h-6 text-brand-green" />,
      content: (
        <div className="text-gray-600 text-sm leading-relaxed">
          <p className="mb-3">
            We retain your personal information for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required by law.
          </p>
          <p>
            When we no longer need to use your information, we will remove it
            from our systems or anonymize it so that it can no longer be
            associated with you.
          </p>
        </div>
      ),
    },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 via-white to-brand-blue/10"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark"
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-gray-600 mb-2"
            >
              Last updated: March 15, 2024
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 mb-6 shadow-soft"
              >
                <div className="flex items-start mb-4">
                  <div className="mr-4 mt-1">{section.icon}</div>
                  <h2 className="text-xl font-bold text-brand-dark">
                    {section.title}
                  </h2>
                </div>
                <div className="pl-10">{section.content}</div>
              </motion.div>
            ))}

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-soft text-center"
            >
              <div className="flex justify-center mb-4">
                <Mail className="w-6 h-6 text-brand-green" />
              </div>
              <h2 className="text-xl font-bold text-brand-dark mb-2">
                Contact Us
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <a
                href="mailto:privacy@foodconnect.in"
                className="text-brand-green font-medium hover:text-brand-green/80 transition-colors"
              >
                privacy@foodconnect.in
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PrivacyPolicy;
