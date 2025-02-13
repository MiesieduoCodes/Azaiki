import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDw5qQ28aFBquTbv2c-sPF3qJlrw-Ie_DM",
  authDomain: "azaiki-37b16.firebaseapp.com",
  projectId: "azaiki-37b16",
  storageBucket: "azaiki-37b16.appspot.com",
  messagingSenderId: "258504932866",
  appId: "1:258504932866:web:bcdf100025d014b45d311b",
  measurementId: "G-F272Z9R7XW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Use Firestore instead of Realtime Database

export { app, db };
