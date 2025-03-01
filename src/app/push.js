// Import necessary Firebase functions
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDw5qQ28aFBquTbv2c-sPF3qJlrw-Ie_DM",
    authDomain: "azaiki-37b16.firebaseapp.com",
    databaseURL: "https://azaiki-37b16-default-rtdb.firebaseio.com/",
    projectId: "azaiki-37b16",
    storageBucket: "azaiki-37b16.appspot.com", // Fixed URL
    messagingSenderId: "258504932866",
    appId: "1:258504932866:web:bcdf100025d014b45d311b",
    measurementId: "G-F272Z9R7XW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Import your data
import { africanartists, digitalarts, testimonials, generalarts, nigerdelta, artist, contemporary, sculptures } from './components/constants/main.js'; 

// Function to push data to Firebase
const pushDataToFirebase = async () => {
    try {
        const dataToPush = { africanartists, digitalarts, testimonials, generalarts, nigerdelta, artist, contemporary, sculptures };

        await Promise.all(
            Object.entries(dataToPush).map(async ([key, value]) => {
                const dataRef = ref(database, key);
                await set(dataRef, value);
                console.log(`✅ Data pushed for ${key}:`, value);
            })
        );

        console.log("🔥 All data successfully pushed to Firebase!");
    } catch (error) {
        console.error("❌ Error pushing data:", error);
    }
};

// Call the function to push data
pushDataToFirebase();
