import { db } from "@/integrations/firebase/client";
import { collection, doc, setDoc } from "firebase/firestore";

/**
 * This script initializes the Firestore database with the necessary collections
 * and some sample data for testing purposes.
 *
 * Run this script once to set up your database structure.
 */
export const initializeFirestore = async () => {
  try {
    console.log("Initializing Firestore database...");

    // Create collections if they don't exist
    const collections = [
      "users",
      "donations",
      "pickups",
      "recipients",
      "volunteers",
      "donors",
    ];

    // Create a sample user for testing
    const sampleUser = {
      id: "sample-user-id",
      uid: "sample-user-uid",
      email: "sample@example.com",
      role: "donor",
      name: "Sample User",
      organizationName: "Sample Organization",
      phone: "123-456-7890",
      location: "San Francisco",
      address: "123 Main St, San Francisco, CA 94105",
      createdAt: new Date().toISOString(),
    };

    // Create a sample donation for testing
    const sampleDonation = {
      id: "sample-donation-id",
      donorId: "sample-user-uid",
      donorName: "Sample Organization",
      foodType: "Fresh Vegetables",
      quantity: 50,
      unit: "kg",
      location: "123 Main St, San Francisco, CA 94105",
      pickupAddress: "123 Main St",
      pickupCity: "San Francisco",
      pickupState: "CA",
      pickupZipCode: "94105",
      pickupLat: 37.7749,
      pickupLng: -122.4194,
      storageType: "refrigerated",
      temperatureRange: "2-4°C",
      allergens: ["None"],
      contactPersonName: "John Doe",
      contactPersonPhone: "123-456-7890",
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Create a sample pickup for testing
    const samplePickup = {
      id: "sample-pickup-id",
      donationId: "sample-donation-id",
      donorId: "sample-user-uid",
      recipientId: "sample-recipient-id",
      volunteerId: "sample-volunteer-id",
      status: "in_progress",
      quantity: 50,
      pickupLocation: "123 Main St, San Francisco, CA 94105",
      pickupAddress: "123 Main St",
      pickupCity: "San Francisco",
      pickupState: "CA",
      pickupZipCode: "94105",
      pickupLat: 37.7749,
      pickupLng: -122.4194,
      contactPersonName: "John Doe",
      contactPersonPhone: "123-456-7890",
      dropoffLocation: "456 Market St, San Francisco, CA 94103",
      dropoffAddress: "456 Market St",
      dropoffCity: "San Francisco",
      dropoffState: "CA",
      dropoffZipCode: "94103",
      dropoffLat: 37.779,
      dropoffLng: -122.4177,
      createdAt: new Date().toISOString(),
    };

    // Create a sample recipient for testing
    const sampleRecipient = {
      id: "sample-recipient-id",
      uid: "sample-recipient-uid",
      email: "recipient@example.com",
      role: "recipient",
      name: "Food Bank",
      organizationName: "Community Food Bank",
      phone: "987-654-3210",
      location: "San Francisco",
      address: "456 Market St, San Francisco, CA 94103",
      createdAt: new Date().toISOString(),
    };

    // Create a sample volunteer for testing
    const sampleVolunteer = {
      id: "sample-volunteer-id",
      uid: "sample-volunteer-uid",
      email: "volunteer@example.com",
      role: "volunteer",
      name: "Jane Smith",
      phone: "555-123-4567",
      location: "San Francisco",
      address: "789 Mission St, San Francisco, CA 94103",
      createdAt: new Date().toISOString(),
    };

    // Add sample data to collections
    await setDoc(doc(db, "users", sampleUser.uid), sampleUser);
    await setDoc(doc(db, "donations", sampleDonation.id), sampleDonation);
    await setDoc(doc(db, "pickups", samplePickup.id), samplePickup);
    await setDoc(doc(db, "recipients", sampleRecipient.uid), sampleRecipient);
    await setDoc(doc(db, "volunteers", sampleVolunteer.uid), sampleVolunteer);
    await setDoc(doc(db, "donors", sampleUser.uid), sampleUser);

    console.log("Firestore database initialized successfully!");
    return true;
  } catch (error) {
    console.error("Error initializing Firestore database:", error);
    throw error;
  }
};

// Uncomment the line below to run the initialization script
// initializeFirestore().then(() => console.log("Done!"));
