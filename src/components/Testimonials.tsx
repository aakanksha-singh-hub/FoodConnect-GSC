import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useUser } from '@/components/UserContext';
import { createDonation } from '@/services/firebase';
import { Donation } from '@/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Fake testimonials data
const fakeTestimonials = [
  {
    id: 1,
    name: 'Seema Patel',
    role: 'Food Donor',
    organization: 'Green Bites Restaurant',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
    quote: 'As a restaurant owner, we often have surplus food. Food Connect has helped us connect with local NGOs and ensure our excess food reaches those who need it most. It\'s a win-win for everyone!',
    foodType: 'Indian Cuisine',
    quantity: '25 kg'
  },
  {
    id: 2,
    name: 'Manish Kumar',
    role: 'Volunteer',
    organization: 'Youth for Change',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    quote: 'I\'ve been volunteering with Food Connect for 6 months now. The platform makes it so easy to coordinate pickups and deliveries. The impact we\'ve made in our community is truly heartwarming.',
    foodType: 'Mixed Cuisine',
    quantity: '15 kg'
  },
  {
    id: 3,
    name: 'Mihir Sharma',
    role: 'Recipient',
    organization: 'Hope Foundation',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    quote: 'Running a shelter home, we always need food supplies. Food Connect has been a blessing, helping us provide nutritious meals to over 100 people daily. The quality and variety of food we receive is excellent.',
    foodType: 'Vegetarian Meals',
    quantity: '30 kg'
  },
  {
    id: 4,
    name: 'Priya Gupta',
    role: 'Food Donor',
    organization: 'Fresh Bakes',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    quote: 'Our bakery often has leftover bread and pastries. Instead of throwing them away, we now donate through Food Connect. It\'s amazing to see how our surplus can make someone\'s day better.',
    foodType: 'Bakery Items',
    quantity: '10 kg'
  },
  {
    id: 5,
    name: 'Rahul Verma',
    role: 'Volunteer',
    organization: 'Community Helpers',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    quote: 'The platform\'s real-time updates and easy navigation make volunteering a breeze. I can pick up food donations on my way home from work and deliver them to nearby shelters.',
    foodType: 'Mixed Cuisine',
    quantity: '20 kg'
  },
  {
    id: 6,
    name: 'Anjali Singh',
    role: 'Recipient',
    organization: 'Children\'s Home',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
    quote: 'Food Connect has transformed how we manage our food supplies. The regular donations help us provide balanced meals to the children in our care. We\'re truly grateful for this initiative.',
    foodType: 'Children\'s Meals',
    quantity: '40 kg'
  }
];

const Testimonials = () => {
  const { user } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [testimonial, setTestimonial] = useState('');
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const newDonation = {
        donorId: user.uid,
        donorName: user.displayName || 'Anonymous',
        foodType,
        quantity: parseFloat(quantity),
        location: 'Various',
        expiryDate: new Date().toISOString(),
        description: 'Donation with testimonial',
        testimonial,
        status: 'available',
        createdAt: new Date().toISOString()
      };

      await createDonation(newDonation);
      setShowForm(false);
      setTestimonial('');
      setFoodType('');
      setQuantity('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit testimonial');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-brand-green/20 to-brand-blue/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
          What Our Community Says
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fakeTestimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 bg-brand-green/20">
                  <AvatarFallback>
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h3 className="font-bold text-lg text-black">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              <p className="text-gray-600 font-medium">
                Donated {testimonial.quantity} of {testimonial.foodType}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
