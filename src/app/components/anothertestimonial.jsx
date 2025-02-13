import { useEffect, useState } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

export default function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState([
    {
      name: "Jane D",
      role: "Artist",
      testimonial: "Azaiki Art Gallery helped me organize my portfolio and track my art projects. It's a game-changer for managing my creative work.",
      rating: 4.9,
      avatar: "https://pagedone.io/asset/uploads/1696229969.png"
    },
    {
      name: "John R",
      role: "Gallery Owner",
      testimonial: "Using Azaiki Art Gallery has made it easier for me to discover emerging artists. It simplifies everything, from browsing to purchasing.",
      rating: 5.0,
      avatar: "https://example.com/john-avatar.jpg"
    },
    {
      name: "Sarah T",
      role: "Art Curator",
      testimonial: "As an art curator, staying on top of exhibitions and artists has never been easier. Azaiki Art Gallery has transformed my workflow.",
      rating: 4.8,
      avatar: "https://example.com/sarah-avatar.jpg"
    },
    {
      name: "Emily P",
      role: "Art Enthusiast",
      testimonial: "I use Azaiki Art Gallery to keep track of my favorite artists and their work. It's an excellent platform for art lovers like me.",
      rating: 4.7,
      avatar: "https://example.com/emily-avatar.jpg"
    },
    {
      name: "Kwame Nkrumah",
      role: "African Art Collector",
      testimonial: "Azaiki Art Gallery has allowed me to connect with African artists globally, expanding my collection with pieces that celebrate the rich history and culture of the continent.",
      rating: 5.0,
      avatar: "https://example.com/kwame-avatar.jpg"
    },
    {
      name: "Chinonso O",
      role: "Contemporary African Artist",
      testimonial: "Azaiki Art Gallery is an invaluable tool for organizing my work and keeping track of exhibitions. It's a fantastic platform that supports African artists by providing visibility worldwide.",
      rating: 4.9,
      avatar: "https://example.com/chinonso-avatar.jpg"
    },
    {
      name: "Adama F",
      role: "Art Curator",
      testimonial: "As a curator focused on African art, Azaiki Art Gallery has streamlined my ability to discover and curate exhibitions from emerging African artists.",
      rating: 4.8,
      avatar: "https://example.com/adama-avatar.jpg"
    },
    {
      name: "Zanele M",
      role: "Art Enthusiast",
      testimonial: "Azaiki Art Gallery helped me explore the diverse world of African art. I love how it connects me with new artists and allows me to stay up to date on their work.",
      rating: 4.7,
      avatar: "https://example.com/zanele-avatar.jpg"
    }
  ]);

  useEffect(() => {
    // Initialize Swiper when component mounts
    new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 32,
      loop: true,
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 32,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      },
    });
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-black  ">
      <div className="mx-auto max-w-7xl px-4  sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-sm text-gray-400 dark:text-white font-medium text-center block mb-2">TESTIMONIAL</span>
          <h2 className="text-4xl text-center font-bold text-black dark:text-yellow-500">What our happy users say!</h2>
        </div>

        {/* Slider Wrapper */}
        <div className="swiper mySwiper">
          <div className="swiper-wrapper w-max">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="swiper-slide">
                <div className="group bg-white dark:bg-black border border-solid border-gray-300 dark:border-gray-700 rounded-xl p-6 transition-all duration-500 w-full mx-auto hover:border-indigo-600 hover:shadow-sm">
                  <div className="">
                    <div className="flex items-center mb-7 gap-2 text-amber-500 transition-all duration-500">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="text-base font-semibold text-indigo-600">{testimonial.rating}</span>
                    </div>
                    <p className="text-base text-gray-600 dark:text-yellow-300 leading-6 pb-8 group-hover:text-gray-800 slide_active:text-gray-800">
                      {testimonial.testimonial}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 border-t border-solid border-gray-200 dark:border-gray-700 pt-5">
                    <img
                      className="rounded-full h-10 w-10 object-cover"
                      src={testimonial.avatar}
                      alt="avatar"
                    />
                    <div className="block">
                      <h5 className="text-gray-900 dark:text-gray-100 font-medium mb-1">{testimonial.name}</h5>
                      <span className="text-sm leading-4 text-gray-500 dark:text-gray-400">{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
}
