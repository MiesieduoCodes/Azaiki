"use client";

import { Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Mocking the useFetchData function since it's commented out
const useFetchData = () => {
  // Simulated fetch function (replace with actual fetch logic)
  const [data, setData] = useState({ artist: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetch
    const fetchData = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/artists'); // Example endpoint
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { fetchedData: data, isLoading: loading, error };
};

const SearchArtists = ({ searchTerm, artists }) => {
  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 relative z-10 font-[Poppins]">
      {filteredArtists.length > 0 ? (
        filteredArtists.map((artist) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group shadow-2xl rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <div className="relative">
              <img
                src={artist.profileImage}
                alt={artist.name}
                className="w-full h-60 object-cover"
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
        ))
      ) : (
        <p className="text-center text-gray-500">No artists found.</p>
      )}
    </div>
  );
};

const ArtistsListPage = () => {
  const { fetchedData, isLoading, error } = useFetchData();
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleArtists, setVisibleArtists] = useState(6);
  const [featuredArtist, setFeaturedArtist] = useState(null);

  useEffect(() => {
    if (fetchedData && fetchedData.artist.length > 0) {
      setArtists(fetchedData.artist);
      const artist = fetchedData.artist.find(a => a.id === 3);
      setFeaturedArtist(artist || fetchedData.artist[0]);
    }
  }, [fetchedData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading artists: {error.message}</div>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen transition-colors duration-300 font-[Poppins] ">
        <div className="px-4 sm:px-6 pt-24 py-8 mt-10">
          <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6 font-[Josefin Sans]">
            Featured Artist
          </h2>

          {featuredArtist && (
            <div className="max-w-4xl mx-auto bg-yellow-400 p-6 rounded-xl shadow-md text-center">
              <h3 className="text-2xl font-bold">{featuredArtist.name}</h3>
              <p className="text-black">{featuredArtist.occupation}</p>
              <img
                src={featuredArtist.profileImage}
                alt={featuredArtist.name}
                className="mx-auto mt-4 w-32 h-32 rounded-full object-cover"
              />
              <Link href={`/artists?id=${featuredArtist.id}`}>
                <button className="mt-4 px-4 py-2 bg-black text-yellow-400 rounded-md hover:bg-gray-900 transition duration-200">
                  View Profile
                </button>
              </Link>
            </div>
          )}

          <div className="mt-16 text-center max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-yellow-400">About Us</h3>
            <p className="mt-4 text-lg">
              Our platform connects talented artists from around the world. Whether you&apos;re a painter, musician, or digital creator, we showcase your work to a global audience.
            </p>
          </div>

          <SearchArtists searchTerm={searchTerm} artists={artists.slice(0, visibleArtists)} />

          {artists.length > visibleArtists && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setVisibleArtists(visibleArtists + 6)}
                className="px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition duration-200 font-[Roboto Condensed]"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default ArtistsListPage;