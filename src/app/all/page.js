"use client";
import { useEffect } from 'react';
import gsap from 'gsap';
import generalarts from '@/app/components/constants/generalarts.json';

const artSections = generalarts;

export default function GeneralArts() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
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
    }
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 pt-28 text-lg text-black dark:text-gray-300 transition-colors duration-300">
      {/* Header */}
      <header className="py-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">General Arts</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Exploring the rich diversity of global art forms</p>
      </header>

      {/* Map through artSections data */}
      {artSections.map((section) => (
        <section key={section.id} className={`py-16 px-6 text-center ${section.background}`}>
          <h2 className="section-title text-4xl font-semibold mb-6 text-gray-900 dark:text-white">{section.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {section.items.map((item, index) => (
              <div key={index} className="art-item bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
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
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="artist-spotlight-item bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden w-full md:w-[30%]">
            <img src="https://via.placeholder.com/400x300?text=Artist+Image" alt="Artist Name" className="w-full h-auto object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Artist Name</h3>
              <p className="text-gray-600 dark:text-gray-300">A brief description of the artist, their style, and contributions to the art world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artwork Section */}
      <section className="py-16 px-6 bg-gray-100 dark:bg-gray-900 text-center">
        <h2 className="section-title text-4xl font-semibold mb-6 text-gray-900 dark:text-white">Featured Artwork</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          {[{
            title: "Masterpiece One",
            image: "https://via.placeholder.com/400x300?text=Artwork+One",
            description: "Description of Masterpiece One, highlighting its significance and artistic elements.",
          },
          {
            title: "Masterpiece Two",
            image: "https://via.placeholder.com/400x300?text=Artwork+Two",
            description: "Description of Masterpiece Two, highlighting its significance and artistic elements.",
          },
          {
            title: "Masterpiece Three",
            image: "https://via.placeholder.com/400x300?text=Artwork+Three",
            description: "Description of Masterpiece Three, highlighting its significance and artistic elements.",
          }].map((artwork, index) => (
            <div key={index} className="featured-artwork-item bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
              <img src={artwork.image} alt={artwork.title} className="w-full h-auto object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{artwork.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{artwork.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-6 bg-gray-200 dark:bg-gray-800 text-center">
        <h2 className="section-title text-4xl font-semibold mb-6 text-gray-900 dark:text-white">What People Are Saying</h2>
        <div className="space-y-8">
          {[{
            name: "John Doe",
            review: "An incredible showcase of artistic talent! Each piece tells a unique story.",
          },
          {
            name: "Jane Smith",
            review: "A beautiful collection! I loved the diversity and richness of the art.",
          },
          {
            name: "Emily Johnson",
            review: "Absolutely stunning! The spotlight on artists is a great addition.",
          }].map((review, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
              <p className="font-semibold text-gray-900 dark:text-white">{review.name}</p>
              <p className="text-gray-600 dark:text-gray-300">{review.review}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}