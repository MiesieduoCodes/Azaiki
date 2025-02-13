import React, { useState, useEffect } from "react";

const HomeSlider = () => {
  const slides = [
    {
      src: "https://images.pexels.com/photos/301792/pexels-photo-301792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Digital Art Showcase",
      description: "Experience the beauty of digital art.",
    },
    {
      src: "https://images.pexels.com/photos/10157908/pexels-photo-10157908.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Art Exhibition",
      description: "Explore contemporary art exhibitions.",
    },
    {
      src: "https://images.pexels.com/photos/4383426/pexels-photo-4383426.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Community Connection",
      description: "Join vibrant artistic communities.",
    },
    {
      src: "https://images.pexels.com/photos/12379211/pexels-photo-12379211.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Cultural Exploration",
      description: "Dive into rich cultural heritage.",
    },
    {
      src: "https://images.pexels.com/photos/371909/pexels-photo-371909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Creative Inspiration",
      description: "Unleash your creativity.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); 
  
    return () => clearInterval(interval);
  }, []); // Empty dependency array

  return (
    <div className="bg-black text-white">
      <div className="relative w-full">
        {/* Carousel Wrapper */}
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
                loading="lazy" // Adds lazy loading for better performance
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-yellow-400 text-3xl font-semibold">{slide.alt}</p>
                <p className="text-white text-lg">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex ? "bg-yellow-400" : "bg-gray-600"
              }`}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;