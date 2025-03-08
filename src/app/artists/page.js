"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import ArtworkCarousel from "@/app/components/ArtworkCarousel";
import { ref, onValue } from "firebase/database";
import { database } from "@/app/firebase"; // Ensure this path is correct

const ArtistProfilePage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || params?.id;
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No artist ID provided");
      setLoading(false);
      return;
    }

    const artistRef = ref(database, `artists/${id}`);
    const unsubscribe = onValue(artistRef, 
      (snapshot) => {
        if (snapshot.exists()) {
          setArtist({
            id: snapshot.key,
            ...snapshot.val()
          });
        } else {
          setError("Artist not found");
        }
        setLoading(false);
      },
      (error) => {
        setError("Error fetching artist data");
        console.error("Firebase error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-200 dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center space-y-4 w-full max-w-lg px-6">
        <div className="w-16 h-16 border-4 border-t-transparent border-gray-800 dark:border-gray-300 rounded-full animate-spin mx-auto shadow-lg"></div>
        <p className="text-3xl font-bold text-gray-800 dark:text-gray-300 tracking-wider">
          Loading Artist Profile
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-400">
          Connecting to our art database...
        </p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-200 dark:bg-gray-900">
      <div className="text-center space-y-4 max-w-lg px-6">
        <div className="text-6xl">⚠️</div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-300">
          {error}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-400">
          Please check the artist ID or try again later
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-gray-100 pt-24 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-200 transition-colors duration-300 font-[Poppins]">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative bg-cover bg-center bg-no-repeat text-white py-20 w-full shadow-lg"
        style={{ backgroundImage: `url(${artist.coverimage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto flex flex-col items-center relative z-10">
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl">
            <Image
              src={artist.profileImage}
              alt={artist.name}
              width={160}
              height={160}
              className="object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold mt-6 text-center text-gray-100 font-[Playwrite IN]">
            {artist.name}
          </h1>
          <p className="mt-2 text-lg italic text-center text-gray-300 font-[Roboto Condensed]">
            {artist.occupation}
          </p>
        </div>
      </motion.div>

      {/* Biography Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="bg-gray-200 dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-colors duration-300"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-yellow-400 mb-4 font-[Josefin Sans]">Biography</h2>
          <p className="text-gray-700 dark:text-yellow-200 leading-relaxed font-[Noto Sans]">{artist.bio}</p>
        </motion.div>
      </section>

      {/* Artworks Carousel Section */}
      <section className="w-full bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-8 overflow-hidden transition-colors duration-300">
        <ArtworkCarousel artworks={artist.artworks || []} />
      </section>
    </div>
  );
};

export default function ArtistProfilePageWithSuspense() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen w-full bg-gray-200 dark:bg-gray-900">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-transparent border-gray-800 dark:border-gray-300 rounded-full animate-spin mx-auto"></div>
          <p className="text-xl text-gray-800 dark:text-gray-300">Initializing artist profile...</p>
        </div>
      </div>
    }>
      <ArtistProfilePage />
    </Suspense>
  );
}