"use client";
import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ref, onValue } from 'firebase/database';
import { database } from '@/app/firebase';
import Testimonials from '@/app/components/testimonials';

export default function GeneralArts() {
  const [artSections, setArtSections] = useState([]);

  // Fetch art sections from Firebase Realtime Database
  useEffect(() => {
    const artRef = ref(database, 'generalarts');
    onValue(artRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object to array if necessary
        const sectionsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setArtSections(sectionsArray);
      } else {
        setArtSections([]);
      }
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // GSAP Animations
      gsap.from('.section-title', {
        opacity: 0,
        y: -30,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power3.out',
      });

      gsap.from('.art-item', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.art-item',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.artist-spotlight-item', {
        opacity: 0,
        y: 50,
        stagger: 0.4,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.artist-spotlight-item',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.featured-artwork-item', {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 3,
        ease: 'power3.in',
        scrollTrigger: {
          trigger: '.featured-artwork-item',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.review-item', {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.review-item',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.cta-button', {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta-button',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.newsletter-form', {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.newsletter-form',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 pt-28 text-lg text-black dark:text-gray-300 transition-colors duration-300">
      {/* Header */}
      <header className="py-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">General Arts</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Exploring the rich diversity of global art forms. Discover the stories behind the masterpieces and the artists who create them.
        </p>
      </header>

      {/* Map through artSections data */}
      {artSections.map((section) => (
        <section key={section.id} className={`py-16 px-6 text-center ${section.background}`}>
          <h2 className="section-title text-4xl font-semibold mb-6 text-gray-900 dark:text-white">
            {section.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            {section.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {section.items?.map((item, index) => (
              <div
                key={index}
                className="art-item bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img src={item.image} alt={item.title} className="w-full h-56 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Artist Spotlight Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800 text-center">
        <h2 className="section-title text-4xl font-semibold mb-6 text-gray-900 dark:text-white">Artist Spotlight</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Meet the talented artists behind the masterpieces. Learn about their journey, inspiration, and contributions to the art world.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="artist-spotlight-item bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden w-full md:w-[30%]">
            <img
              src="https://via.placeholder.com/400x300?text=Artist+Image"
              alt="Artist Name"
              className="w-full h-auto object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Artist Name</h3>
              <p className="text-gray-600 dark:text-gray-300">
                A brief description of the artist, their style, and contributions to the art world. This artist is known for their unique approach to blending traditional and modern techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-6 bg-gray-200 dark:bg-gray-800 text-center">
        <h2 className="section-title text-4xl font-semibold mb-6 text-gray-900 dark:text-white">What People Are Saying</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Hear from our visitors and art enthusiasts about their experiences with our collection and exhibitions.
        </p>
        <div className="space-y-8">
          <Testimonials />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900 text-center">
        <h2 className="section-title text-4xl font-semibold mb-6 text-gray-900 dark:text-white">Join the Art Movement</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Be part of our vibrant community. Attend workshops, exhibitions, and events to immerse yourself in the world of art.
        </p>
        <button className="cta-button bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-300">
          Explore Events
        </button>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="py-16 px-6 bg-gray-100 dark:bg-gray-800 text-center">
        <h2 className="section-title text-4xl font-semibold mb-6 text-gray-900 dark:text-white">Stay Updated</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Subscribe to our newsletter for the latest updates on exhibitions, events, and new additions to our collection.
        </p>
        <div className="newsletter-form flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-64 px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-r-lg hover:bg-yellow-600 transition-colors duration-300">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}
