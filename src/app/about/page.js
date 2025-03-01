"use client";
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import Testimonials from "@/app/components/testimonials"; 

const AzaikiArtGallery = () => {
  useEffect(() => {
    gsap.fromTo(
      '.hero-text',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2 }
    );

    gsap.fromTo(
      '.about-content',
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    );

    gsap.fromTo(
      '.gallery-image',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', stagger: 0.3, delay: 0.8 }
    );

    gsap.fromTo(
      '.testimonial',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.2 }
    );

    gsap.fromTo(
      '.event',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.2 }
    );

    gsap.fromTo(
      '.video-card',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.2, delay: 0.5 }
    );
  }, []);

  const galleryItems = [
    {
      image: 'https://momaa.org/wp-content/uploads/2023/04/benin.jpeg',
      title: 'Timeless Sculpture',
      description: 'A beautifully crafted sculpture representing the essence of cultural heritage.'
    },
    {
      image: 'https://www.tingatingaart.com/cdn/shop/articles/OIG_bf9cae34-bfde-41ff-a9b5-4f395dd9c1e9_2048x.jpg?v=1701274052',
      title: 'Abstract Painting',
      description: 'An abstract masterpiece that evokes emotion and inspires creativity.'
    },
    {
      image: 'https://www.historicalafrica.org/wp-content/uploads/2022/06/African.jpg',
      title: 'Historic Artifact',
      description: 'A rare artifact that tells the story of our rich and diverse history.'
    },
    {
      image: 'https://momaa.org/wp-content/uploads/2019/09/Syzygy-2015-by-Lina-Iris-Viktor.jpg',
      title: 'Modern Art Installation',
      description: 'A contemporary installation that blends innovation with tradition.'
    }
  ];

  const videoItems = [
    { videoUrl: "https://videos.pexels.com/video-files/4067804/4067804-uhd_2732_1440_25fps.mp4", title: "Artist Spotlight" },
    { videoUrl: "https://videos.pexels.com/video-files/5764706/5764706-uhd_2560_1440_30fps.mp4", title: "Gallery Tour" },
  ];

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-20 pt-44 px-6 text-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://videos.pexels.com/video-files/5764706/5764706-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="relative z-20 max-w-screen-xl mx-auto">
          <h1 className="hero-text text-5xl font-extrabold leading-tight mb-4">
            Welcome to the Azaiki Art Gallery and Museum
          </h1>
          <p className="hero-text text-lg mb-6">
            A celebration of culture, history, and artistic brilliance. Explore
            our curated collections that connect the past with the present.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 px-6 bg-black">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-yellow-500 mb-6">
            Watch and Learn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {videoItems.map((item, index) => (
              <div key={index} className="video-card rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-64 object-cover rounded-lg"
                >
                  <source src={item.videoUrl} type="video/mp4" />
                </video>
                <h3 className="text-xl font-bold text-yellow-500 mt-4">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-white dark:bg-black">
        <div className="max-w-screen-md mx-auto text-center">
          <h2 className="about-content text-4xl font-extrabold text-yellow-500 mb-6">
            About Us
          </h2>
          <p className="about-content text-lg text-black dark:text-white mb-4">
            The Azaiki Art Gallery and Museum is a sanctuary for art enthusiasts and cultural explorers. Located in the heart of artistic expression, our gallery showcases a diverse array of artwork, from traditional masterpieces to contemporary creations.
          </p>
          <p className="about-content text-lg text-black dark:text-white">
            Our mission is to preserve and promote the rich cultural heritage of our community while inspiring future generations.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-6 bg-black">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center text-yellow-500 mb-12">
            Explore Our Collections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {galleryItems.map((item, index) => (
              <div key={index} className="gallery-item bg-white rounded-lg shadow-lg overflow-hidden dark:bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-black dark:text-yellow-500">
                    {item.title}
                  </h3>
                  <p className="text-black dark:text-white mt-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-white dark:bg-black">
        <div className="max-w-screen-md mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-yellow-500 mb-6">
            What Our Visitors Say
          </h2>
          <div className="space-y-8">
           <Testimonials/>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 px-6 bg-black">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-yellow-500 mb-12">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
            {[
              {
                title: "Art Workshop",
                date: "March 15, 2025",
                description: "Join us for a hands-on workshop where you can create your own masterpiece.",
              },
              {
                title: "Gallery Talk with Artists",
                date: "April 10, 2025",
                description: "Meet the artists behind our latest exhibition and learn about their creative process.",
              },
              {
                title: "Children's Art Day",
                date: "May 5, 2025",
                description: "A fun-filled day for children to explore art through interactive activities.",
              },
            ].map((event, index) => (
              <div
                key={index}
                className="event bg-white rounded-lg shadow-md p-6 dark:bg-black transition-transform transform hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-black dark:text-yellow-500 mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{event.date}</p>
                <p className="text-black dark:text-white">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AzaikiArtGallery;