
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RecipientForm from '@/components/RecipientForm';
import { Users, Heart, Clock, FileCheck } from 'lucide-react';

const Receive = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-section py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark">
                Receive Food Donations
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Register your organization to receive nutritious surplus food from local businesses,
                helping you better serve your community's needs.
              </p>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="feature-card">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-lg font-bold mb-2">Nutritious Food</h3>
                <p className="text-gray-600">
                  Access high-quality, nutritious food from restaurants, grocery stores, and farms.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-lg font-bold mb-2">Regular Supply</h3>
                <p className="text-gray-600">
                  Establish reliable food sources with consistent deliveries based on your schedule.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-lg font-bold mb-2">Community Impact</h3>
                <p className="text-gray-600">
                  Improve the health and wellbeing of the vulnerable populations you serve.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                  <FileCheck className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-lg font-bold mb-2">Simple Process</h3>
                <p className="text-gray-600">
                  Our platform handles coordination, allowing you to focus on your mission.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <RecipientForm />
              
              <div className="space-y-8">
                <div className="bg-brand-blue/5 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-brand-dark">Who Can Receive Food?</h3>
                  <p className="text-gray-700 mb-4">
                    Our platform serves organizations that provide food or services to vulnerable populations, including:
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <Heart className="w-5 h-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Homeless shelters and transitional housing</span>
                    </li>
                    <li className="flex items-start">
                      <Heart className="w-5 h-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Orphanages and children's homes</span>
                    </li>
                    <li className="flex items-start">
                      <Heart className="w-5 h-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Elderly care homes and senior centers</span>
                    </li>
                    <li className="flex items-start">
                      <Heart className="w-5 h-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Food banks and pantries</span>
                    </li>
                    <li className="flex items-start">
                      <Heart className="w-5 h-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>Community kitchens and meal programs</span>
                    </li>
                    <li className="flex items-start">
                      <Heart className="w-5 h-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span>After-school programs serving meals</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-brand-orange/5 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-brand-dark">How It Works for Recipients</h3>
                  <ul className="space-y-4 text-gray-700 relative">
                    <li className="flex pl-8 relative">
                      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-sm">1</div>
                      <div>
                        <h4 className="font-bold text-brand-dark">Register Your Organization</h4>
                        <p>Fill out the form with details about your organization, location, and food needs.</p>
                      </div>
                    </li>
                    <li className="flex pl-8 relative">
                      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-sm">2</div>
                      <div>
                        <h4 className="font-bold text-brand-dark">Get Verified</h4>
                        <p>Our team will review your application to ensure you meet eligibility requirements.</p>
                      </div>
                    </li>
                    <li className="flex pl-8 relative">
                      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-sm">3</div>
                      <div>
                        <h4 className="font-bold text-brand-dark">Receive Food Matches</h4>
                        <p>You'll be notified when suitable food donations become available in your area.</p>
                      </div>
                    </li>
                    <li className="flex pl-8 relative">
                      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-sm">4</div>
                      <div>
                        <h4 className="font-bold text-brand-dark">Coordinate Pickup/Delivery</h4>
                        <p>Schedule pickup or receive delivery of food donations at your convenience.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-brand-green/5 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-brand-dark">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-brand-dark">Is there a cost to receive food?</h4>
                      <p className="text-gray-700">No, all food is donated at no cost to recipient organizations.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-dark">What kind of food will we receive?</h4>
                      <p className="text-gray-700">The food varies based on donations, but may include prepared meals, fresh produce, baked goods, and packaged items.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-dark">Can we specify dietary requirements?</h4>
                      <p className="text-gray-700">Yes, you can indicate dietary preferences and restrictions in your profile.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-brand-blue/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 text-brand-dark">What Our Recipients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-soft">
                <p className="text-gray-700 italic mb-4">
                  "This platform has been a lifeline for our shelter. We now receive consistent, high-quality food for our residents, which has significantly improved their nutrition and wellbeing."
                </p>
                <p className="font-bold">Sarah M.</p>
                <p className="text-sm text-gray-600">New Hope Shelter</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-soft">
                <p className="text-gray-700 italic mb-4">
                  "As a small orphanage with limited resources, the food donations we receive have allowed us to allocate more funds to educational programs while ensuring our children eat well."
                </p>
                <p className="font-bold">David K.</p>
                <p className="text-sm text-gray-600">Bright Future Children's Home</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-soft">
                <p className="text-gray-700 italic mb-4">
                  "Our elderly residents look forward to the restaurant meals we receive. It's brought variety to our menu and joy to mealtime. The system is incredibly easy to use."
                </p>
                <p className="font-bold">Maria L.</p>
                <p className="text-sm text-gray-600">Golden Years Senior Living</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Receive;
