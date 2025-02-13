// import { useEffect, useState } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, get } from 'firebase/database';
// import { app, database } from '@/app/firebase.js'

// // Local data as a fallback
// const localData = {
//     contemporary: [],
//     artist: [],
//     testimonials: {
//         "testimonials": [
//             { "quote": "Azaiki Art Gallery is an exceptional space.", "name": "Jane Doe", "role": "Contemporary Artist" }
//         ]
//     },
//     navadata: {
//         "user": {
//             "name": "Contact Us",
//             "avatar": "/avatars/shadcn.jpg",
//             "url": "/contact"
//         }
//     },
//     nigerdelta: {
//         "artists": [
//             { "name": "Ebiye Obuba", "bio": "A master woodcarver known for intricate designs." }
//         ]
//     },
//     generalarts: [
//         {
//             "id": "digital-arts",
//             "title": "Digital Arts",
//             "items": [
//                 { "title": "Digital Art 1", "image": "https://via.placeholder.com/400x300" }
//             ]
//         }
//     ]
// };

// // Custom hook to fetch data
// export const useFetchData = () => {
//     const [fetchedData, setFetchedData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchDataFromFirebase = async () => {
//             try {
//                 const dbRef = ref(database);
//                 const snapshot = await get(dbRef);

//                 if (snapshot.exists()) {
//                     const data = snapshot.val();
//                     setFetchedData({
//                         contemporary: data.contemporary || localData.contemporary,
//                         artist: data.artist || localData.artist,
//                         testimonials: data.testimonials || localData.testimonials,
//                         navadata: data.navadata || localData.navadata,
//                         nigerdelta: data.nigerdelta || localData.nigerdelta,
//                         generalarts: data.generalarts || localData.generalarts
//                     });
//                 } else {
//                     console.log('No data available, using local data.');
//                     setFetchedData(localData);
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setFetchedData(localData); // Use local data in case of error
//             } finally {
//                 setIsLoading(false); // Set loading to false after fetching
//             }
//         };

//         fetchDataFromFirebase();
//     }, []);

//     return { fetchedData, isLoading };
// };
import React from 'react'

const test = () => {
  return (
    <div>test</div>
  )
}

export default test