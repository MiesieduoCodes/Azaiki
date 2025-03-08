"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ref, onValue } from 'firebase/database';
import { database } from '@/app/firebase';
import Testimonials from '@/app/components/testimonials';

gsap.registerPlugin(ScrollTrigger);

export default function GeneralArts() {
  const [artSections, setArtSections] = useState([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  // Firebase data fetch
  useEffect(() => {
    const artRef = ref(database, 'generalarts');
    onValue(artRef, (snapshot) => {
      const data = snapshot.val();
      const sectionsArray = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })) : [];
      setArtSections(sectionsArray);
    });
  }, []);

  // Animation setup
  useEffect(() => {
    gsap.utils.toArray('.animate-block').forEach((block, i) => {
      gsap.from(block, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 pt-28 text-black dark:text-gray-300">
      {/* Hero Header */}
      <motion.header 
        className="py-16 px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          General Arts
        </h1>
        <motion.p
          className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Exploring the rich diversity of global art forms through contemporary and historical perspectives.
        </motion.p>
      </motion.header>

      {/* Art Sections */}
      {artSections.map((section) => (
        <section 
          key={section.id}
          className="py-16 px-4 sm:px-6 lg:px-8"
          ref={sectionRef}
        >
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              {section.title}
            </motion.h2>
            
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 text-center"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
            >
              {section.description}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.items?.map((item, index) => (
                <motion.div
                  key={index}
                  className="animate-block group relative overflow-hidden rounded-xl shadow-lg dark:shadow-gray-800/20 bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      ))}

      {/* Artist Spotlight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Featured Artists
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                className="animate-block group relative bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="https://source.unsplash.com/random/800x600?artist"
                    alt="Artist"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Featured Artist</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Contemporary artist specializing in mixed media installations that explore cultural identity.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Visitor Experiences
          </motion.h2>
          <Testimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Join Our Creative Community
          </motion.h2>
          <motion.button
            className="cta-button bg-white text-yellow-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Events & Workshops
          </motion.button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Stay Updated
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Receive exclusive updates about new exhibitions and special events
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-96 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700"
              />
              <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}