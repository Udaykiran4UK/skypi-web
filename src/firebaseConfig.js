// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7czVZCT_pH5SiUyGRPE_19D7CMAGtM2U",
  authDomain: "skypi-47.firebaseapp.com",
  projectId: "skypi-47",
  storageBucket: "skypi-47.appspot.com", // Corrected storage bucket
  messagingSenderId: "978789484451",
  appId: "1:978789484451:web:f863d5858fd182a9bc3c16",
  measurementId: "G-0DGCRQQ77Y"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Services
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // Initialize Firebase Auth
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null; // Only load Analytics if in the browser

export { app, db, storage, auth, analytics };
