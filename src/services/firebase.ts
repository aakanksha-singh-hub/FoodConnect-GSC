import { auth, db } from '@/integrations/firebase/client';
import { collection, addDoc, query, where, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { User, Donation, Pickup } from '@/types';

// User Operations
export const getUserProfile = async (uid: string) => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    const data = userDoc.data();
    return {
      id: userDoc.id,
      uid: data.uid || uid,
      email: data.email,
      role: data.role,
      createdAt: data.createdAt,
      ...data
    } as User;
  }
  return null;
};

// Donation Operations
export const createDonation = async (donation: Omit<Donation, 'id' | 'status' | 'createdAt'>) => {
  return addDoc(collection(db, 'donations'), {
    ...donation,
    status: 'available',
    createdAt: new Date().toISOString()
  });
};

export const getAvailableDonations = async (location?: string): Promise<Donation[]> => {
  try {
    let q = query(
      collection(db, 'donations'),
      where('status', '==', 'available')
    );

    if (location && location !== 'all') {
      q = query(q, where('location', '==', location));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Donation[];
  } catch (error) {
    console.error('Error fetching available donations:', error);
    throw error;
  }
};

export const getAcceptedDonations = async (location?: string): Promise<Donation[]> => {
  try {
    let q = query(
      collection(db, 'donations'),
      where('status', '==', 'accepted')
    );

    if (location && location !== 'all') {
      q = query(q, where('location', '==', location));
    }

    const querySnapshot = await getDocs(q);
    const donations = await Promise.all(querySnapshot.docs.map(async docSnapshot => {
      const data = docSnapshot.data() as Omit<Donation, 'id'>;
      // Get donor details
      const donorRef = doc(db, 'users', data.donorId);
      const donorSnap = await getDoc(donorRef);
      const donorData = donorSnap.data() as User | undefined;
      
      // Get recipient details if available
      let recipientData: User | undefined;
      if (data.recipientId) {
        const recipientRef = doc(db, 'users', data.recipientId);
        const recipientSnap = await getDoc(recipientRef);
        recipientData = recipientSnap.data() as User | undefined;
      }

      return {
        ...data,
        id: docSnapshot.id,
        donorName: donorData?.organizationName || donorData?.name || 'Unknown Donor',
        donorAddress: donorData?.address || data.location,
        recipientName: recipientData?.organizationName || recipientData?.name || 'Unknown Recipient',
        recipientAddress: recipientData?.address || 'Address will be provided'
      } as Donation;
    }));

    return donations;
  } catch (error) {
    console.error('Error fetching accepted donations:', error);
    throw error;
  }
};

export const getDonationsByDonor = async (donorId: string) => {
  const q = query(
    collection(db, 'donations'),
    where('donorId', '==', donorId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Donation[];
};

export const updateDonationStatus = async (donationId: string, status: Donation['status'], additionalData?: Partial<Donation>) => {
  const donationRef = doc(db, 'donations', donationId);
  const updateData = {
    status,
    ...additionalData,
    updatedAt: new Date().toISOString()
  };
  
  try {
    await updateDoc(donationRef, updateData);
    return true;
  } catch (error) {
    console.error('Error updating donation:', error);
    throw new Error('Failed to update donation status');
  }
};

// Recipient Operations
export const createRecipientProfile = async (userId: string, data: Partial<User>) => {
  return addDoc(collection(db, 'recipients'), {
    ...data,
    userId,
    createdAt: new Date().toISOString()
  });
};

export const updateRecipientProfile = async (userId: string, data: Partial<User>) => {
  const recipientRef = doc(db, 'recipients', userId);
  await updateDoc(recipientRef, data);
};

// Pickup Operations
export const createPickup = async (pickup: Omit<Pickup, 'id' | 'status' | 'createdAt'>) => {
  return addDoc(collection(db, 'pickups'), {
    ...pickup,
    status: 'pending',
    createdAt: new Date().toISOString()
  });
};

export const getPickupsByVolunteer = async (volunteerId: string) => {
  const q = query(
    collection(db, 'pickups'),
    where('volunteerId', '==', volunteerId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Pickup[];
};

export const updatePickupStatus = async (pickupId: string, status: Pickup['status']) => {
  const pickupRef = doc(db, 'pickups', pickupId);
  await updateDoc(pickupRef, { status });
};

export const getAllLocations = async (): Promise<string[]> => {
  try {
    const q = query(collection(db, 'donations'));
    const querySnapshot = await getDocs(q);
    const locations = new Set<string>();
    querySnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.location) {
        locations.add(data.location);
      }
    });
    return Array.from(locations).sort();
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
}; 