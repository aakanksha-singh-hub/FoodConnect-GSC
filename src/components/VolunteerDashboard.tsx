import { useState, useEffect } from 'react';
import { useUser } from '@/components/UserContext';
import { getAcceptedDonations, updateDonationStatus, createPickup } from '@/services/firebase';
import { Donation } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function VolunteerDashboard() {
  const { user } = useUser();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      if (!user) return;
      
      try {
        const acceptedDonations = await getAcceptedDonations(locationFilter);
        setDonations(acceptedDonations);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch donations');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [user, locationFilter]);

  const handleAcceptDelivery = async (donation: Donation) => {
    if (!user) return;

    try {
      // Create a pickup record
      await createPickup({
        donationId: donation.id,
        donorId: donation.donorId,
        recipientId: donation.recipientId,
        volunteerId: user.uid,
        pickupLocation: donation.location,
        dropoffLocation: 'recipient_location', // This should come from recipient profile
        status: 'in_transit'
      });

      // Update donation status
      await updateDonationStatus(donation.id, 'in_transit', {
        volunteerId: user.uid,
        volunteerName: user.displayName || 'Anonymous Volunteer',
        pickupAt: new Date().toISOString()
      });

      // Remove the accepted delivery from the list
      setDonations(prevDonations => 
        prevDonations.filter(d => d.id !== donation.id)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to accept delivery');
    }
  };

  const handleCompleteDelivery = async (donation: Donation) => {
    if (!user) return;

    try {
      // Update donation status to delivered
      await updateDonationStatus(donation.id, 'delivered', {
        deliveredAt: new Date().toISOString()
      });

      // Increment the completed deliveries counter in localStorage
      const currentCount = localStorage.getItem('completedDeliveries');
      const newCount = (currentCount ? parseInt(currentCount) : 0) + 1;
      localStorage.setItem('completedDeliveries', newCount.toString());

      // Remove the completed delivery from the list
      setDonations(prevDonations => 
        prevDonations.filter(d => d.id !== donation.id)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete delivery');
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
        <h2 className="text-2xl font-bold">Available Deliveries</h2>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Filter by location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {donations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No deliveries available at the moment.</p>
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
                  donation.status === 'accepted' ? 'bg-yellow-100 text-yellow-800' :
                  donation.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
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
                  <span className="font-medium">Pickup From:</span> {donation.donorName}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Pickup Address:</span> {donation.donorAddress}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Deliver To:</span> {donation.recipientName}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Delivery Address:</span> {donation.recipientAddress}
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
              {donation.status === 'accepted' && (
                <div className="mt-4">
                  <Button
                    onClick={() => handleAcceptDelivery(donation)}
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white"
                  >
                    Accept Delivery
                  </Button>
                </div>
              )}
              {donation.status === 'in_transit' && (
                <div className="mt-4">
                  <Button
                    onClick={() => handleCompleteDelivery(donation)}
                    className="w-full bg-brand-green hover:bg-brand-green/90 text-white"
                  >
                    Mark as Delivered
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 