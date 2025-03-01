"use client";
import { useState, useEffect } from "react";
import { database } from "@/app/firebase"; // Ensure correct Firebase setup
import { ref, onValue } from "firebase/database";

const localData = {
  artist: [],
  testimonials: { testimonials: [] },
  nigerdelta: {},
  generalarts: [],
  africanartists: [],
  digitalarts: [],
  contemporary: [],
  sculptures: []
};

export const useFetchData = () => {
  const [data, setData] = useState(localData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const paths = [
      "artists", "testimonials", "nigerdelta", "generalarts",
      "africanartists", "digitalarts", "contemporary", "sculptures"
    ];

    const unsubscribes = [];

    try {
      paths.forEach((path) => {
        const dbRef = ref(database, path);
        const unsubscribe = onValue(
          dbRef,
          (snapshot) => {
            const value = snapshot.val();
            console.log(`Fetched data from ${path}:`, value); // Debugging log

            // Convert object to array if necessary
            setData((prev) => ({
              ...prev,
              [path]: value ? Object.entries(value).map(([id, item]) => ({ id, ...item })) : []
            }));
          },
          (err) => {
            console.error(`${path} listen error:`, err);
            setError(err);
          }
        );
        unsubscribes.push(unsubscribe);
      });

      // Ensure loading stops after data is fetched
      setTimeout(() => setLoading(false), 1000);

      return () => {
        unsubscribes.forEach((unsub) => unsub());
      };
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
};
