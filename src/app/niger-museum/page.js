'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { PaintBrushIcon, BuildingLibraryIcon, LinkIcon } from "@heroicons/react/20/solid";
import AnotherTestimonial from "@/app/components/anothertestimonial";

const contentData = {
  title: "Explore the Niger Delta Arts Museum",
  subtitle: "Celebrating the Rich Culture and Artistry of the Niger Delta",
  description:
    "The Niger Delta Arts Museum is a hub of cultural preservation and artistic innovation. Featuring traditional crafts, modern interpretations, and the works of local and international artists, it showcases the dynamic artistic heritage of the Niger Delta region.",
  features: [
    {
      icon: PaintBrushIcon,
      title: "Exquisite Traditional Arts",
      description:
        "Discover unique traditional art forms, including wood carvings, textiles, and ceremonial masks that represent the deep cultural history of the Niger Delta.",
    },
    {
      icon: BuildingLibraryIcon,
      title: "Cultural Legacy",
      description:
        "Each piece in the museum holds significance, preserving the traditions and history of the diverse communities within the Niger Delta, from the Ijaw to the Urhobo.",
    },
    {
      icon: LinkIcon,
      title: "Azaiki Art Gallery Collaboration",
      description:
        "The Azaiki Art Gallery and Museum collaborates with the Niger Delta Arts Museum to showcase the region’s heritage and promote its artists globally, ensuring that the Niger Delta’s rich artistic expressions are recognized worldwide.",
    },
    {
      icon: LinkIcon,
      title: "Educational Programs",
      description:
        "The museum offebrs interactive workshops and educational programs for schools and visitors to learn about the artistic techniques and cultural history of the Niger Delta.",
    },
    {
      icon: LinkIcon,
      title: "Community Engagement",
      description:
        "Through various community outreach programs, the museum fosters a deeper connection between local artists and the public, encouraging creative expression and cultural exchange.",
    }
  ],
  images: [
    {
      src: "/images/DSC_1876-1-scaled.jpg",
      alt: "Traditional Niger Delta art display",
    },
    {
      src: "/images/DSC_1874-1-scaled.jpg",
      alt: "Visitors admiring Niger Delta sculptures",
    },
    {
      src: "/images/DSC_1251.jpg",
      alt: "Artists working on a collaborative mural",
    },
  ],
};

export default function NigerDeltaArtsMuseum() {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      imageRefs.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out", stagger: 0.3 }
    );
    gsap.fromTo(
      textRefs.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out", stagger: 0.2 }
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative isolate px-6 lg:px-8 transition-colors duration-500 bg-white dark:bg-black text-gray-700 dark:text-white"
    >
      
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
        <h1 className="text-5xl font-semibold tracking-tight">{contentData.title}</h1>
        <p className="mt-8 text-lg font-medium">{contentData.description}</p>
      </div>
      
      {/* Content Section */}
      <div 
        ref={sectionRef} 
        className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-0 transition-colors duration-500">
          
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-yellow-100 to-yellow-300 dark:from-yellow-700 dark:to-yellow-900 opacity-50" />

        <div className="flex flex-col items-center text-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg font-semibold">{contentData.subtitle}</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{contentData.title}</h1>
          <p className="mt-6 text-lg">{contentData.description}</p>
        </div>

        {/* Images & Features */}
        <div className="mt-12 grid grid-cols-1 gap-10 p-6 lg:grid-cols-2 lg:gap-x-8">
          {contentData.images.map((image, index) => (
            <div key={index} className="flex justify-center">
              <img 
                ref={(el) => imageRefs.current.push(el)} 
                src={image.src} 
                alt={image.alt} 
                className="w-[48rem] max-w-full rounded-xl shadow-lg ring-1 ring-yellow-500"
              />
            </div>
          ))}
          <div className="max-w-lg mx-auto text-center">
            {contentData.features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center gap-3 mt-6" ref={(el) => textRefs.current.push(el)}>
                <feature.icon className="h-10 w-10 text-yellow-500" />
                <div>
                  <h3 className="font-semibold text-xl">{feature.title}</h3>
                  <p className="text-lg">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <AnotherTestimonial />
    </motion.div>
  );
}
