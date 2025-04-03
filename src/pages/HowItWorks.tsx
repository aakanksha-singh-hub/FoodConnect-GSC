import { Package, Users, Truck, CheckCircle, BarChart4, ShieldCheck, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-section py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark">
                How Food Connect Works
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Our platform uses technology to efficiently connect surplus food with those who need it most,
                creating a sustainable solution to reduce food waste and fight hunger.
              </p>
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center text-brand-dark">The Food Redistribution Process</h2>
              
              <div className="relative">
                {/* Connecting line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-brand-green/20 -translate-x-1/2 hidden md:block"></div>
                
                <div className="space-y-16">
                  {/* Step 1 */}
                  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1">
                      <h3 className="text-2xl font-bold mb-4 text-brand-dark">1. Food Donors List Surplus</h3>
                      <p className="text-gray-700 mb-4">
                        Restaurants, grocery stores, event venues, and other food businesses register on our platform
                        and list their surplus food, specifying type, quantity, pickup time, and location.
                      </p>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                          <span>Simple listing process takes just minutes</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                          <span>Specify food type, quantity, and pickup details</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                          <span>Set recurring donations for regular surplus</span>
                        </li>
                      </ul>
                    </div>
                    <div className="order-1 md:order-2 flex justify-center">
                      <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-brand-green flex items-center justify-center shadow-soft z-10">
                        <Package className="w-8 h-8 md:w-12 md:h-12 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="order-2">
                      <h3 className="text-2xl font-bold mb-4 text-brand-dark">2. Intelligent Matching</h3>
                      <p className="text-gray-700 mb-4">
                        Our algorithm matches food donations with recipient organizations based on food type,
                        quantity, nutritional needs, location, and scheduling requirements.
                      </p>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                          <span>Automated matching based on multiple criteria</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                          <span>Optimized for minimal food waste and transportation</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                          <span>Recipients receive notifications of available matches</span>
                        </li>
                      </ul>
                    </div>
                    <div className="order-1 flex justify-center">
                      <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-brand-orange flex items-center justify-center shadow-soft z-10">
                        <RefreshCcw className="w-8 h-8 md:w-12 md:h-12 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1">
                      <h3 className="text-2xl font-bold mb-4 text-brand-dark">3. Logistics Coordination</h3>
                      <p className="text-gray-700 mb-4">
                        The platform coordinates pickup and delivery logistics between donors and recipients,
                        ensuring food is transported safely, efficiently, and within food safety guidelines.
                      </p>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                          <span>Recipients can pick up food directly from donors</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                          <span>Option for volunteer drivers to assist with delivery</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                          <span>Real-time tracking of food transportation</span>
                        </li>
                      </ul>
                    </div>
                    <div className="order-1 md:order-2 flex justify-center">
                      <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-brand-blue flex items-center justify-center shadow-soft z-10">
                        <Truck className="w-8 h-8 md:w-12 md:h-12 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="order-2">
                      <h3 className="text-2xl font-bold mb-4 text-brand-dark">4. Distribution to Those in Need</h3>
                      <p className="text-gray-700 mb-4">
                        Recipient organizations receive the food and distribute it to vulnerable populations,
                        including homeless individuals, orphaned children, and elderly residents.
                      </p>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                          <span>Food is served to those who need it most</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                          <span>Recipients confirm food receipt in the system</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                          <span>Feedback provided on donation quality and impact</span>
                        </li>
                      </ul>
                    </div>
                    <div className="order-1 flex justify-center">
                      <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-brand-green flex items-center justify-center shadow-soft z-10">
                        <Users className="w-8 h-8 md:w-12 md:h-12 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 5 */}
                  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1">
                      <h3 className="text-2xl font-bold mb-4 text-brand-dark">5. Impact Tracking</h3>
                      <p className="text-gray-700 mb-4">
                        Our platform tracks and reports on the impact of food donations, providing valuable data
                        on food waste reduction, meals provided, and environmental benefits.
                      </p>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                          <span>Donors receive reports on their contributions</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                          <span>Recipients track received donations and meals served</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                          <span>System generates metrics on environmental impact</span>
                        </li>
                      </ul>
                    </div>
                    <div className="order-1 md:order-2 flex justify-center">
                      <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-brand-orange flex items-center justify-center shadow-soft z-10">
                        <BarChart4 className="w-8 h-8 md:w-12 md:h-12 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Platform Features */}
        <section className="py-16 bg-brand-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-brand-dark">Key Platform Features</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our technology-driven approach makes food redistribution efficient, transparent, and impactful.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="feature-card">
                <h3 className="text-xl font-bold mb-3 text-brand-dark">Smart Matching Algorithm</h3>
                <p className="text-gray-600">
                  Our proprietary algorithm optimizes the matching of food donations with recipients based on multiple factors including location, food type, quantity, and scheduling.
                </p>
              </div>
              
              <div className="feature-card">
                <h3 className="text-xl font-bold mb-3 text-brand-dark">Real-time Notifications</h3>
                <p className="text-gray-600">
                  Instant alerts keep all parties informed about donation listings, matches, pickup schedules, and delivery confirmations.
                </p>
              </div>
              
              <div className="feature-card">
                <h3 className="text-xl font-bold mb-3 text-brand-dark">Mobile-friendly Platform</h3>
                <p className="text-gray-600">
                  Access the platform from any device, allowing for on-the-go management of donations and pickups.
                </p>
              </div>
              
              <div className="feature-card">
                <h3 className="text-xl font-bold mb-3 text-brand-dark">Logistics Management</h3>
                <p className="text-gray-600">
                  Streamlined coordination of pickup and delivery schedules, with options for recipient pickup or volunteer delivery.
                </p>
              </div>
              
              <div className="feature-card">
                <h3 className="text-xl font-bold mb-3 text-brand-dark">Impact Analytics</h3>
                <p className="text-gray-600">
                  Comprehensive reporting on food waste reduction, meals provided, and environmental impact of donations.
                </p>
              </div>
              
              <div className="feature-card">
                <h3 className="text-xl font-bold mb-3 text-brand-dark">Food Safety Protocols</h3>
                <p className="text-gray-600">
                  Built-in guidelines and checklists ensure all food handling meets safety standards and regulations.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-brand-dark">Ready to Join the Movement?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Whether you're looking to donate surplus food or receive food for your organization,
                you can make a difference in fighting hunger and reducing food waste.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-brand-green/5 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-brand-dark">Food Donors</h3>
                  <p className="text-gray-600 mb-6">
                    List your surplus food and help it reach those who need it most instead of going to waste.
                  </p>
                  <Button asChild className="bg-brand-green hover:bg-brand-green/90 text-white">
                    <Link to="/donate">Become a Donor</Link>
                  </Button>
                </div>
                
                <div className="bg-brand-blue/5 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-brand-dark">Food Recipients</h3>
                  <p className="text-gray-600 mb-6">
                    Register your organization to receive nutritious food donations for those you serve.
                  </p>
                  <Button asChild className="bg-brand-blue hover:bg-brand-blue/90 text-white">
                    <Link to="/receive">Become a Recipient</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HowItWorks;
