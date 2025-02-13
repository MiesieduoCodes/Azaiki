"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to Our Gallery",
      text: "Discover the beauty of art and creativity.",
      buttonText: "Explore Now",
      bgImage: "/images/IMG-20250207-WA0019.jpg",
        buttonLink: "/all"
    },
    {
      title: "Unleash Your Imagination",
      text: "Step into a world where art meets innovation.",
      buttonText: "Get Inspired",
      bgImage:
        "/images/IMG-20250207-WA0022.jpg",
        buttonLink: "#"

    },
    {
      title: "Connect with Artists",
      text: "Engage with a vibrant community of creators.",
      buttonText: "Join the Community",
      bgImage:
        "/images/IMG-20250207-WA0023.jpg",
        buttonLink: "/artisans"

    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex justify-center items-center min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[currentSlide].bgImage})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center min-h-screen text-center px-6">
            <motion.div
              className="max-w-2xl p-8 rounded-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="mb-5 text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-md">
                {slides[currentSlide].title}
              </h1>
              <p className="mb-8 text-lg md:text-xl text-gray-300">
                {slides[currentSlide].text}
              </p>

              <Link href={slides[currentSlide].buttonLink} className="inline-block">
            <button className="bg-yellow-400 text-black hover:bg-yellow-500 px-6 py-3 text-lg rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105">
              {slides[currentSlide].buttonText}
            </button>
            </Link>

            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Hero;