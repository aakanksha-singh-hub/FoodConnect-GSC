import { useState, useEffect } from 'react';
import { useUser } from '@/components/UserContext';
import { Donation } from '@/types';
import { getDonationsByDonor, createDonation } from '@/services/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function DonorDashboard() {
  const { user } = useUser();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [description, setDescription] = useState('');
  const [testimonial, setTestimonial] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      if (!user) return;
      
      try {
        const donorDonations = await getDonationsByDonor(user.uid);
        setDonations(donorDonations);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch donations');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const newDonation: Omit<Donation, 'id'> = {
        donorId: user.uid,
        donorName: user.displayName || 'Anonymous',
        foodType,
        quantity: parseFloat(quantity),
        location,
        expiryDate: new Date(expiryDate).toISOString(),
        description,
        testimonial,
        status: 'available',
        createdAt: new Date().toISOString()
      };

      await createDonation(newDonation);
      
      // Refresh donations list
      const updatedDonations = await getDonationsByDonor(user.uid);
      setDonations(updatedDonations);
      
      // Reset form
      setShowForm(false);
      setFoodType('');
      setQuantity('');
      setLocation('');
      setExpiryDate('');
      setDescription('');
      setTestimonial('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create donation');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">My Donations</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Donate Food'}
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Type
              </label>
              <Select value={foodType} onValueChange={setFoodType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select food type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="dairy">Dairy</SelectItem>
                  <SelectItem value="meat">Meat</SelectItem>
                  <SelectItem value="bakery">Bakery</SelectItem>
                  <SelectItem value="prepared">Prepared Food</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity (kg)
              </label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <Input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <Input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the food items"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testimonial (optional)
              </label>
              <Textarea
                value={testimonial}
                onChange={(e) => setTestimonial(e.target.value)}
                placeholder="Share your experience"
              />
            </div>
          </div>

          <div className="mt-6">
            <Button type="submit" className="w-full">
              Submit Donation
            </Button>
          </div>
        </form>
      )}

      {donations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">You haven't made any donations yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{donation.foodType}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  donation.status === 'available' ? 'bg-green-100 text-green-800' :
                  donation.status === 'in_transit' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {donation.status}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Quantity:</span> {donation.quantity} kg
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Location:</span> {donation.location}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Expiry Date:</span>{' '}
                  {new Date(donation.expiryDate).toLocaleDateString()}
                </p>
                {donation.description && (
                  <p className="text-gray-600">
                    <span className="font-medium">Description:</span> {donation.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 