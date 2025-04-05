import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import {
  FileCheck,
  UserCheck,
  Shield,
  AlertTriangle,
  Scale,
  Copyright,
  Mail,
} from "lucide-react";

const TermsOfService = () => {
  const sections = [
    {
      id: 1,
      title: "Agreement to Terms",
      icon: <FileCheck className="w-6 h-6 text-brand-green" />,
      content: (
        <div className="text-gray-600 text-sm leading-relaxed">
          <p className="mb-3">
            By accessing or using Food Connect, you agree to be bound by these
            Terms of Service. If you disagree with any part of these terms, you
            may not access or use our platform.
          </p>
          <p>
            These Terms of Service apply to all visitors, users, and others who
            access or use Food Connect. By using our platform, you represent and
            warrant that you have the right, authority, and capacity to agree to
            and abide by these Terms.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Eligibility",
      icon: <UserCheck className="w-6 h-6 text-brand-green" />,
      content: (
        <div className="text-gray-600 text-sm leading-relaxed">
          <p className="mb-3">
            To use Food Connect, you must be at least 18 years old and have the
            legal capacity to enter into a binding contract. If you are using
            our platform on behalf of an organization, you represent and warrant
            that you have the authority to bind that organization to these
            Terms.
          </p>
          <p>By using Food Connect, you represent and warrant that:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>You are at least 18 years old</li>
            <li>
              You have the legal capacity to enter into a binding contract
            </li>
            <li>You will comply with all applicable laws and regulations</li>
            <li>
              You will not use our platform for any illegal or unauthorized
              purpose
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 3,
      title: "User Responsibilities",
      icon: <Shield className="w-6 h-6 text-brand-green" />,
      content: (
        <div className="text-gray-600 text-sm leading-relaxed">
          <p className="mb-3">
            As a user of Food Connect, you are responsible for:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Account Security:</strong> Maintaining the confidentiality
              of your account credentials and for all activities that occur
              under your account.
            </li>
            <li>
              <strong>Accurate Information:</strong> Providing accurate,
              current, and complete information when registering and using our
              platform.
            </li>
            <li>
              <strong>Food Safety:</strong> Ensuring that any food you donate or
              distribute meets all applicable food safety standards and
              regulations.
            </li>
            <li>
              <strong>Compliance:</strong> Complying with all applicable laws,
              regulations, and these Terms of Service.
            </li>
            <li>
              <strong>Communication:</strong> Responding promptly to
              communications from other users and from Food Connect.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 4,
      title: "Food Safety Standards",
      icon: <AlertTriangle className="w-6 h-6 text-brand-green" />,
      content: (
        <div className="text-gray-600 text-sm leading-relaxed">
          <p className="mb-3">
            Food safety is our top priority. All food donations must meet the
            following standards:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Freshness:</strong> Food must be within its expiration
              date and suitable for consumption.
            </li>
            <li>
              <strong>Storage:</strong> Food must be stored at appropriate
              temperatures and in suitable conditions.
            </li>
            <li>
              <strong>Packaging:</strong> Food must be properly packaged to
              prevent contamination.
            </li>
            <li>
              <strong>Handling:</strong> Food must be handled according to food
              safety guidelines.
            </li>
            <li>
              <strong>Documentation:</strong> Donors must provide accurate
              information about the food being donated.
            </li>
          </ul>
          <p className="mt-3">
            Food Connect reserves the right to reject any food donation that
            does not meet these standards.
          </p>
        </div>
      ),
    },
    {
      id: 5,
      title: "Liability and Disclaimers",
      icon: <Scale className="w-6 h-6 text-brand-green" />,
      content: (
        <div className="text-gray-600 text-sm leading-relaxed">
          <p className="mb-3">
            Food Connect acts as a platform connecting food donors with
            recipient organizations. We do not:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Guarantee the quality, safety, or suitability of donated food
            </li>
            <li>Verify the accuracy of all information provided by users</li>
            <li>
              Assume responsibility for the actions of users on our platform
            </li>
            <li>Endorse any specific donor or recipient organization</li>
          </ul>
          <p className="mt-3">
            To the maximum extent permitted by law, Food Connect shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages resulting from your use or inability to use our
            platform.
          </p>
        </div>
      ),
    },
    {
      id: 6,
      title: "Intellectual Property",
      icon: <Copyright className="w-6 h-6 text-brand-green" />,
      content: (
        <div className="text-gray-600 text-sm leading-relaxed">
          <p className="mb-3">
            The Food Connect platform, including its name, logo, design,
            content, and functionality, is owned by Food Connect and is
            protected by copyright, trademark, and other intellectual property
            laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works
            of, publicly display, publicly perform, republish, download, store,
            or transmit any of the material on our platform without our prior
            written consent.
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
              Terms of Service
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
                If you have any questions about these Terms of Service, please
                contact us at:
              </p>
              <a
                href="mailto:legal@foodconnect.in"
                className="text-brand-green font-medium hover:text-brand-green/80 transition-colors"
              >
                legal@foodconnect.in
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TermsOfService;
