"use client";

import { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css';

const Gallery = () => {
  useEffect(() => {
    const mySwiper = new Swiper('.gallery-top', {
      spaceBetween: 20,
      slidesPerView: 3,
      parallax: true,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 2000,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        1920: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1400: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        900: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        200: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
      },
    });
  }, []);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="pb-16">
          <h2 className="w-full text-center text-gray-900 text-4xl font-bold font-manrope leading-loose pb-2.5">
            Our Gallery
          </h2>
          <p className="w-full text-center text-gray-600 text-lg font-normal leading-8">
            Explore the essence of beauty in our gallery&apos;s intimate space.
          </p>
        </div>

        {/* Slider Wrapper */}
        <div className="mx-auto w-auto relative">
          <button className="top-[35%] swiper-button-prev w-11 h-11 p-3 xl:flex hidden shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] items-center justify-center border border-gray-300 rounded-lg group hover:bg-gray-900 transition-all duration-700 ease-in-out">
            <svg className="text-gray-900 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5002 14.9999L7.50005 9.99973L12.5032 4.99658" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="swiper-container gallery-top w-full md:w-[1028px] mx-auto xl:overflow-hidden pt-6">
            <div className="swiper-wrapper w-max mx-auto mb-5 flex gap-3">
              {[
                {
                  src: "https://pagedone.io/asset/uploads/1712568734.png",
                  title: "Golden&Sliver Metal Belt Watch",
                  description: "a chic and understated accessory for any occasion."
                },
                {
                  src: "https://pagedone.io/asset/uploads/1712569721.png",
                  title: "Golden Metal Belt Watch",
                  description: "a chic and understated accessory for any occasion."
                },
                {
                  src: "https://pagedone.io/asset/uploads/1712568744.png",
                  title: "Sliver Metal Belt Watch",
                  description: "a chic and understated accessory for any occasion."
                },
                // Add more items as needed
              ].map((item, index) => (
                <div className="swiper-slide max-w-[319px] grid" key={index}>
                  <img className="grow shrink basis-0 w-full rounded-xl object-cover" src={item.src} alt="Watch image" />
                  <div className="swiper-box mx-auto relative flex-col justify-center items-center gap-1 flex mt-5">
                    <h5 className="w-full text-center text-gray-900 text-xl font-medium leading-loose">{item.title}</h5>
                    <p className="w-full text-center text-gray-600 text-base font-normal leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="swiper-button-next top-[35%] xl:flex hidden shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] w-11 h-11 items-center justify-center border border-gray-300 rounded-lg group transition-all duration-700 ease-in-out hover:bg-gray-900">
            <svg className="text-gray-900 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.50301 4.99637L12.5032 9.99657L7.50006 14.9997" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .gallery-top .swiper-slide {
          height: fit-content;
          margin-right: 0px;
        }
        .gallery-top .swiper-slide-active {
          transform: scale(1.1);
        }
        .swiper-button-next, .swiper-button-prev {
          margin-top: 1px;
        }
        .swiper-horizontal > .swiper-pagination-bullets,
        .swiper-pagination-bullets.swiper-pagination-horizontal,
        .swiper-pagination-custom,
        .swiper-pagination-fraction {
          bottom: var(--swiper-pagination-bottom, px);
          z-index: 10;
          color: transparent;
          left: 14px;
        }
        .swiper-pagination-current {
          color: black;
        }
        .gallery-top .swiper-slide .swiper-box {
          opacity: 0;
          transform: scale(1);
        }
        .gallery-top .swiper-slide-active .swiper-box {
          transform: scale(0.9);
          opacity: 1;
        }
        @media (max-width: 1920px) {
          .gallery-top .swiper-slide-active .swiper-box {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default Gallery;