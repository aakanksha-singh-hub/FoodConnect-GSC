import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Globe, Award, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-section py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark">
                About Food Connect
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We're on a mission to create a more sustainable food system by connecting surplus food
                with those who need it most.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-brand-dark">Our Story</h2>
              </div>
              
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Food Connect was born from a simple observation: while millions struggle with food insecurity,
                  restaurants and food businesses discard tons of perfectly good food every day. This paradox inspired
                  our founder, who witnessed first-hand the disconnect between food waste and hunger.
                </p>
                
                <p>
                  What began as a grassroots initiative connecting a few local restaurants with a nearby shelter has
                  evolved into a comprehensive platform that leverages technology to bridge the gap between food waste
                  and food insecurity at scale.
                </p>
                
                <p>
                  Our team consists of food industry veterans, technology experts, and social impact leaders who share
                  a passion for creating sustainable solutions to hunger. Together, we've built a platform that makes
                  food redistribution simple, efficient, and impactful.
                </p>
                
                <p>
                  Today, Food Connect serves communities across the country, redirecting thousands of pounds of
                  food daily from landfills to people's plates. But we're just getting started. Our vision is a world
                  where no good food goes to waste while people go hungry.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Mission and Impact */}
        <section className="py-16 bg-brand-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-brand-dark">Our Mission</h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p>
                    At Food Connect, we're committed to creating a more equitable and sustainable food system by
                    connecting surplus food with those who need it most, reducing food waste, and fighting hunger
                    simultaneously.
                  </p>
                  
                  <p>
                    We believe that technology can bridge the gap between abundance and scarcity, creating a more
                    efficient way to redistribute food resources within our communities.
                  </p>
                  
                  <p>
                    Our platform empowers food businesses to become part of the solution to hunger while helping
                    organizations serving vulnerable populations access nutritious food consistently and efficiently.
                  </p>
                </div>
                
                <div className="mt-8 space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Globe className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-brand-dark">Environmental Responsibility</h3>
                      <p className="text-gray-700">
                        Reducing food waste helps decrease methane emissions from landfills and conserves the resources
                        used to produce, process, and transport food.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Users className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-brand-dark">Social Impact</h3>
                      <p className="text-gray-700">
                        Providing nutritious food to vulnerable populations improves their health, wellbeing, and dignity,
                        creating more resilient communities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6 text-brand-dark">Our Impact</h2>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-6 shadow-soft text-center">
                    <div className="text-4xl font-bold text-brand-green mb-2">1.2M+</div>
                    <p className="text-gray-700">Pounds of food redistributed</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-soft text-center">
                    <div className="text-4xl font-bold text-brand-green mb-2">950K+</div>
                    <p className="text-gray-700">Meals provided</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-soft text-center">
                    <div className="text-4xl font-bold text-brand-green mb-2">450+</div>
                    <p className="text-gray-700">Food donors participating</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-soft text-center">
                    <div className="text-4xl font-bold text-brand-green mb-2">120+</div>
                    <p className="text-gray-700">Recipient organizations</p>
                  </div>
                </div>
                
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p>
                    Beyond the numbers, our real impact lies in the stories of those we serve - the elderly woman who now
                    receives nutritious meals at her care home, the children at an orphanage enjoying fresh vegetables,
                    and the shelter residents who no longer have to worry about where their next meal will come from.
                  </p>
                  
                  <p>
                    We're also proud of the environmental impact we're making by diverting food from landfills, reducing
                    methane emissions, and conserving the resources that would otherwise be wasted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-brand-dark">Our Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Meet the passionate individuals working to create a more sustainable food system.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-brand-green/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-brand-green">MJ</span>
                </div>
                <h3 className="text-xl font-bold text-brand-dark">Maria Johnson</h3>
                <p className="text-gray-600 mb-2">Founder & CEO</p>
                <p className="text-gray-600 text-sm">
                  Former restaurant owner with a passion for reducing food waste and fighting hunger.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-brand-orange/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-brand-orange">DR</span>
                </div>
                <h3 className="text-xl font-bold text-brand-dark">David Rodriguez</h3>
                <p className="text-gray-600 mb-2">CTO</p>
                <p className="text-gray-600 text-sm">
                  Tech innovator with expertise in building platforms that create positive social impact.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-brand-blue/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-brand-blue">SP</span>
                </div>
                <h3 className="text-xl font-bold text-brand-dark">Sarah Patel</h3>
                <p className="text-gray-600 mb-2">Operations Director</p>
                <p className="text-gray-600 text-sm">
                  Logistics expert with experience in food distribution and nonprofit management.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-brand-green/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-brand-green">JK</span>
                </div>
                <h3 className="text-xl font-bold text-brand-dark">James Kim</h3>
                <p className="text-gray-600 mb-2">Community Outreach</p>
                <p className="text-gray-600 text-sm">
                  Former social worker dedicated to building relationships with donors and recipients.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Partners & Recognition */}
        <section className="py-16 bg-brand-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-brand-dark">Partners & Recognition</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-6 text-brand-dark">Our Partners</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-soft flex items-center justify-center h-24">
                    <span className="text-lg font-bold text-gray-400">City Foods</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-soft flex items-center justify-center h-24">
                    <span className="text-lg font-bold text-gray-400">Green Grocer</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-soft flex items-center justify-center h-24">
                    <span className="text-lg font-bold text-gray-400">Food Network</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-soft flex items-center justify-center h-24">
                    <span className="text-lg font-bold text-gray-400">Fresh Farms</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-soft flex items-center justify-center h-24">
                    <span className="text-lg font-bold text-gray-400">Metro Meals</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-soft flex items-center justify-center h-24">
                    <span className="text-lg font-bold text-gray-400">Urban Eats</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6 text-brand-dark">Awards & Recognition</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Award className="w-6 h-6 text-brand-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-dark">Food Sustainability Award 2023</h4>
                      <p className="text-gray-700">
                        Recognized for innovative approaches to reducing food waste in urban communities.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Award className="w-6 h-6 text-brand-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-dark">Social Impact Technology Prize</h4>
                      <p className="text-gray-700">
                        Awarded for leveraging technology to address critical social challenges.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Award className="w-6 h-6 text-brand-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-dark">Community Hero Recognition</h4>
                      <p className="text-gray-700">
                        Featured in local and national media for our work fighting hunger.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Join Us */}
        <section className="py-16 bg-gradient-to-r from-brand-green/90 to-brand-blue/90 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
              <p className="text-lg mb-8 opacity-90">
                Together, we can create a world where no good food goes to waste while people go hungry.
                Whether you're a food business, recipient organization, or supporter, there's a place for you
                in our movement.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-brand-green hover:bg-gray-100">
                  <Link to="/donate">
                    Become a Food Donor
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/receive">
                    Register as a Recipient
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
