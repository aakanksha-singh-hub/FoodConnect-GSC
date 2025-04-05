export type UserRole = "donor" | "recipient" | "volunteer";

export interface User {
  id: string;
  uid: string;
  email: string;
  role: "donor" | "recipient" | "volunteer";
  name?: string;
  displayName?: string;
  organizationName?: string;
  phone?: string;
  location?: string;
  address?: string;
  createdAt: string;
}

export interface Donation {
  id?: string;
  donorId: string;
  donorName: string;
  foodType: string;
  quantity: number;
  unit: string;
  location: string;
  pickupAddress: string;
  pickupCity: string;
  pickupState: string;
  pickupZipCode: string;
  pickupLat: number;
  pickupLng: number;
  storageType: "refrigerated" | "frozen" | "ambient";
  temperatureRange?: string;
  allergens: string[];
  additionalAllergens?: string;
  nutritionalInfo?: string;
  packagingDetails?: string;
  pickupInstructions?: string;
  pickupTimeWindowStart?: string;
  pickupTimeWindowEnd?: string;
  contactPersonName: string;
  contactPersonPhone: string;
  alternativeContactName?: string;
  alternativeContactPhone?: string;
  preferredCommunicationMethod?: "phone" | "email" | "text";
  photoUrls?: string[];
  specialInstructions?: string;
  description?: string;
  expiryDate: string;
  status: "pending" | "accepted" | "in_transit" | "delivered" | "expired";
  createdAt: string;
  updatedAt?: string;
  recipientId?: string;
  recipientName?: string;
  recipientAddress?: string;
  recipientLat?: number;
  recipientLng?: number;
  volunteerId?: string;
  volunteerName?: string;
  pickupAt?: string;
  deliveredAt?: string;
}

export interface Pickup {
  id?: string;
  donationId: string;
  donorId: string;
  recipientId: string;
  volunteerId: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  quantity: number;
  pickupLocation: string;
  pickupAddress: string;
  pickupCity: string;
  pickupState: string;
  pickupZipCode: string;
  pickupLat: number;
  pickupLng: number;
  pickupInstructions?: string;
  pickupTimeWindowStart?: string;
  pickupTimeWindowEnd?: string;
  contactPersonName: string;
  contactPersonPhone: string;
  dropoffLocation: string;
  dropoffAddress: string;
  dropoffCity: string;
  dropoffState: string;
  dropoffZipCode: string;
  dropoffLat: number;
  dropoffLng: number;
  dropoffInstructions?: string;
  dropoffContactName?: string;
  dropoffContactPhone?: string;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
}
