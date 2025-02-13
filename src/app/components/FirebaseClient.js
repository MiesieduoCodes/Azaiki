// "use client";  // Ensure this component is only rendered on the client side
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw5qQ28aFBquTbv2c-sPF3qJlrw-Ie_DM",
  authDomain: "azaiki-37b16.firebaseapp.com",
  databaseURL: "https://azaiki-37b16-default-rtdb.firebaseio.com/",
  projectId: "azaiki-37b16",
  storageBucket: "azaiki-37b16.appspot.com",
  messagingSenderId: "258504932866",
  appId: "1:258504932866:web:bcdf100025d014b45d311b",
  measurementId: "G-F272Z9R7XW"
};

const FirebaseClient = () => {
  useEffect(() => {
    // Initialize Firebase only on the client-side
    const app = initializeApp(firebaseConfig);

    // Only initialize Analytics if it's supported
    if (typeof window !== "undefined" && isSupported()) {
      getAnalytics(app);
    }

    // Initialize the database
    getDatabase(app);
  }, []);

  return null; // This component doesn't need to render anything
};

export default FirebaseClient;
