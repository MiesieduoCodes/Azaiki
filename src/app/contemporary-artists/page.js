"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useParams
import artistsData from "@/app/components/constants/contemporary.json";

export default function ProfilePage() {
  const { id } = useParams(); // Get the artist ID from the URL
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    if (id) {
      // Find the artist by ID
      const selectedArtist = artistsData.find(
        (artist) => artist.id === parseInt(id)
      );
      setArtist(selectedArtist);
    }
  }, [id]);

  if (!artist) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-teal-500 text-white">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full md:w-1/3 rounded-lg shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-bold mb-4">{artist.name}</h1>
            <p className="text-lg mb-6">{artist.bio}</p>
            <h2 className="text-2xl font-semibold mb-4">Portfolio</h2>
            <div className="grid grid-cols-2 gap-4">
              {artist.portfolio.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Portfolio ${index + 1}`}
                  className="rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
