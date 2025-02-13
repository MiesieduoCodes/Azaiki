"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import OurTeam from "@/app/components/teams";
import { motion } from "framer-motion";
import HomeSlidingCarousel from "@/app/components/homeslider";
import HeroSlider from "@/app/components/hero";
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
      <HeroSlider />

      {/* Art & Culture News Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8">
        {[
          {
            image: "https://plus.unsplash.com/premium_photo-1715457841520-6079d7d9459a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Explore Digital Art",
            description:
              "Immerse yourself in the world of digital art, featuring captivating visuals from talented creators.",
          },
          {
            image: "https://images.pexels.com/photos/2130137/pexels-photo-2130137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Upcoming Art Exhibitions",
            description:
              "Discover upcoming exhibitions and events showcasing the best in contemporary art.",
          },
          {
            image: "https://images.pexels.com/photos/3205574/pexels-photo-3205574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Join Artistic Communities",
            description:
              "Connect with fellow artists and art enthusiasts to collaborate, share ideas, and create together.",
          },
        ].map((section, index) => (
          <motion.div
            key={index}
            className="relative group overflow-hidden rounded-2xl shadow-xl bg-cover bg-center h-96 transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            style={{ backgroundImage: `url(${section.image})` }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.3 }}
          >
            <div className="absolute inset-0 bg-black/70 dark:bg-black/50 group-hover:bg-opacity-50 transition duration-500 flex flex-col justify-end p-8">
              <h2 className="text-3xl font-bold text-yellow-400">
                {section.title}
              </h2>
              <p className="text-white text-lg mt-2">{section.description}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Quote Section */}
      <section className="px-8 text-center">
        <motion.div
          className="p-10 rounded-xl shadow-lg bg-yellow-400 text-black dark:bg-black dark:text-yellow-400 transition-colors duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-5xl font-extrabold">
            &quot;Believe you can and you&apos;re halfway there.&quot;
          </p>
          <p className="text-xl font-semibold mt-2">- Theodore Roosevelt</p>
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
    
