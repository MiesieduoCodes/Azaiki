"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  useEffect(() => {
    // Entrance animation for each section
    gsap.fromTo(
      ".footer-section",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".footer-section",
          start: "top 80%",
          toggleActions: "play none none none", // Only play the animation once
        },
      }
    );
  }, []);

  return (
    <footer className="w-full bg-white dark:bg-black transition-colors duration-500 font-montserrat">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-10 lg:py-12">
          {/* About Section */}
          <div className="footer-section">
            <h2 className="mb-6 text-sm font-semibold text-blue-600 dark:text-yellow-400 uppercase tracking-wide">
              About Azaiki Art Gallery
            </h2>
            <ul className="text-gray-700 dark:text-white font-medium space-y-3">
              <li>
                <a href="/about" className="hover:text-blue-600 dark:hover:text-yellow-400 transition">
                  Our Story
                </a>
              </li>
              <li>
                <a href="/gallery" className="hover:text-blue-600 dark:hover:text-yellow-400 transition">
                  Exhibitions
                </a>
              </li>
              <li>
                <a href="/gallery" className="hover:text-blue-600 dark:hover:text-yellow-400 transition">
                  Museum Collections
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-600 dark:hover:text-yellow-400 transition">
                  Visit Us
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="footer-section">
            <h2 className="mb-6 text-sm font-semibold text-blue-600 dark:text-yellow-400 uppercase tracking-wide">
              Connect with Us
            </h2>
            <ul className="text-gray-700 dark:text-white font-medium space-y-3">
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-yellow-400 transition">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-yellow-400 transition">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-yellow-400 transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-600 dark:hover:text-yellow-400 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="footer-section">
            <h2 className="mb-6 text-sm font-semibold text-blue-600 dark:text-yellow-400 uppercase tracking-wide">
              Legal
            </h2>
            <ul className="text-gray-700 dark:text-white font-medium space-y-3">
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-yellow-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-yellow-400 transition">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-yellow-400 transition">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="footer-section">
            <h2 className="mb-6 text-sm font-semibold text-blue-600 dark:text-yellow-400 uppercase tracking-wide">
              Stay Updated
            </h2>
            <p className="text-gray-700 dark:text-white font-medium mb-4">
              Subscribe to our newsletter for the latest exhibitions, events, and more.
            </p>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-yellow-400 transition"
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 dark:bg-yellow-400 text-white dark:text-black rounded-lg hover:bg-blue-700 dark:hover:bg-white dark:hover:text-black transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-6 text-center text-gray-700 dark:text-white text-sm transition">
          <p>&copy; 2025 Azaiki Art Gallery & Museum. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
