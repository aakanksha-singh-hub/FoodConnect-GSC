import { useState, useEffect } from 'react';
import { useUser } from '@/components/UserContext';
import { getAvailableDonations, updateDonationStatus } from '@/services/firebase';
import { Donation } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';

export default function RecipientDashboard() {
  const { user } = useUser();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      if (!user) return;
      
      try {
        const availableDonations = await getAvailableDonations(locationFilter);
        setDonations(availableDonations);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch donations');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [user, locationFilter]);

  const handleAcceptDonation = async (donationId: string) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // First get the donation to verify it's available
      const donationRef = doc(db, 'donations', donationId);
      const donationDoc = await getDoc(donationRef);
      
      if (!donationDoc.exists()) {
        throw new Error('Donation not found');
      }

      const donationData = donationDoc.data();
      if (donationData.status !== 'available') {
        throw new Error('Donation is no longer available');
      }

      // Update the donation status
      await updateDonationStatus(donationId, 'accepted', {
        recipientId: user.uid,
        recipientName: user.displayName || 'Anonymous Recipient',
        acceptedAt: new Date().toISOString()
      });

      // Refresh the donations list
      const availableDonations = await getAvailableDonations(locationFilter);
      setDonations(availableDonations);
    } catch (err) {
      console.error('Error accepting donation:', err);
      setError(err instanceof Error ? err.message : 'Failed to accept donation. Please try again.');
    } finally {
      setLoading(false);
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
        <h2 className="text-2xl font-bold">Available Donations</h2>
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
          <p className="text-gray-500">No donations available at the moment.</p>
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
                {donation.donorName && (
                  <p className="text-gray-600">
                    <span className="font-medium">Donor:</span> {donation.donorName}
                  </p>
                )}
              </div>
              {donation.status === 'available' && (
                <div className="mt-4">
                  <Button
                    onClick={() => handleAcceptDonation(donation.id)}
                    className="w-full bg-brand-green hover:bg-brand-green/90 text-white"
                  >
                    Accept Donation
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