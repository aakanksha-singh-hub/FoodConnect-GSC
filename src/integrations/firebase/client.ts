import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQAB5aIarRKBj_pXv1dl1y78SKcmphv3o",
  authDomain: "foodredis-58bb1.firebaseapp.com",
  projectId: "foodredis-58bb1",
  storageBucket: "foodredis-58bb1.firebasestorage.app",
  messagingSenderId: "353090871300",
  appId: "1:353090871300:web:4d63039144ae972d925551",
  measurementId: "G-2Q8VW920H9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Set persistence to LOCAL (persists even after browser is closed)
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error setting auth persistence:", error);
});

export const db = getFirestore(app);
export const storage = getStorage(app);

// Note: The interfaces below are for reference only.
// The actual interfaces are defined in src/types/index.ts
