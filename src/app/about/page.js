"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Testimonials from "@/app/components/testimonials";

gsap.registerPlugin(ScrollTrigger);

const AzaikiArtGallery = () => {
  const heroVideoRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Hero section parallax effect
    gsap.to(heroVideoRef.current, {
      scrollTrigger: {
        trigger: heroVideoRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      scale: 1.2,
      yPercent: 20
    });

    // Section animations
    gsap.utils.toArray('.animate-section').forEach((section, index) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Gallery animations
    gsap.from('.gallery-item', {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 1,
      scrollTrigger: {
        trigger: '.gallery-section',
        start: 'top 70%'
      }
    });
  }, []);

  const galleryItems = [
    {
      image: 'https://momaa.org/wp-content/uploads/2023/04/benin.jpeg',
      title: 'Timeless Sculpture',
      description: 'A beautifully crafted sculpture representing cultural heritage'
    },
    {
      image: 'https://www.tingatingaart.com/cdn/shop/articles/OIG_bf9cae34-bfde-41ff-a9b5-4f395dd9c1e9_2048x.jpg?v=1701274052',
      title: 'Abstract Painting',
      description: 'Evocative abstract masterpiece inspiring creativity'
    },
    {
      image: 'https://www.historicalafrica.org/wp-content/uploads/2022/06/African.jpg',
      title: 'Historic Artifact',
      description: 'Rare artifact telling our diverse history'
    },
    {
      image: 'https://momaa.org/wp-content/uploads/2019/09/Syzygy-2015-by-Lina-Iris-Viktor.jpg',
      title: 'Modern Installation',
      description: 'Contemporary blend of innovation and tradition'
    }
  ];

  const videoItems = [
    { 
      videoUrl: "https://videos.pexels.com/video-files/4067804/4067804-uhd_2732_1440_25fps.mp4", 
      title: "Artist Spotlight" 
    },
    { 
      videoUrl: "https://videos.pexels.com/video-files/5764706/5764706-uhd_2560_1440_30fps.mp4", 
      title: "Gallery Tour" 
    },
  ];

  return (
    <div className="bg-white dark:bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" ref={heroVideoRef}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/AQOc55bueLXv2tnvImmRPNToeyGrIzv61GIV1efiPTIBtac9iCm32WroV6N3UHuaDtvb9w1esufMXgRfMX3BYagY.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50 dark:bg-black/70 transition-colors duration-500" />
        </div>

        <motion.div 
          className="relative z-10 text-center px-4 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to Azaiki Art Gallery
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Where cultural heritage meets contemporary artistic expression
          </p>
        </motion.div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black animate-section">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-yellow-500 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          >
            Featured Videos
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {videoItems.map((item, index) => (
              <motion.div 
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-xl aspect-video"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={item.videoUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:bg-black/60">
                  <h3 className="text-2xl font-bold text-yellow-500">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black gallery-section animate-section">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-yellow-500 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured Collections
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((item, index) => (
              <motion.div 
                key={index}
                className="gallery-item group relative overflow-hidden rounded-xl shadow-lg dark:shadow-gray-800/20"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-gray-200 mt-2 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900 animate-section">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-yellow-500 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Visitor Experiences
          </motion.h2>
          <Testimonials />
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black animate-section">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-yellow-500 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Upcoming Events
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Art Workshop",
                date: "March 15, 2025",
                description: "Create your own masterpiece in our hands-on workshop"
              },
              {
                title: "Artist Talks",
                date: "April 10, 2025",
                description: "Meet creators behind our latest exhibition"
              },
              {
                title: "Children's Art Day",
                date: "May 5, 2025",
                description: "Interactive art activities for young creators"
              },
            ].map((event, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-black dark:text-yellow-400 mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{event.date}</p>
                <p className="text-gray-700 dark:text-gray-200">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AzaikiArtGallery;