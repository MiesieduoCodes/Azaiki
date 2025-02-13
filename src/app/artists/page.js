"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import ArtworkCarousel from "@/app/components/ArtworkCarousel";
import artistsData from "@/app/components/constants/artists.json";
import { FaEnvelope, FaLinkedin, FaTwitter } from 'react-icons/fa';

const ArtistProfilePage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || params?.id;
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    if (id) {
      const foundArtist = artistsData.find((artist) => artist.id === parseInt(id));
      setArtist(foundArtist);
    }
  }, [id]);

  if (!artist)
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gray-200 dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center space-y-4 w-full max-w-lg px-6">
          <div className="w-16 h-16 border-4 border-t-transparent border-gray-800 dark:border-gray-300 rounded-full animate-spin mx-auto shadow-lg"></div>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-300 tracking-wider">
            Loading artist data...
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-400">
            Please wait a moment while we fetch the artist&apos;s information.
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
        <ArtworkCarousel artworks={artist.artworks} />
      </section>
    </div>
  );
};

export default function ArtistProfilePageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArtistProfilePage />
    </Suspense>
  );
}
