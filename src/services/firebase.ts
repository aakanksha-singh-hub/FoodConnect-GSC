import { auth, db } from "@/integrations/firebase/client";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { User, Donation, Pickup } from "@/types";

// User Operations
export const getUserProfile = async (uid: string) => {
  try {
    if (!uid) {
      throw new Error("User ID is required");
    }

    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        id: userDoc.id,
        uid: data.uid || uid,
        email: data.email,
        role: data.role,
        createdAt: data.createdAt,
        ...data,
      } as User;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Donation Operations
export const createDonation = async (
  donation: Omit<Donation, "id" | "status" | "createdAt">
) => {
  try {
    if (!donation.donorId) {
      throw new Error("Donor ID is required");
    }

    return addDoc(collection(db, "donations"), {
      ...donation,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error creating donation:", error);
    throw error;
  }
};

export const getAvailableDonations = async (
  location?: string
): Promise<Donation[]> => {
  try {
    let q = query(
      collection(db, "donations"),
      where("status", "==", "pending")
    );

    if (location && location !== "all") {
      q = query(q, where("pickupCity", "==", location));
    }

    const querySnapshot = await getDocs(q);

    // Get all unique donor IDs
    const donorIds = new Set<string>();
    querySnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.donorId) donorIds.add(data.donorId);
    });

    // Batch fetch all donor data
    const donorPromises = Array.from(donorIds).map((id) =>
      getDoc(doc(db, "users", id))
    );
    const donorDocs = await Promise.all(donorPromises);

    // Create map for quick lookup
    const donorMap = new Map();
    donorDocs.forEach((doc) => {
      if (doc.exists()) {
        const data = doc.data();
        donorMap.set(doc.id, {
          name: data.organizationName || data.name || "Unknown Donor",
          address: data.address,
        });
      }
    });

    // Map the donations with the donor data
    return querySnapshot.docs.map((docSnapshot) => {
      const data = docSnapshot.data() as Omit<Donation, "id">;
      const donorData = donorMap.get(data.donorId) || {
        name: "Unknown Donor",
        address: data.location,
      };

      return {
        ...data,
        id: docSnapshot.id,
        donorName: donorData.name,
        donorAddress: donorData.address || data.location,
      } as Donation;
    });
  } catch (error) {
    console.error("Error fetching available donations:", error);
    throw error;
  }
};

export const getAcceptedDonations = async (
  location?: string
): Promise<Donation[]> => {
  try {
    let q = query(
      collection(db, "donations"),
      where("status", "==", "accepted")
    );

    if (location && location !== "all") {
      q = query(q, where("pickupCity", "==", location));
    }

    const querySnapshot = await getDocs(q);

    // Get all unique donor and recipient IDs
    const donorIds = new Set<string>();
    const recipientIds = new Set<string>();

    querySnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.donorId) donorIds.add(data.donorId);
      if (data.recipientId) recipientIds.add(data.recipientId);
    });

    // Batch fetch all donor and recipient data
    const donorPromises = Array.from(donorIds).map((id) =>
      getDoc(doc(db, "users", id))
    );
    const recipientPromises = Array.from(recipientIds).map((id) =>
      getDoc(doc(db, "users", id))
    );

    const [donorDocs, recipientDocs] = await Promise.all([
      Promise.all(donorPromises),
      Promise.all(recipientPromises),
    ]);

    // Create maps for quick lookup
    const donorMap = new Map();
    donorDocs.forEach((doc) => {
      if (doc.exists()) {
        const data = doc.data();
        donorMap.set(doc.id, {
          name: data.organizationName || data.name || "Unknown Donor",
          address: data.address,
        });
      }
    });

    const recipientMap = new Map();
    recipientDocs.forEach((doc) => {
      if (doc.exists()) {
        const data = doc.data();
        recipientMap.set(doc.id, {
          name: data.organizationName || data.name || "Unknown Recipient",
          address: data.address,
        });
      }
    });

    // Map the donations with the user data
    const donations = querySnapshot.docs.map((docSnapshot) => {
      const data = docSnapshot.data() as Omit<Donation, "id">;
      const donorData = donorMap.get(data.donorId) || {
        name: "Unknown Donor",
        address: data.location,
      };
      const recipientData = data.recipientId
        ? recipientMap.get(data.recipientId) || {
            name: "Unknown Recipient",
            address: "Address will be provided",
          }
        : { name: "Unknown Recipient", address: "Address will be provided" };

      return {
        ...data,
        id: docSnapshot.id,
        donorName: donorData.name,
        donorAddress: donorData.address || data.location,
        recipientName: recipientData.name,
        recipientAddress: recipientData.address || "Address will be provided",
      } as Donation;
    });

    return donations;
  } catch (error) {
    console.error("Error fetching accepted donations:", error);
    throw error;
  }
};

export const getDonationsByDonor = async (donorId: string) => {
  try {
    if (!donorId) {
      throw new Error("Donor ID is required");
    }

    const q = query(
      collection(db, "donations"),
      where("donorId", "==", donorId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Donation[];
  } catch (error) {
    console.error("Error fetching donations by donor:", error);
    throw error;
  }
};

export const updateDonationStatus = async (
  donationId: string,
  status: Donation["status"],
  additionalData?: Partial<Donation>
) => {
  try {
    if (!donationId) {
      throw new Error("Donation ID is required");
    }

    const donationRef = doc(db, "donations", donationId);
    const updateData = {
      status,
      ...additionalData,
      updatedAt: new Date().toISOString(),
    };

    await updateDoc(donationRef, updateData);
    return true;
  } catch (error) {
    console.error("Error updating donation:", error);
    throw new Error("Failed to update donation status");
  }
};

// Recipient Operations
export const createRecipientProfile = async (
  userId: string,
  data: Partial<User>
) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    return addDoc(collection(db, "recipients"), {
      ...data,
      userId,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error creating recipient profile:", error);
    throw error;
  }
};

export const updateRecipientProfile = async (
  userId: string,
  data: Partial<User>
) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const recipientRef = doc(db, "recipients", userId);
    await updateDoc(recipientRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error("Error updating recipient profile:", error);
    throw error;
  }
};

// Pickup Operations
export const createPickup = async (data: {
  donationId: string;
  donorId: string;
  recipientId: string;
  volunteerId: string;
  pickupLocation: string;
  dropoffLocation: string;
  quantity: number;
  pickupAddress?: string;
  pickupCity?: string;
  pickupState?: string;
  pickupZipCode?: string;
  pickupLat?: number;
  pickupLng?: number;
  dropoffAddress?: string;
  dropoffCity?: string;
  dropoffState?: string;
  dropoffZipCode?: string;
  dropoffLat?: number;
  dropoffLng?: number;
  contactPersonName?: string;
  contactPersonPhone?: string;
  dropoffContactName?: string;
  dropoffContactPhone?: string;
}) => {
  try {
    // Get the donation to fill in any missing pickup data
    const donationDoc = await getDoc(doc(db, "donations", data.donationId));
    if (!donationDoc.exists()) {
      throw new Error("Donation not found");
    }

    const donation = donationDoc.data() as Donation;

    // Create pickup with donation data filling in missing fields
    const pickupData: Omit<Pickup, "id" | "status" | "createdAt"> = {
      donationId: data.donationId,
      donorId: data.donorId,
      recipientId: data.recipientId,
      volunteerId: data.volunteerId,
      quantity: data.quantity,

      // Pickup location details
      pickupLocation: data.pickupLocation,
      pickupAddress: data.pickupAddress || donation.pickupAddress,
      pickupCity: data.pickupCity || donation.pickupCity,
      pickupState: data.pickupState || donation.pickupState,
      pickupZipCode: data.pickupZipCode || donation.pickupZipCode,
      pickupLat: data.pickupLat || donation.pickupLat,
      pickupLng: data.pickupLng || donation.pickupLng,
      pickupInstructions: donation.pickupInstructions,
      pickupTimeWindowStart: donation.pickupTimeWindowStart,
      pickupTimeWindowEnd: donation.pickupTimeWindowEnd,
      contactPersonName: data.contactPersonName || donation.contactPersonName,
      contactPersonPhone:
        data.contactPersonPhone || donation.contactPersonPhone,

      // Dropoff location details
      dropoffLocation: data.dropoffLocation,
      dropoffAddress:
        data.dropoffAddress || donation.recipientAddress || "To be provided",
      dropoffCity: data.dropoffCity || "",
      dropoffState: data.dropoffState || "",
      dropoffZipCode: data.dropoffZipCode || "",
      dropoffLat: data.dropoffLat || donation.recipientLat || 0,
      dropoffLng: data.dropoffLng || donation.recipientLng || 0,
      dropoffInstructions: "",
      dropoffContactName: data.dropoffContactName || donation.recipientName,
      dropoffContactPhone: data.dropoffContactPhone || "",
    };

    const pickupRef = collection(db, "pickups");
    const pickupDoc = await addDoc(pickupRef, {
      ...pickupData,
      status: "assigned",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return pickupDoc;
  } catch (error) {
    console.error("Error creating pickup:", error);
    throw error;
  }
};

export const getPickupsByVolunteer = async (volunteerId: string) => {
  try {
    if (!volunteerId) {
      throw new Error("Volunteer ID is required");
    }

    const q = query(
      collection(db, "pickups"),
      where("volunteerId", "==", volunteerId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Pickup[];
  } catch (error) {
    console.error("Error fetching pickups by volunteer:", error);
    throw error;
  }
};

// Enhanced pickup status options for delivery tracking
export type PickupStatusType =
  | "pending"
  | "assigned"
  | "started_for_pickup"
  | "at_pickup_location"
  | "pickup_complete"
  | "in_transit"
  | "in_progress"
  | "at_delivery_location"
  | "delivered"
  | "completed"
  | "cancelled";

// Update a pickup with new status and additional data
export const updatePickupWithStatus = async (
  pickupId: string,
  status: PickupStatusType,
  additionalData?: Partial<Pickup>
) => {
  try {
    if (!pickupId) {
      throw new Error("Pickup ID is required");
    }

    const pickupRef = doc(db, "pickups", pickupId);
    const currentTime = new Date().toISOString();

    // Prepare status-specific timestamps
    const statusTimestamps: Record<string, any> = {};

    switch (status) {
      case "started_for_pickup":
        statusTimestamps.startedForPickupAt = currentTime;
        break;
      case "at_pickup_location":
        statusTimestamps.arrivedAtPickupAt = currentTime;
        break;
      case "pickup_complete":
        statusTimestamps.pickupCompletedAt = currentTime;
        break;
      case "in_transit":
        statusTimestamps.inTransitAt = currentTime;
        break;
      case "at_delivery_location":
        statusTimestamps.arrivedAtDropoffAt = currentTime;
        break;
      case "delivered":
        statusTimestamps.deliveredAt = currentTime;
        statusTimestamps.completedAt = currentTime;
        break;
    }

    const updateData = {
      status,
      ...statusTimestamps,
      ...additionalData,
      updatedAt: currentTime,
    };

    await updateDoc(pickupRef, updateData);

    // If this is the final delivery status, also update the donation status
    if (status === "delivered") {
      const pickupDoc = await getDoc(pickupRef);
      if (pickupDoc.exists()) {
        const pickupData = pickupDoc.data();
        if (pickupData.donationId) {
          await updateDonationStatus(pickupData.donationId, "delivered", {
            deliveredAt: currentTime,
            updatedAt: currentTime,
          });
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error updating pickup with status:", error);
    throw new Error("Failed to update pickup status");
  }
};

// Get all pickup status history for a specific pickup
export const getPickupStatusHistory = async (pickupId: string) => {
  try {
    if (!pickupId) {
      throw new Error("Pickup ID is required");
    }

    const q = query(
      collection(db, "pickupStatusHistory"),
      where("pickupId", "==", pickupId),
      orderBy("timestamp", "asc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching pickup status history:", error);
    throw error;
  }
};

// Record a new pickup status change
export const recordPickupStatusChange = async (
  pickupId: string,
  status: PickupStatusType,
  notes?: string
) => {
  try {
    if (!pickupId) {
      throw new Error("Pickup ID is required");
    }

    return addDoc(collection(db, "pickupStatusHistory"), {
      pickupId,
      status,
      notes,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error recording pickup status change:", error);
    throw error;
  }
};

// Get active pickups for a volunteer
export const getActivePickupsForVolunteer = async (
  volunteerId: string
): Promise<Pickup[]> => {
  try {
    if (!volunteerId) {
      throw new Error("Volunteer ID is required");
    }

    const q = query(
      collection(db, "pickups"),
      where("volunteerId", "==", volunteerId),
      where("status", "in", [
        "assigned",
        "started_for_pickup",
        "at_pickup_location",
        "pickup_complete",
        "in_transit",
        "at_delivery_location",
      ])
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Pickup[];
  } catch (error) {
    console.error("Error fetching active pickups for volunteer:", error);
    throw error;
  }
};

export const getAllLocations = async (): Promise<string[]> => {
  try {
    const q = query(collection(db, "users"), orderBy("location"));
    const snapshot = await getDocs(q);
    const locations = new Set<string>();

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.location) {
        locations.add(data.location);
      }
    });

    return Array.from(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

export const getDonationsByRecipient = async (
  recipientId: string
): Promise<Donation[]> => {
  try {
    if (!recipientId) {
      throw new Error("Recipient ID is required");
    }

    const q = query(
      collection(db, "donations"),
      where("recipientId", "==", recipientId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Donation[];
  } catch (error) {
    console.error("Error fetching donations by recipient:", error);
    throw error;
  }
};

// Backward compatibility function for existing code
export const updatePickupStatus = async (
  pickupId: string,
  status: "pending" | "in_progress" | "completed" | "cancelled"
) => {
  // Map old status types to new ones
  let newStatus: PickupStatusType = status as PickupStatusType;

  // Handle legacy status mappings
  if (status === "in_progress") {
    newStatus = "in_transit";
  } else if (status === "completed") {
    newStatus = "delivered";
  }

  return updatePickupWithStatus(pickupId, newStatus);
};

// Add a new function to claim a donation
export const claimDonation = async (
  donationId: string,
  recipientId: string,
  recipientName: string,
  recipientAddress: string
) => {
  try {
    if (!donationId || !recipientId) {
      throw new Error("Donation ID and Recipient ID are required");
    }

    const donationRef = doc(db, "donations", donationId);

    // Check if donation is still available
    const donationDoc = await getDoc(donationRef);
    if (!donationDoc.exists()) {
      throw new Error("Donation not found");
    }

    const donationData = donationDoc.data();
    if (donationData.status !== "pending") {
      throw new Error("This donation is no longer available");
    }

    // Update the donation status to accepted and add recipient info
    await updateDoc(donationRef, {
      status: "accepted",
      recipientId,
      recipientName,
      recipientAddress,
      updatedAt: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("Error claiming donation:", error);
    throw error;
  }
};

export const subscribeToDonorDonations = (
  donorId: string,
  onUpdate: (donations: Donation[]) => void
) => {
  const donationsRef = collection(db, "donations");
  const q = query(donationsRef, where("donorId", "==", donorId));

  // Set up real-time listener
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const donations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Donation[];
    onUpdate(donations);
  });

  return unsubscribe;
};

export const subscribeToRecipientDonations = (
  recipientId: string,
  onUpdate: (donations: Donation[]) => void
) => {
  const donationsRef = collection(db, "donations");
  const q = query(donationsRef, where("recipientId", "==", recipientId));

  return onSnapshot(q, (snapshot) => {
    const donations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Donation[];
    onUpdate(donations);
  });
};

export const subscribeToRecipientDonationsSorted = (
  recipientId: string,
  onUpdate: (donations: Donation[]) => void
) => {
  const donationsRef = collection(db, "donations");
  const q = query(donationsRef, where("recipientId", "==", recipientId));

  return onSnapshot(q, (snapshot) => {
    const donations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Donation[];

    // Sort donations by createdAt in descending order (newest first)
    const sortedDonations = [...donations].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    onUpdate(sortedDonations);
  });
};

export const getRecipientActivityHistory = async (
  recipientId: string
): Promise<Donation[]> => {
  try {
    if (!recipientId) {
      throw new Error("Recipient ID is required");
    }

    const q = query(
      collection(db, "donations"),
      where("recipientId", "==", recipientId)
    );
    const snapshot = await getDocs(q);

    // Get all unique donor IDs
    const donorIds = new Set<string>();
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.donorId) donorIds.add(data.donorId);
    });

    // Batch fetch all donor data
    const donorPromises = Array.from(donorIds).map((id) =>
      getDoc(doc(db, "users", id))
    );
    const donorDocs = await Promise.all(donorPromises);

    // Create map for quick lookup
    const donorMap = new Map();
    donorDocs.forEach((doc) => {
      if (doc.exists()) {
        const data = doc.data();
        donorMap.set(doc.id, {
          name: data.organizationName || data.name || "Unknown Donor",
          address: data.address,
        });
      }
    });

    // Map the donations with the donor data
    const donations = snapshot.docs.map((docSnapshot) => {
      const data = docSnapshot.data() as Omit<Donation, "id">;
      const donorData = donorMap.get(data.donorId) || {
        name: "Unknown Donor",
        address: data.location,
      };

      return {
        ...data,
        id: docSnapshot.id,
        donorName: donorData.name,
        donorAddress: donorData.address || data.location,
      } as Donation;
    });

    // Sort by createdAt in descending order (newest first)
    return donations.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error fetching recipient activity history:", error);
    throw error;
  }
};

export const subscribeToVolunteerPickups = (
  volunteerId: string,
  onUpdate: (pickups: Pickup[]) => void
) => {
  const pickupsRef = collection(db, "pickups");
  const q = query(pickupsRef, where("volunteerId", "==", volunteerId));

  return onSnapshot(q, (snapshot) => {
    const pickups = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Pickup[];
    onUpdate(pickups);
  });
};

export const subscribeToAvailableDonations = (
  onUpdate: (donations: Donation[]) => void
) => {
  const donationsRef = collection(db, "donations");
  const q = query(donationsRef, where("status", "==", "accepted"));

  return onSnapshot(q, async (snapshot) => {
    const donations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Donation[];

    // Get all unique donor IDs
    const donorIds = new Set<string>();
    donations.forEach((donation) => {
      if (donation.donorId) donorIds.add(donation.donorId);
    });

    // Batch fetch all donor data
    const donorPromises = Array.from(donorIds).map((id) =>
      getDoc(doc(db, "users", id))
    );
    const donorDocs = await Promise.all(donorPromises);

    // Create map for quick lookup
    const donorMap = new Map();
    donorDocs.forEach((doc) => {
      if (doc.exists()) {
        const data = doc.data();
        donorMap.set(doc.id, {
          name: data.organizationName || data.name || "Unknown Donor",
          address: data.address,
        });
      }
    });

    // Map the donations with the donor data
    const donationsWithDonorInfo = donations.map((donation) => {
      const donorData = donorMap.get(donation.donorId) || {
        name: "Unknown Donor",
        address: donation.location,
      };

      return {
        ...donation,
        donorName: donorData.name,
        donorAddress: donorData.address || donation.location,
      };
    });

    onUpdate(donationsWithDonorInfo);
  });
};
