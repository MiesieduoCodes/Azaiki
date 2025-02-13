'use client';
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { PaintBrushIcon, BuildingLibraryIcon, LinkIcon } from "@heroicons/react/20/solid";
import AnotherTestimonial from "@/app/components/anothertestimonial";

const contentData = {
  title: "Exploring the Essence of African Art",
  subtitle: "A Journey Through Heritage, Creativity, and Cultural Legacy",
  description:
    "African art museums serve as guardians of the continent’s rich artistic traditions, showcasing the evolution of creativity from ancient civilizations to contemporary expression. These spaces celebrate the diverse cultures, histories, and artistic innovations of Africa, ensuring they remain preserved and appreciated worldwide.",
  features: [
    {
      icon: PaintBrushIcon,
      title: "Exquisite Collections",
      description:
        "Experience a stunning array of African artistry, including intricately carved masks, symbolic textiles, breathtaking sculptures, and dynamic paintings that reflect centuries of cultural storytelling.",
    },
    {
      icon: BuildingLibraryIcon,
      title: "Cultural Significance",
      description:
        "Each piece carries deep historical and spiritual meanings, offering insights into the traditions, beliefs, and identity of African societies, past and present.",
    },
    {
      icon: LinkIcon,
      title: "Azaiki Art Gallery & Museum Connection",
      description:
        "The Azaiki Art Gallery and Museum plays a vital role in preserving and promoting African art by collaborating with leading art institutions. Through exhibitions, research, and cultural programs, it strengthens the global appreciation of African artistic heritage.",
    }
  ],
  images: [
    {
      src: "/images/IMG-20250207-WA0020.jpg",
      alt: "Traditional African art display",
    },
    {
      src: "/images/IMG-20250207-WA0025.jpg",
      alt: "Visitors admiring African sculptures",
    },
    {
      src: "https://images.pexels.com/photos/28377076/pexels-photo-28377076/free-photo-of-a-statue-of-a-woman-in-a-museum.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Beautiful African painting exhibition",
    },
  ],
};

export default function AfricanArtMuseum() {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);
  const [darkMode, setDarkMode] = useState(false);

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
    <div className="relative isolate px-6 bg-white dark:bg-black lg:px-8 transition-colors duration-500 ">

      {/* Hero Section */}
      <div className="mx-auto max-w-2xl py-32 text-black dark:text-white sm:py-48 lg:py-56 text-center">
        <h1 className="text-5xl font-extrabold dark:bg-black tracking-tight sm:text-7xl">
          Discover the Rich Heritage of African Art
        </h1>
        <p className="mt-8 text-lg font-medium sm:text-xl">
          Explore a stunning collection of traditional and contemporary African artworks, showcasing vibrant cultures and histories.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a href="#" className="rounded-md bg-yellow-500 px-4 py-2.5 text-sm font-semibold text-black shadow-md hover:bg-yellow-600">
            Explore Now
          </a>
          <a href="#" className="text-sm font-semibold">Learn More →</a>
        </div>
      </div>
      
      {/* Content Section */}
      <div 
        ref={sectionRef} 
        className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-0 transition-colors duration-500 rounded-xl">
          
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
    </div>
  );
}
