import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ref, onValue } from "firebase/database";
import { database } from "@/app/firebase"; // Update the path accordingly
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const testimonialsRef = ref(database, 'testimonials');
    
    const unsubscribe = onValue(testimonialsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const testimonialsArray = Array.isArray(data) ? data : Object.values(data);
        setTestimonials(testimonialsArray);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-black py-16 font-sans">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <Swiper
          spaceBetween={40}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.figure 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="max-w-screen-md mx-auto text-center bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-90 backdrop-blur-lg p-8 rounded-3xl shadow-xl"
              >
                <svg
                  className="h-12 mx-auto mb-4 text-gray-500 dark:text-yellow-400"
                  viewBox="0 0 24 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote>
                  <p className="text-2xl font-semibold text-gray-800 dark:text-white leading-relaxed">
                    {testimonial.quote}
                  </p>
                </blockquote>
                <figcaption className="flex items-center justify-center mt-6 space-x-4">
                  <img
                    className="w-12 h-12 rounded-full border-2 border-blue-500 dark:border-yellow-400 shadow-md"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-lg font-bold text-black dark:text-yellow-400">{testimonial.name}</span>
                    <span className="text-sm font-light text-gray-600 dark:text-gray-400">{testimonial.role}</span>
                  </div>
                </figcaption>
              </motion.figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;