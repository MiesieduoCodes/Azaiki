"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const headerRef = useRef(null);
  const sectionRefs = useRef([]);
  const artistRefs = useRef([]);

  useEffect(() => {
    // Header animation
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top center",
      },
    });

    // Section animations
    sectionRefs.current.forEach((section, index) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Artist card animations
    artistRefs.current.forEach((el, index) => {
      gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <header
        ref={headerRef}
        className="bg-gradient-to-r from-yellow-400 to-yellow-300 dark:from-yellow-600 dark:to-yellow-500 h-96 flex flex-col items-center justify-center text-center"
      >
        <h1 className="text-5xl font-bold">Contemporary Art</h1>
        <p className="mt-4 text-lg">Exploring the dynamic world of modern art</p>
      </header>

      {/* Introduction Section */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="py-16 px-6 text-center bg-yellow-100 dark:bg-gray-800"
      >
        <h2 className="text-4xl font-semibold mb-6">What is Contemporary Art?</h2>
        <p className="text-xl max-w-3xl mx-auto">
          Contemporary art reflects the complex and fast-paced world we live in
          today. It challenges traditional boundaries, embraces new media, and
          engages with pressing global issues.
        </p>
      </section>

      {/* Featured Artists Section */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="py-16 bg-yellow-300 dark:bg-gray-700"
      >
        <h2 className="text-4xl font-bold text-center mb-12">Meet Our Featured Artists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              ref={(el) => (artistRefs.current[index] = el)}
              className="group bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={`https://via.placeholder.com/400x300`}
                  alt={`Artist ${index + 1}`}
                  className="w-full h-60 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold group-hover:text-yellow-500 transition-colors duration-300">
                  Artist {index + 1}
                </h3>
                <p className="mt-2">Discover the unique style of Artist {index + 1}.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="py-16 bg-yellow-500 dark:bg-gray-600"
      >
        <h2 className="text-4xl font-semibold text-center mb-12">Art Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={`https://via.placeholder.com/400x300`}
                alt={`Art ${index + 1}`}
                className="w-full h-56 object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
