import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const ArtworkCarousel = ({ artworks }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const textRef = useRef(null);

  if (!artworks || artworks.length === 0) return null;

  useEffect(() => {
    const interval = setInterval(() => {
      nextArtwork();
    }, 5000); // Slower transition for better readability

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextArtwork = () => {
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
    const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    setCurrentIndex(prevIndex);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 mt-10 bg-gray-100 dark:bg-gray-900 shadow-lg rounded-lg mx-auto max-w-4xl relative">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        Artworks
      </h2>
      <div className="relative overflow-hidden w-full flex items-center">
        <button onClick={prevArtwork} className="absolute left-0 p-3 bg-white dark:bg-gray-800 shadow-md rounded-full z-10">
          ◀
        </button>
        <div
          className="flex overflow-hidden w-full"
          style={{ height: "500px" }}
        >
          <div ref={carouselRef} className="flex w-full transition-transform">
            {artworks.map((artwork, index) => (
              <div key={index} className="flex-shrink-0 w-full flex flex-col items-center text-center px-4">
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
