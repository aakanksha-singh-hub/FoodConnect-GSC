import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Github,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
  Heart,
} from "lucide-react";
import { useState } from "react";
import SubscriptionAlert from "./SubscriptionAlert";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to subscribe the user
    // For now, we'll just show the success alert
    setShowAlert(true);
    setEmail("");
    // Hide the alert after 5 seconds
    setTimeout(() => setShowAlert(false), 5000);
  };

  // Function to scroll to top of page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Function to handle link clicks
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only scroll to top if it's an internal link
    if (e.currentTarget.getAttribute("href")?.startsWith("/")) {
      scrollToTop();
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-100 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-green/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-brand-blue/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* About Section */}
          <div className="space-y-5">
            <Link
              to="/"
              className="inline-flex items-center space-x-3 group"
              onClick={handleLinkClick}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-brand-green text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                FC
              </div>
              <span className="font-display font-bold text-2xl text-white group-hover:text-brand-green transition-colors">
                Food Connect
              </span>
            </Link>
            <p className="text-gray-300 leading-relaxed">
              Connecting surplus food to those who need it most, reducing waste
              and fighting hunger together.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-brand-green hover:text-white transition-all duration-300 shadow-md"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-brand-green hover:text-white transition-all duration-300 shadow-md"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-brand-green hover:text-white transition-all duration-300 shadow-md"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold relative inline-block text-white pb-2">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-brand-green rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/how-it-works"
                  className="text-gray-300 hover:text-white flex items-center group transition-colors py-1"
                  onClick={handleLinkClick}
                >
                  <ArrowRight className="w-4 h-4 mr-2 text-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>How It Works</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/impact"
                  className="text-gray-300 hover:text-white flex items-center group transition-colors py-1"
                  onClick={handleLinkClick}
                >
                  <ArrowRight className="w-4 h-4 mr-2 text-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Our Impact</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/auth?mode=register&role=donor"
                  className="text-gray-300 hover:text-white flex items-center group transition-colors py-1"
                  onClick={handleLinkClick}
                >
                  <ArrowRight className="w-4 h-4 mr-2 text-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Become a Donor</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/auth?mode=register&role=recipient"
                  className="text-gray-300 hover:text-white flex items-center group transition-colors py-1"
                  onClick={handleLinkClick}
                >
                  <ArrowRight className="w-4 h-4 mr-2 text-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Join as Recipient</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/auth?mode=register&role=volunteer"
                  className="text-gray-300 hover:text-white flex items-center group transition-colors py-1"
                  onClick={handleLinkClick}
                >
                  <ArrowRight className="w-4 h-4 mr-2 text-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Become a Volunteer</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold relative inline-block text-white pb-2">
              Resources
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-brand-green rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/Blog"
                  className="text-gray-300 hover:text-white flex items-center group transition-colors py-1"
                  onClick={handleLinkClick}
                >
                  <ArrowRight className="w-4 h-4 mr-2 text-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Blog & Updates</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/FAQ"
                  className="text-gray-300 hover:text-white flex items-center group transition-colors py-1"
                  onClick={handleLinkClick}
                >
                  <ArrowRight className="w-4 h-4 mr-2 text-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/PrivacyPolicy"
                  className="text-gray-300 hover:text-white flex items-center group transition-colors py-1"
                  onClick={handleLinkClick}
                >
                  <ArrowRight className="w-4 h-4 mr-2 text-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/TermsOfService"
                  className="text-gray-300 hover:text-white flex items-center group transition-colors py-1"
                  onClick={handleLinkClick}
                >
                  <ArrowRight className="w-4 h-4 mr-2 text-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold relative inline-block text-white pb-2">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-brand-green rounded-full"></span>
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-md">
                  <MapPin size={18} />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  123 Food Street, Tech Park
                  <br />
                  Mumbai, Maharashtra
                  <br />
                </span>
              </li>
              <li className="flex items-center space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-md">
                  <Phone size={18} />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  +91 98765 43210
                </span>
              </li>
              <li className="flex items-center space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-md">
                  <Mail size={18} />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  contact@foodconnect.in
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-gray-800/80 rounded-xl p-8 mb-16 backdrop-blur-sm border border-gray-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-xl font-bold text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-300 max-w-md">
                Subscribe to our newsletter for the latest updates, success
                stories, and ways to get involved.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent w-full sm:w-64"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-brand-green hover:bg-brand-green/90 text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center transition-colors shadow-lg"
                >
                  <Send size={18} className="mr-2" />
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Food Connect. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="https://github.com/aakanksha-singh-hub/FoodConnect-GSC"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-green transition-colors flex items-center space-x-2 group"
              >
                <Github
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="text-sm">View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Alert */}
      <SubscriptionAlert
        isVisible={showAlert}
        onClose={() => setShowAlert(false)}
      />
    </footer>
  );
};

export default Footer;
