import { initializeApp } from "firebase/app"; // Importing initializeApp function from Firebase app
import { getFirestore } from "firebase/firestore"; // Importing getFirestore function from Firebase Firestore
import { getAuth } from "firebase/auth"; // Importing getAuth function from Firebase authentication

// Firebase configuration object containing API keys and other settings
const firebaseConfig = {
  apiKey: "AIzaSyA7pYDQByqvTO7Jo9bnsgko6IA61kGJcdk",
  authDomain: "renpm starcation-9e3d9.firebaseapp.com",
  projectId: "react-authentication-9e3d9",
  storageBucket: "react-authentication-9e3d9.appspot.com",
  messagingSenderId: "931119955721",
  appId: "1:931119955721:web:b04ec16df684b0293f1dd8",
  measurementId: "G-SE8PXV16XB"
};

// Initialize Firebase with the provided configuration
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app; // Exporting the initialized Firebase app instance as the default export