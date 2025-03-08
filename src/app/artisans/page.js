"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ref, onValue } from "firebase/database";
import { database } from "@/app/firebase";

const SearchArtists = ({ searchTerm, artists }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 relative z-10">
      {artists.map((artist, index) => (
        <motion.div
          key={artist.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="group shadow-lg dark:shadow-gray-800/50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800"
          whileHover={{ y: -5 }}
        >
          <div className="relative aspect-square">
            <img
              src={artist.profileImage || '/default-artist.jpg'}
              alt={artist.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/default-artist.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <Link href={`/artists?id=${artist.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-black dark:text-white bg-yellow-400 hover:bg-yellow-500 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg shadow-md font-medium transition-colors"
                >
                  View Profile
                </motion.button>
              </Link>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-yellow-500 transition-colors">
              {artist.name}
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              {artist.occupation}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleArtists, setVisibleArtists] = useState(8);

  // Fetch artists from Firebase
  useEffect(() => {
    const artistsRef = ref(database, 'artists');
    const unsubscribe = onValue(artistsRef, 
      (snapshot) => {
        if (snapshot.exists()) {
          const artistsArray = [];
          snapshot.forEach((childSnapshot) => {
            artistsArray.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });
          setArtists(artistsArray);
          setError(null);
        } else {
          setError("No artists found");
        }
        setLoading(false);
      },
      (error) => {
        setError("Failed to load artists");
        console.error("Firebase error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Filter artists based on search term
  const filteredArtists = artists
    .filter(artist => 
      artist.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, visibleArtists);

  // Loading state
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity }}
        className="h-12 w-12 border-4 border-yellow-500 border-t-transparent rounded-full"
      />
    </div>
  );

  // Error state
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center p-8 max-w-md">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {error}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please try refreshing the page or check back later
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="px-4 sm:px-6 pt-24 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <input
            type="text"
            placeholder="Search artists..."
            className="w-full px-6 py-3 rounded-xl border-2 border-yellow-400 dark:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>

        <SearchArtists 
          searchTerm={searchTerm} 
          artists={filteredArtists} 
        />

        {artists.length > visibleArtists && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center"
          >
            <motion.button
              onClick={() => setVisibleArtists(prev => prev + 8)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-yellow-400 dark:bg-yellow-500 text-black dark:text-white rounded-xl hover:bg-yellow-500 dark:hover:bg-yellow-600 transition-colors shadow-md"
            >
              Load More
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}