export type UserRole = 'donor' | 'recipient' | 'volunteer';

export interface User {
  uid: string;
  email: string;
  role: UserRole;
  name?: string;
  organizationName?: string;
  phone?: string;
  location?: string;
  address?: string;
  createdAt: string;
}

export interface Donation {
  id?: string;
  donorId: string;
  recipientId?: string;
  foodType: string;
  quantity: string;
  location: string;
  expiryDate: string;
  status: 'available' | 'accepted' | 'in_transit' | 'delivered';
  createdAt: string;
  updatedAt?: string;
  donorName?: string;
  donorAddress?: string;
  recipientName?: string;
  recipientAddress?: string;
}

export interface Pickup {
  id?: string;
  donationId: string;
  volunteerId: string;
  donorId: string;
  recipientId: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
  pickupLocation: string;
  dropoffLocation: string;
} 