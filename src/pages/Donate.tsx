
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonationForm from '@/components/DonationForm';
import { Package, Check, Clock, ShieldCheck } from 'lucide-react';

const Donate = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-section py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark">
                Donate Surplus Food
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Your excess food can make a real difference. List your surplus food for donation 
                and we'll match it with local organizations serving those in need.
              </p>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="feature-card">
                <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="text-lg font-bold mb-2">Reduce Food Waste</h3>
                <p className="text-gray-600">
                  Turn surplus food into nourishment for those who need it most instead of sending it to landfills.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="text-lg font-bold mb-2">Simple Process</h3>
                <p className="text-gray-600">
                  Our streamlined platform makes donating excess food quick, easy, and hassle-free.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="text-lg font-bold mb-2">Save Time</h3>
                <p className="text-gray-600">
                  We handle the logistics and coordination, so you can focus on your business.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="text-lg font-bold mb-2">Legal Protection</h3>
                <p className="text-gray-600">
                  Food donors are protected under the Good Samaritan Food Donation Act.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <DonationForm />
              
              <div className="space-y-8">
                <div className="bg-brand-green/5 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-brand-dark">What Food Can Be Donated?</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Prepared but unserved food from restaurants and events</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Fresh produce with minor blemishes</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Packaged food near (but before) expiration date</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Bakery items and bread</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Canned and shelf-stable goods</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-brand-orange/5 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-brand-dark">Food Safety Guidelines</h3>
                  <p className="text-gray-700 mb-4">
                    All donated food must be handled in accordance with food safety regulations:
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                      <span>Food must be kept at safe temperatures</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                      <span>Packaging must be intact and food unexpired</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                      <span>Cross-contamination must be prevented</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                      <span>Allergen information must be provided</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-brand-blue/5 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-brand-dark">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-brand-dark">How quickly will my donation be distributed?</h4>
                      <p className="text-gray-700">Most donations are matched and distributed within 24-48 hours of listing.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-dark">Do I need to deliver the food?</h4>
                      <p className="text-gray-700">No, we coordinate pickup by either recipients or volunteer drivers.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-dark">Is there a minimum donation amount?</h4>
                      <p className="text-gray-700">No minimum! Every bit helps, whether it's a few meals or larger quantities.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Impact Section */}
        <section className="py-16 bg-brand-green/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 text-brand-dark">Your Donation Makes a Difference</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="stat-card">
                <div className="text-4xl font-bold text-brand-green mb-2">8.4M</div>
                <p className="text-gray-700">Pounds of food saved annually</p>
              </div>
              <div className="stat-card">
                <div className="text-4xl font-bold text-brand-green mb-2">7,000+</div>
                <p className="text-gray-700">Meals donated daily</p>
              </div>
              <div className="stat-card">
                <div className="text-4xl font-bold text-brand-green mb-2">40%</div>
                <p className="text-gray-700">Reduction in food waste</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Donate;
