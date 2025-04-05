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
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Donation[];
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
export const createPickup = async (
  pickup: Omit<Pickup, "id" | "status" | "createdAt">
) => {
  try {
    if (
      !pickup.donationId ||
      !pickup.donorId ||
      !pickup.recipientId ||
      !pickup.volunteerId
    ) {
      throw new Error("Missing required fields for pickup");
    }

    // Get the donation details to populate pickup fields
    const donationRef = doc(db, "donations", pickup.donationId);
    const donationDoc = await getDoc(donationRef);

    if (!donationDoc.exists()) {
      throw new Error("Donation not found");
    }

    const donationData = donationDoc.data() as Donation;

    // Create the pickup with all required fields
    return addDoc(collection(db, "pickups"), {
      ...pickup,
      // Use donation data for pickup location
      pickupAddress: donationData.pickupAddress,
      pickupCity: donationData.pickupCity,
      pickupState: donationData.pickupState,
      pickupZipCode: donationData.pickupZipCode,
      pickupLat: donationData.pickupLat,
      pickupLng: donationData.pickupLng,
      pickupInstructions: donationData.pickupInstructions,
      pickupTimeWindowStart: donationData.pickupTimeWindowStart,
      pickupTimeWindowEnd: donationData.pickupTimeWindowEnd,
      contactPersonName: donationData.contactPersonName,
      contactPersonPhone: donationData.contactPersonPhone,
      // Set default status and timestamps
      status: "in_progress",
      createdAt: new Date().toISOString(),
    });
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

export const updatePickupStatus = async (
  pickupId: string,
  status: Pickup["status"]
) => {
  try {
    if (!pickupId) {
      throw new Error("Pickup ID is required");
    }

    const pickupRef = doc(db, "pickups", pickupId);
    const updateData: Partial<Pickup> = {
      status,
      updatedAt: new Date().toISOString(),
    };

    // Add completedAt timestamp if status is completed
    if (status === "completed") {
      updateData.completedAt = new Date().toISOString();
    }

    await updateDoc(pickupRef, updateData);
    return true;
  } catch (error) {
    console.error("Error updating pickup status:", error);
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
