"use client";
import { useState, useEffect } from 'react';
import { db } from '@/app/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const localData = {
  artist: [],
  categories: [],
  testimonials: { testimonials: [] },
  navadata: {},
  nigerdelta: {},
  generalarts: []
};

export const useFetchData = () => {
  const [data, setData] = useState(localData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unsubscribes = [];
        
        // Artists collection
        const artistsUnsubscribe = onSnapshot(
          collection(db, 'artists'),
          (snapshot) => {
            const artistsData = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setData(prev => ({ ...prev, artist: artistsData }));
          },
          (error) => {
            console.error("Artists listen error:", error);
            setError(error);
          }
        );
        unsubscribes.push(artistsUnsubscribe);

        // Categories collection
        const categoriesUnsubscribe = onSnapshot(
          collection(db, 'categories'),
          (snapshot) => {
            const categoriesData = snapshot.docs.map(doc => doc.data());
            setData(prev => ({ ...prev, categories: categoriesData }));
          },
          (error) => {
            console.error("Categories listen error:", error);
            setError(error);
          }
        );
        unsubscribes.push(categoriesUnsubscribe);

        // Testimonials collection
        const testimonialsUnsubscribe = onSnapshot(
          collection(db, 'testimonials'),
          (snapshot) => {
            const testimonialsData = snapshot.docs[0]?.data() || localData.testimonials;
            setData(prev => ({ ...prev, testimonials: testimonialsData }));
          },
          (error) => {
            console.error("Testimonials listen error:", error);
            setError(error);
          }
        );
        unsubscribes.push(testimonialsUnsubscribe);

        setLoading(false);

        // Cleanup function
        return () => {
          unsubscribes.forEach(unsubscribe => unsubscribe());
        };

      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Merge with local data for fallback
  const mergedData = {
    artist: data.artist?.length ? data.artist : localData.artist,
    categories: data.categories?.length ? data.categories : localData.categories,
    testimonials: data.testimonials || localData.testimonials,
    navadata: data.navadata || localData.navadata,
    nigerdelta: data.nigerdelta || localData.nigerdelta,
    generalarts: data.generalarts || localData.generalarts
  };

  return { data: mergedData, loading, error };
};