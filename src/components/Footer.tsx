import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-brand-green text-white font-bold">
                FR
              </div>
              <span className="font-display font-bold text-xl text-white">Food Connect</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Connecting surplus food to those who need it most, reducing waste and fighting hunger together.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-brand-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-brand-green transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-brand-green transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-bold mb-4">For Donors</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/donate" className="text-gray-300 hover:text-brand-green transition-colors">
                  Donate Food
                </Link>
              </li>
              <li>
                <Link to="/donor-faq" className="text-gray-300 hover:text-brand-green transition-colors">
                  Donor FAQ
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-gray-300 hover:text-brand-green transition-colors">
                  Impact Reports
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="text-gray-300 hover:text-brand-green transition-colors">
                  Food Guidelines
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-bold mb-4">For Recipients</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/receive" className="text-gray-300 hover:text-brand-green transition-colors">
                  Receive Food
                </Link>
              </li>
              <li>
                <Link to="/recipient-faq" className="text-gray-300 hover:text-brand-green transition-colors">
                  Recipient FAQ
                </Link>
              </li>
              <li>
                <Link to="/eligibility" className="text-gray-300 hover:text-brand-green transition-colors">
                  Eligibility
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-300 hover:text-brand-green transition-colors">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                123 Green Street<br />
                Food City, FC 12345
              </li>
              <li>
                <a href="mailto:help@foodconnect.org" className="text-gray-300 hover:text-brand-green transition-colors">
                  help@foodconnect.org
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="text-gray-300 hover:text-brand-green transition-colors">
                  (555) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p className="mb-2">© {new Date().getFullYear()} Food Connect. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/privacy" className="hover:text-brand-green transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-brand-green transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-brand-green transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
