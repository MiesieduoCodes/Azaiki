'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function LetterFromPresident() {
  useEffect(() => {
    // Text entrance animations
    gsap.fromTo(
      '.letter-heading',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.letter-heading',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      '.letter-content p',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: '.letter-content',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-500">
      <div className="relative isolate px-6 pt-20 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          {/* Heading with animation */}
          <h1 className="letter-heading text-5xl font-semibold tracking-tight text-yellow-600 dark:text-yellow-400">
            A Letter from the President
          </h1>

          {/* Content with animation */}
          <div className="letter-content mt-12">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Dear Members and Friends,
            </p>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              As we continue to celebrate the rich culture and artistry of our continent, it is essential to recognize the importance of cultural preservation. Our museum stands as a testament to the vibrant history and artistic expressions that define the African experience.
            </p>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              This year, we are proud to announce the launch of several new initiatives aimed at promoting African art and culture. From educational programs for young artists to international collaborations, we are committed to fostering a global appreciation for our heritage.
            </p>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              We invite you to explore our latest exhibitions, which showcase the works of both traditional and contemporary artists from the Niger Delta region. These exhibitions highlight the unique stories and creative talents that continue to shape our cultural landscape.
            </p>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              Your support has been instrumental in our journey. Together, we can ensure that the legacy of African art and culture is preserved and celebrated for generations to come.
            </p>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              Thank you for your continued dedication and passion.
            </p>
            <p className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
              Sincerely,<br />
              The President<br />
              African Museum Association
            </p>
          </div>
        </div>
      </div>
    </div>
  );
          }
