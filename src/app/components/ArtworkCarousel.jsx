import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ref, onValue } from "firebase/database";
import { database } from "@/app/firebase"; // Ensure correct path

const ArtworkCarousel = ({ artistId }) => {
  const [artworks, setArtworks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!artistId) {
      setError("No artist ID provided");
      setLoading(false);
      return;
    }

    const artworksRef = ref(database, `artists/${artistId}/artworks`);
    const unsubscribe = onValue(artworksRef, 
      (snapshot) => {
        if (snapshot.exists()) {
          const artworksData = [];
          snapshot.forEach((childSnapshot) => {
            artworksData.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });
          setArtworks(artworksData);
          setError(null);
        } else {
          setError("No artworks found");
        }
        setLoading(false);
      },
      (error) => {
        setError("Error loading artworks");
        console.error("Firebase error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [artistId]);

  useEffect(() => {
    if (artworks.length > 0) {
      const interval = setInterval(() => {
        nextArtwork();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [currentIndex, artworks]);

  const nextArtwork = () => {
    if (artworks.length === 0) return;
    
    const nextIndex = (currentIndex + 1) % artworks.length;
    setCurrentIndex(nextIndex);

    gsap.to(carouselRef.current.children, {
      xPercent: -100 * nextIndex,
      duration: 1.5,
      ease: "power3.inOut",
    });

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  };

  const prevArtwork = () => {
    if (artworks.length === 0) return;
    
    const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    setCurrentIndex(prevIndex);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-12 text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (!artworks || artworks.length === 0) return null;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 mt-10 bg-gray-100 dark:bg-gray-900 shadow-lg rounded-lg mx-auto max-w-4xl relative">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        Artworks
      </h2>
      <div className="relative overflow-hidden w-full flex items-center">
        <button onClick={prevArtwork} className="absolute left-0 p-3 bg-white dark:bg-gray-800 shadow-md rounded-full z-10">
          ◀
        </button>
        <div className="flex overflow-hidden w-full" style={{ height: "500px" }}>
          <div ref={carouselRef} className="flex w-full transition-transform">
            {artworks.map((artwork, index) => (
              <div key={artwork.id} className="flex-shrink-0 w-full flex flex-col items-center text-center px-4">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    width={400}
                    height={400}
                    className="object-cover w-full h-96 transition-all duration-300"
                  />
                </div>
                <div ref={textRef} className="mt-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-md w-3/4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {artwork.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    {artwork.description || "No description available."}
                  </p>
                  {artwork.year && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Created: {artwork.year}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={nextArtwork} className="absolute right-0 p-3 bg-white dark:bg-gray-800 shadow-md rounded-full z-10">
          ▶
        </button>
      </div>
    </div>
  );
};

export default ArtworkCarousel;