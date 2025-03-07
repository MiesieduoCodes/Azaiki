"use client";
import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ref, onValue } from "firebase/database";
import { database } from "@/app/firebase"; // Ensure this path is correct

const AfricanArtsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [artPieces, setArtPieces] = useState([]);
  const [artists, setArtists] = useState([]);
  const [filteredArt, setFilteredArt] = useState([]);

  // Initialize Firebase data fetch
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fetch art pieces from Firebase
    const artPiecesRef = ref(database, 'artPieces');
    const unsubscribeArt = onValue(artPiecesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const artArray = Object.values(data);
        setArtPieces(artArray);
        setFilteredArt(artArray);
      }
    });

    // Fetch artists from Firebase
    const artistsRef = ref(database, 'artists');
    const unsubscribeArtists = onValue(artistsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const artistsArray = Object.values(data);
        setArtists(artistsArray);
      }
    });

    // Cleanup subscriptions
    return () => {
      unsubscribeArt();
      unsubscribeArtists();
    };
  }, []);

  // Handle search functionality
  useEffect(() => {
    const filtered = artPieces.filter(
      (art) =>
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArt(filtered);
  }, [searchQuery, artPieces]);

  // Animation effects
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Header animations
    gsap.from(".header-title", {
      opacity: 0,
      y: -100,
      duration: 2,
      ease: "power3.out",
    });

    gsap.from(".header-description", {
      opacity: 0,
      y: 50,
      duration: 2,
      delay: 0.5,
      ease: "power3.out",
    });

    // Search bar animation
    gsap.from(".search-bar", {
      opacity: 0,
      x: -200,
      duration: 3,
      delay: 1,
      ease: "power3.in",
    });

    // Art pieces animation
    gsap.from(".art-piece", {
      opacity: 0,
      y: 100,
      stagger: 0.2,
      duration: 3,
      scrollTrigger: {
        trigger: ".art-piece",
        start: "top 90%",
        end: "top 20%",
        scrub: true,
      },
    });

    // Artist spotlight animation
    gsap.from(".artist-spotlight", {
      opacity: 0,
      y: 100,
      stagger: 0.3,
      duration: 7,
      scrollTrigger: {
        trigger: ".artist-spotlight",
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
    });
  }, []);

  return (
    <div>
      {/* Header Section */}
      <section className="relative bg-gradient-to-r pt-40 from-green-600 via-yellow-500 to-red-600 text-white py-20 px-6 text-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-screen-xl mx-auto">
          <h1 className="text-5xl font-extrabold leading-tight mb-4 header-title">
            Discover the Timeless Beauty of African Arts
          </h1>
          <p className="text-lg mb-6 header-description">
            Experience the rich cultural heritage, vibrant traditions, and unique artistic expressions of Africa.
          </p>
          <a
            href="#explore"
            className="bg-yellow-400 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition duration-300"
          >
            Explore African Art
          </a>
          
          {/* Search Bar */}
          <form onSubmit={(e) => e.preventDefault()} className="mt-8 search-bar">
            <div className="relative max-w-lg mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search African Art..."
                className="w-full py-3 px-6 text-lg rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Art Section */}
      <section id="explore" className="py-16 px-6 bg-white text-black dark:bg-black dark:text-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold">Featured African Art Pieces</h2>
          <p className="text-lg text-gray-600 mt-4">
            Discover iconic African art pieces from our collection
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredArt.length > 0 ? (
            filteredArt.map((art) => (
              <div key={art.id} className="bg-white rounded-lg shadow-lg overflow-hidden art-piece">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{art.title}</h3>
                  <p className="text-gray-600 mt-2">{art.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 col-span-full text-center">
              No art pieces found matching your search
            </p>
          )}
        </div>
      </section>

      {/* Cultural Significance Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Cultural Significance
          </h2>
          <p className="text-lg text-gray-600 mt-6">
            African art embodies centuries of tradition and spiritual meaning...
          </p>
        </div>
      </section>

      {/* Artists Spotlight Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Featured Artists
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {artists.map((artist) => (
            <div key={artist.id} className="bg-white rounded-lg shadow-lg overflow-hidden artist-spotlight">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{artist.name}</h3>
                <p className="text-gray-600 mt-2">{artist.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 bg-yellow-50">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Contact Us
          </h2>
          <a
            href="mailto:contact@africanart.com"
            className="mt-6 inline-block bg-yellow-500 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default AfricanArtsPage;