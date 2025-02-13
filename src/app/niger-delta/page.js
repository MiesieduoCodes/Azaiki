"use client";
import { useEffect } from "react";
import ArtGuys from "@/app/components/nigerdeltaarts";

export default function NigerDeltaArts() {
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.classList.add("opacity-0", "transition-opacity", "duration-700");
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0");
          entry.target.classList.add("opacity-100");
          observer.unobserve(entry.target);
        }
      });
      observer.observe(section);
    });
  }, []);

  return (
    <div className="bg-earth-tone pt-24 dark:bg-dark-brown text-lg text-black dark:text-gray-300 transition-colors duration-300">
      {/* Hero Section */}
      <header
        className="relative bg-cover bg-center h-[70vh] flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: "url('/images/niger-delta-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10 max-w-4xl px-6 py-12 bg-black/60 rounded-lg backdrop-blur-sm shadow-lg">
          <h1 className="text-6xl font-bold text-yellow-400 leading-tight">
            Niger Delta Arts
          </h1>
          <p className="mt-6 text-lg text-gray-300">
            Exploring the rich cultural heritage and artistic expressions of the Niger Delta region.
          </p>
        </div>
      </header>

      {/* Featured Artworks */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-5xl font-semibold mb-8 text-yellow-400">
          Featured Niger Delta Artworks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { title: "Traditional Carving", imgSrc: "/images/DSC_1156.jpg" },
            { title: "Weaving Art", imgSrc: "/images/DSC_1239.jpg" },
            { title: "Ceremonial Drums", imgSrc: "/images/DSC_1241.jpg" }
          ].map((art, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden hover:shadow-2xl transform transition-all duration-300 hover:scale-105"
            >
              <img
                src={art.imgSrc}
                alt={art.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-yellow-400">
                  {art.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Art Gallery */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-yellow-400 to-black">
        <h2 className="text-5xl font-semibold mb-12 text-white">
          Niger Delta Art Gallery
        </h2>
        <div className="overflow-hidden">
          <div className="flex justify-center gap-6 flex-wrap">
            {[
              "/images/DSC_1252.jpg",
              "/images/DSC_1253.jpg",
              "/images/DSC_1883-1-scaled.jpg",
              "/images/DSC_1874-1-scaled.jpg"
            ].map((src, index) => (
              <div
                key={index}
                className="relative group transition-all duration-300 transform hover:scale-105"
              >
                <img
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  className="w-64 h-64 object-cover rounded-lg shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:z-10"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Significance */}
      <section className="py-20 px-6 text-center bg-black/60">
        <h2 className="text-5xl font-semibold mb-8 text-yellow-400">
          Cultural Significance of Niger Delta Arts
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Niger Delta arts represent spiritual, historical, and social aspects, with masks, carvings, and beadwork telling unique stories of the region.
        </p>
      </section>

      {/* Additional Content */}
      <section>
        <ArtGuys />
      </section>
    </div>
  );
}
