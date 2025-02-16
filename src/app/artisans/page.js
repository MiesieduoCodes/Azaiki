"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useFetchData } from "@/app/components/constants/test";

const SearchArtists = ({ searchTerm, artists }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 relative z-10 font-[Poppins]">
      {artists.map((artist) => (
        <motion.div
          key={artist.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group shadow-2xl rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          <div className="relative">
            <img
              src={artist.profileImage || '/default-artist.jpg'}
              alt={artist.name}
              className="w-full h-60 object-cover"
              onError={(e) => {
                e.target.src = '/default-artist.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <Link href={`/artists?id=${artist.id}`}>
                <button className="text-black bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg shadow-md font-medium font-[Roboto Condensed]">
                  View Profile
                </button>
              </Link>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold group-hover:text-yellow-400 transition-colors duration-300 font-[Josefin Sans]">
              {artist.name}
            </h3>
            <p className="mt-2 font-[Noto Sans]">{artist.occupation}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default function ArtistsPage() {
  const { data, loading, error } = useFetchData();
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleArtists, setVisibleArtists] = useState(6);

  if (loading) return <div className="text-center py-20">Loading artists...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error.message}</div>;

  const filteredArtists = data.artist
    .filter(artist => 
      artist.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, visibleArtists);

  return (
    <div className="min-h-screen transition-colors duration-300 font-[Poppins]">
      <div className="px-4 sm:px-6 pt-24 py-8 mt-10">
        <div className="max-w-2xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search artists..."
            className="w-full px-6 py-3 rounded-lg border-2 border-yellow-400 focus:outline-none focus:border-yellow-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <SearchArtists 
          searchTerm={searchTerm} 
          artists={filteredArtists} 
        />

        {data.artist.length > visibleArtists && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setVisibleArtists(prev => prev + 6)}
              className="px-6 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition duration-200"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}