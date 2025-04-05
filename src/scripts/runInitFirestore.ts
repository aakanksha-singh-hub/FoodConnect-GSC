import { initializeFirestore } from "./initFirestore";

// Run the initialization script
console.log("Starting Firestore initialization...");
initializeFirestore()
  .then(() => {
    console.log("Firestore initialization completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error during Firestore initialization:", error);
    process.exit(1);
  });
