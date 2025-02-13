"use client";
import { useState, useEffect } from "react";
import { useFetchData } from "@/app/components/constants/test.js";

export default function NigerDeltaArts() {
  const { fetchedData, isLoading, error } = useFetchData();
  const [artists, setArtists] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (fetchedData && fetchedData.nigerdelta) {
      setArtists(fetchedData.nigerdelta.artists || []);
    }
  }, [fetchedData]);

  if (isLoading) {
    return <>Loading........</>;
  }

  if (error) {
    return <>Error loading data.</>;
  }

  return (
    <div className={darkMode ? "bg-black text-white" : "bg-white text-black"}>
      {/* Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 px-4 py-2 bg-yellow-400 text-black rounded-lg shadow-md hover:bg-yellow-300 transition-all"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {/* Hero Section */}
      <header
        className="relative bg-cover bg-center h-[70vh] flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/images/niger-delta-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10 max-w-3xl px-6 py-12 bg-black/80 rounded-lg backdrop-blur-sm shadow-lg">
          <h1 className="text-6xl font-extrabold text-yellow-400 leading-tight">
            Niger Delta Artists
          </h1>
          <p className="mt-6 text-xl text-gray-300">
            Celebrating the cultural richness and artistic brilliance of the Niger Delta region.
          </p>
          <button className="mt-8 px-6 py-3 text-lg font-semibold text-black bg-yellow-400 rounded-lg shadow-md hover:bg-yellow-300 transition-all duration-300">
            Explore Now
          </button>
        </div>
      </header>

      {/* Featured Artists Section */}
      <section className="py-16 px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">Meet the Artists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={artist.profileImage || "/images/placeholder.jpg"}
                alt={artist.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-black dark:text-white">{artist.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-2">{artist.bio}</p>
              </div>
              <div className="p-6 bg-gray-200 dark:bg-gray-700">
                <h4 className="text-xl font-semibold mb-4 text-yellow-400">Artworks</h4>
                <div className="grid grid-cols-2 gap-4">
                  {artist.artworks.map((art, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={art.image || "/images/art-placeholder.jpg"}
                        alt={art.title}
                        className="w-full h-32 object-cover rounded-lg shadow-md"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-300">
                        <p className="text-sm">{art.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-8 bg-yellow-400 text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold">About Niger Delta Arts</h2>
          <p className="mt-4 text-lg">
            The Niger Delta region is a treasure trove of artistic talent and cultural heritage. From intricate carvings to vibrant paintings, the art of this region tells the stories of its people, their struggles, and their triumphs.
          </p>
          <p className="mt-6 text-lg">
            Art is not just a form of expression but a bridge between generations, carrying forward traditions and inspiring future artists. Explore the incredible creativity that defines the Niger Delta.
          </p>
        </div>
      </section>
    </div>
  );
}
