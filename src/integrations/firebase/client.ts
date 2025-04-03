import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQAB5aIarRKBj_pXv1dl1y78SKcmphv3o",
  authDomain: "foodredis-58bb1.firebaseapp.com",
  projectId: "foodredis-58bb1",
  storageBucket: "foodredis-58bb1.firebasestorage.app",
  messagingSenderId: "353090871300",
  appId: "1:353090871300:web:4d63039144ae972d925551",
  measurementId: "G-2Q8VW920H9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Export types
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'donor' | 'recipient' | 'volunteer';
  location: string;
  phoneNumber: string;
}

export interface Donation {
  id: string;
  donorId: string;
  foodType: string;
  quantity: number;
  location: string;
  expiryDate: string;
  status: 'available' | 'needs_pickup' | 'in_transit' | 'completed';
  createdAt: string;
  imageUrl?: string;
  description?: string;
}

export interface Pickup {
  id: string;
  donationId: string;
  volunteerId: string;
  recipientId: string;
  status: 'pending' | 'accepted' | 'completed' | 'rejected';
  createdAt: string;
  completedAt?: string;
} 