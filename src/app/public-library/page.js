"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const HeroSection = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.from('.hero-title', { opacity: 0, y: -30, duration: 1 })
      .from('.hero-description', { opacity: 0, y: 30, duration: 1 }, '<');
  }, []);

  return (
    <div
      className="hero min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: "url(/images/IMG-20250211-WA0146.jpg)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className="hero-overlay bg-black bg-opacity-90"></div>
      <div className="hero-content text-neutral-content text-center relative z-10">
        <div className="max-w-md">
          <motion.h1 className="mb-5 text-5xl text-black font-bold hero-title">
            Azaiki Public Library
          </motion.h1>
          <motion.p className="mb-5 hero-description">
            Azaiki Public Library serves as a beacon of knowledge and culture in our community. 
            With a vast collection of books, digital resources, and community programs, 
            it fosters a love for reading and lifelong learning for all ages.
          </motion.p>
          <a href="#" className="font-semibold dark:text-yellow-500">
            <button className="btn ">
              <h2 className="dark:text-yellow-500">
              Fast Travel to Azaiki Library</h2>
            </button>
          </a>
        </div>
      </div>

      <style jsx>{`
        .btn {
          font-size: 17px;
          background: transparent;
          padding: 1em 1.5em;
          color: #ffedd3;
          text-transform: uppercase;
          position: relative;
          transition: 0.5s ease;
          cursor: pointer;
        }
        .btn::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 0;
          background-color: #ffc506;
          transition: 0.5s ease;
        }
        .btn:hover {
          color: #1e1e2b;
          transition-delay: 0.5s;
        }
        .btn:hover::before {
          width: 100%;
        }
        .btn::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 0;
          width: 100%;
          background-color: #ffc506;
          transition: 0.4s ease;
          z-index: -1;
        }
        .btn:hover::after {
          height: 100%;
          transition-delay: 0.4s;
          color: aliceblue;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;