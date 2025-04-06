export type UserRole = "donor" | "recipient" | "volunteer";

export interface User {
  id: string;
  uid: string;
  email: string;
  role: "donor" | "recipient" | "volunteer";
  name?: string;
  displayName?: string;
  organizationName?: string;
  phone: string;
  location?: string;
  address: string;
  city?: string;
  state?: string;
  zipCode?: string;
  lat?: number;
  lng?: number;
  profileComplete?: boolean;
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
  status:
    | "pending"
    | "assigned"
    | "started_for_pickup"
    | "at_pickup_location"
    | "pickup_complete"
    | "in_transit"
    | "at_delivery_location"
    | "delivered"
    | "cancelled";
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

  // Enhanced tracking timestamps
  startedForPickupAt?: string;
  arrivedAtPickupAt?: string;
  pickupCompletedAt?: string;
  inTransitAt?: string;
  arrivedAtDropoffAt?: string;
  deliveredAt?: string;
  completedAt?: string;
  cancelledAt?: string;

  // Current location tracking for map display
  currentLat?: number;
  currentLng?: number;
  lastLocationUpdateAt?: string;
}

export const getAcceptedDonations = async (
  location?: string
): Promise<Donation[]> => {
  try {
    // Use composite indexes for faster queries
    let q = query(
      collection(db, "donations"),
      where("status", "==", "accepted"),
      // Add limit to prevent loading too much data at once
      limit(50)
    );

    if (location && location !== "all") {
      q = query(q, where("pickupCity", "==", location));
    }

    // Use Promise.all to fetch donations and users in parallel
    const [querySnapshot, usersSnapshot] = await Promise.all([
      getDocs(q),
      getDocs(collection(db, "users")),
    ]);

    // Create user lookup map (more efficient)
    const userMap = new Map();
    usersSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      userMap.set(doc.id, {
        name: data.organizationName || data.name || "Unknown",
        address: data.address || "",
      });
    });

    // Process donations with the user data
    return querySnapshot.docs.map((docSnapshot) => {
      // ... rest of mapping logic using userMap
    });
  } catch (error) {
    console.error("Error fetching accepted donations:", error);
    throw error;
  }
};
