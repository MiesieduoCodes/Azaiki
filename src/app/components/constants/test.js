"use client";
import { useState, useEffect } from 'react';
import { database } from '@/app/firebase'; // This should export the Realtime Database instance (getDatabase(app))
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
    const unsubscribes = [];
    try {
      // Artists collection
      const artistsRef = ref(database, 'artists');
      const unsubscribeArtists = onValue(
        artistsRef,
        (snapshot) => {
          const val = snapshot.val();
          const artistsData = val ? Object.keys(val).map(key => ({ id: key, ...val[key] })) : [];
          setData(prev => ({ ...prev, artist: artistsData }));
        },
        (err) => {
          console.error("Artists listen error:", err);
          setError(err);
        }
      );
      unsubscribes.push(unsubscribeArtists);

      // Testimonials collection
      const testimonialsRef = ref(database, 'testimonials');
      const unsubscribeTestimonials = onValue(
        testimonialsRef,
        (snapshot) => {
          const testimonialsData = snapshot.val() || localData.testimonials;
          setData(prev => ({ ...prev, testimonials: testimonialsData }));
        },
        (err) => {
          console.error("Testimonials listen error:", err);
          setError(err);
        }
      );
      unsubscribes.push(unsubscribeTestimonials);

      // Nigerdelta collection
      const nigerdeltaRef = ref(database, 'nigerdelta');
      const unsubscribeNigerdelta = onValue(
        nigerdeltaRef,
        (snapshot) => {
          const nigerdeltaData = snapshot.val();
          setData(prev => ({ ...prev, nigerdelta: nigerdeltaData }));
        },
        (err) => {
          console.error("Nigerdelta listen error:", err);
          setError(err);
        }
      );
      unsubscribes.push(unsubscribeNigerdelta);

      // Generalarts collection
      const generalartsRef = ref(database, 'generalarts');
      const unsubscribeGeneralarts = onValue(
        generalartsRef,
        (snapshot) => {
          const generalartsData = snapshot.val();
          setData(prev => ({ ...prev, generalarts: generalartsData }));
        },
        (err) => {
          console.error("Generalarts listen error:", err);
          setError(err);
        }
      );
      unsubscribes.push(unsubscribeGeneralarts);

      // Africanartists collection
      const africanartistsRef = ref(database, 'africanartists');
      const unsubscribeAfricanartists = onValue(
        africanartistsRef,
        (snapshot) => {
          const africanartistsData = snapshot.val();
          setData(prev => ({ ...prev, africanartists: africanartistsData }));
        },
        (err) => {
          console.error("Africanartists listen error:", err);
          setError(err);
        }
      );
      unsubscribes.push(unsubscribeAfricanartists);

      // Digitalarts collection
      const digitalartsRef = ref(database, 'digitalarts');
      const unsubscribeDigitalarts = onValue(
        digitalartsRef,
        (snapshot) => {
          const digitalartsData = snapshot.val();
          setData(prev => ({ ...prev, digitalarts: digitalartsData }));
        },
        (err) => {
          console.error("Digitalarts listen error:", err);
          setError(err);
        }
      );
      unsubscribes.push(unsubscribeDigitalarts);

      // Contemporary collection
      const contemporaryRef = ref(database, 'contemporary');
      const unsubscribeContemporary = onValue(
        contemporaryRef,
        (snapshot) => {
          const contemporaryData = snapshot.val();
          setData(prev => ({ ...prev, contemporary: contemporaryData }));
        },
        (err) => {
          console.error("Contemporary listen error:", err);
          setError(err);
        }
      );
      unsubscribes.push(unsubscribeContemporary);

      // Sculptures collection
      const sculpturesRef = ref(database, 'sculptures');
      const unsubscribeSculptures = onValue(
        sculpturesRef,
        (snapshot) => {
          const sculpturesData = snapshot.val();
          setData(prev => ({ ...prev, sculptures: sculpturesData }));
        },
        (err) => {
          console.error("Sculptures listen error:", err);
          setError(err);
        }
      );
      unsubscribes.push(unsubscribeSculptures);

      setLoading(false);

      return () => {
        unsubscribes.forEach(unsubscribe => unsubscribe());
      };
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  const mergedData = {
    artist: data.artist?.length ? data.artist : localData.artist,
    testimonials: data.testimonials || localData.testimonials,
    nigerdelta: data.nigerdelta || localData.nigerdelta,
    generalarts: data.generalarts || localData.generalarts,
    africanartists: data.africanartists || localData.africanartists,
    digitalarts: data.digitalarts || localData.digitalarts,
    contemporary: data.contemporary || localData.contemporary,
    sculptures: data.sculptures || localData.sculptures
  };

  return { data: mergedData, loading, error };
};
