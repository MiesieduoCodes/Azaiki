"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import OurTeam from "@/app/components/teams";
import { motion } from "framer-motion";
import HomeSlidingCarousel from "@/app/components/homeslider";
import { SmoothScrollHero } from "@/app/components/hero";
import Testify from "@/app/components/testimonials";

const Page = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      sectionsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div className="space-y-20 bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <SmoothScrollHero/>


      {/* Quote Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 text-center">
  <motion.div
    className="p-6 md:p-10 rounded-2xl shadow-2xl 
              bg-yellow-400/90 dark:bg-gray-900 
              text-black dark:text-yellow-300 
              border-4 border-transparent dark:border-yellow-400/20
              transition-all duration-500 
              hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/30
              backdrop-blur-sm"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.02 }}
    transition={{ 
      duration: 0.8,
      scale: { type: 'spring', stiffness: 300 }
    }}
  >
    <blockquote>
      <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight 
                   [text-shadow:_0_2px_4px_rgba(0,0,0,0.1)] 
                   dark:[text-shadow:_0_2px_4px_rgba(255,255,255,0.1)]">
        &quot;Believe you can and you&apos;re halfway there.&quot;
      </p>
      <footer className="mt-4 md:mt-6 text-lg md:text-xl font-semibold 
                        text-black/80 dark:text-yellow-300/90">
        - Theodore Roosevelt
      </footer>
    </blockquote>
  </motion.div>
</section>

      {/* Our Team */}
      <OurTeam />

      {/* Home Sliding Carousel */}
      <HomeSlidingCarousel />

      {/* Second Quote Section */}
      <section className="px-8 text-center">
        <motion.div
          className="p-10 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-center bg-yellow-400 text-black dark:bg-black dark:text-yellow-400 transition-colors duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src="https://www.harristheaterchicago.org/sites/default/files/styles/2000x1200/public/2024-04/Twyla%20Tharp%20by%20Greg%20Gorman_ext.jpg.webp?itok=5aWumZUt"
            className="w-full max-w-xs md:max-w-md h-auto object-cover rounded-xl shadow-xl mb-4 md:mb-0 md:mr-6"
            whileHover={{
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.3 },
            }}
          />
          <div>
            <p className="text-5xl font-extrabold">
              &quot;Art is the only way to run away without leaving home.&quot;
            </p>
            <p className="text-xl font-semibold mt-2">- Twyla Tharp</p>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <Testify />
    </div>
  );
};

export default Page;
    
