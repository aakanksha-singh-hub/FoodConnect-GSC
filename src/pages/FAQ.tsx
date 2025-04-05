import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("general");

  const faqCategories = [
    {
      id: "general",
      name: "General Questions",
      icon: "ℹ️",
    },
    {
      id: "donors",
      name: "For Donors",
      icon: "🍽️",
    },
    {
      id: "recipients",
      name: "For Recipients",
      icon: "🤝",
    },
    {
      id: "technical",
      name: "Technical Support",
      icon: "🔧",
    },
  ];

  const faqItems = {
    general: [
      {
        id: 1,
        question: "What is Food Connect?",
        answer:
          "Food Connect is a platform that connects surplus food from donors (restaurants, grocery stores, farms, etc.) to those in need through verified recipient organizations. Our mission is to reduce food waste while fighting hunger in communities across India.",
      },
      {
        id: 2,
        question: "How does Food Connect work?",
        answer:
          "Food Connect works through a simple process: 1) Donors post available surplus food on our platform, 2) Recipient organizations browse available donations, 3) Recipients request donations that match their needs, 4) Donors approve requests, and 5) Food is collected and distributed to those in need. Our platform handles the logistics, tracking, and communication throughout the process.",
      },
      {
        id: 3,
        question: "Is Food Connect available in my area?",
        answer:
          "Food Connect is currently operational in major cities across India, including Mumbai, Delhi, Bangalore, Chennai, Hyderabad, and Kolkata. We are continuously expanding our network to reach more communities. You can check availability in your area by entering your location on our website.",
      },
      {
        id: 4,
        question: "Is Food Connect a non-profit organization?",
        answer:
          "Yes, Food Connect is registered as a non-profit organization under Section 8 of the Companies Act, 2013. Our primary goal is to reduce food waste and fight hunger, not to generate profits. Any surplus funds are reinvested into improving our platform and expanding our reach.",
      },
      {
        id: 5,
        question: "How can I get involved with Food Connect?",
        answer:
          "There are several ways to get involved with Food Connect: 1) As a food donor (restaurant, grocery store, etc.), 2) As a recipient organization (NGO, shelter, etc.), 3) As a volunteer to help with food collection and distribution, 4) As a partner organization to help us expand our network. Visit our 'Get Involved' page to learn more about each opportunity.",
      },
    ],
    donors: [
      {
        id: 6,
        question: "Who can donate food through Food Connect?",
        answer:
          "Food Connect accepts donations from various food businesses including restaurants, cafes, grocery stores, bakeries, food manufacturers, farms, and event venues. All donors must meet our food safety standards and be able to provide information about the food being donated.",
      },
      {
        id: 7,
        question: "What types of food can be donated?",
        answer:
          "We accept a wide range of food items including prepared meals, fresh produce, dairy products, bakery items, packaged foods, and more. All donated food must be safe for consumption and meet our quality standards. We do not accept food that has been served to customers, opened packages, or items past their expiration date.",
      },
      {
        id: 8,
        question: "Is there a cost to donate food?",
        answer:
          "No, there is no cost to donate food through Food Connect. Our platform is free for donors to use. We believe that reducing food waste and helping those in need should be accessible to all businesses.",
      },
      {
        id: 9,
        question: "How do I register as a food donor?",
        answer:
          "To register as a food donor, visit our website and click on 'Become a Donor.' You'll need to create an account, provide information about your business, and complete our verification process. Once approved, you can start posting available food donations on our platform.",
      },
      {
        id: 10,
        question: "What are the tax benefits of donating food?",
        answer:
          "In India, businesses that donate food to registered charitable organizations may be eligible for tax benefits under Section 80G of the Income Tax Act. Food Connect can provide documentation to help you claim these benefits. We recommend consulting with your tax advisor for specific guidance.",
      },
    ],
    recipients: [
      {
        id: 11,
        question: "Who can receive food through Food Connect?",
        answer:
          "Food Connect partners with verified non-profit organizations, food banks, shelters, community kitchens, and other charitable institutions that serve those experiencing food insecurity. We do not distribute food directly to individuals.",
      },
      {
        id: 12,
        question: "How can my organization become a recipient?",
        answer:
          "To become a recipient organization, you must register on our platform and complete our verification process. This includes providing documentation of your non-profit status, food handling certifications, and information about the communities you serve. Our team will review your application and guide you through the onboarding process.",
      },
      {
        id: 13,
        question: "How quickly can I receive food after requesting it?",
        answer:
          "Most food donations are available for pickup within 24 hours of posting. The exact timing depends on the donor's availability and the type of food being donated. Our platform allows you to coordinate pickup times directly with donors to ensure food is collected at its freshest.",
      },
      {
        id: 14,
        question: "What are my responsibilities as a recipient organization?",
        answer:
          "As a recipient organization, you are responsible for: 1) Picking up food donations at the agreed time, 2) Ensuring proper storage and handling of received food, 3) Distributing food to those in need promptly, 4) Providing feedback on the quality and quantity of received donations, 5) Maintaining accurate records of food distribution.",
      },
      {
        id: 15,
        question: "Can I specify the types of food I need?",
        answer:
          "Yes, you can set preferences for the types of food you need on your recipient profile. This helps us match you with relevant donations. You can also browse available donations and request specific items that match your needs.",
      },
    ],
    technical: [
      {
        id: 16,
        question: "How do I reset my password?",
        answer:
          "To reset your password, click on the 'Forgot Password' link on the login page. Enter your registered email address, and we'll send you instructions to create a new password. If you don't receive the email within a few minutes, please check your spam folder or contact our support team.",
      },
      {
        id: 17,
        question: "Can I use Food Connect on my mobile device?",
        answer:
          "Yes, Food Connect is fully responsive and works on all devices including smartphones and tablets. We also offer mobile apps for iOS and Android for a more streamlined experience. You can download our apps from the respective app stores.",
      },
      {
        id: 18,
        question: "How do I report an issue with the platform?",
        answer:
          "If you encounter any technical issues, you can report them through our support portal or by emailing support@foodconnect.in. Please provide as much detail as possible about the issue, including screenshots if applicable, to help our team resolve it quickly.",
      },
      {
        id: 19,
        question: "How is my data protected on Food Connect?",
        answer:
          "We take data protection seriously and implement industry-standard security measures to protect your information. This includes encryption of data in transit and at rest, regular security assessments, and strict access controls. For more details, please review our Privacy Policy.",
      },
      {
        id: 20,
        question: "Can I integrate Food Connect with my existing systems?",
        answer:
          "Yes, Food Connect offers API integration for businesses that want to connect their existing systems with our platform. This allows for automated posting of available food donations and streamlined communication with recipient organizations. Contact our technical team for more information.",
      },
    ],
  };

  const filteredFAQs = faqItems[
    selectedCategory as keyof typeof faqItems
  ].filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
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
              className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark"
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8"
            >
              Find answers to common questions about Food Connect and how our
              platform works.
            </motion.p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full px-5 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {faqCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`bg-white rounded-xl p-6 shadow-soft hover:shadow-hover transition-all duration-300 text-center cursor-pointer ${
                  selectedCategory === category.id
                    ? "ring-2 ring-brand-green"
                    : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-bold text-brand-dark">
                  {category.name}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-4"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300">
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center"
                      onClick={() => toggleFAQ(index)}
                    >
                      <h3 className="text-lg font-medium text-brand-dark">
                        {faq.question}
                      </h3>
                      {openIndex === index ? (
                        <ChevronUp className="text-brand-green" size={20} />
                      ) : (
                        <ChevronDown className="text-gray-400" size={20} />
                      )}
                    </button>
                    {openIndex === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            )}
          </div>

          {/* Contact Support */}
          <div className="max-w-3xl mx-auto mt-16 text-center">
            <h3 className="text-xl font-bold text-brand-dark mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you with any questions or
              concerns.
            </p>
            <a
              href="mailto:support@foodconnect.in"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-green text-white font-medium rounded-lg hover:bg-brand-green/90 transition-colors shadow-lg"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FAQ;
