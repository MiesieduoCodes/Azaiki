"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swiper from "swiper";
import "swiper/css";

// Import combined gallery data
import galleryData from "@/app/components/constants/galleryData.json";

const Gallery = () => {
  const buttonText = "Join Us";

  useEffect(() => {
    // Initialize Swiper slider for the art gallery
    const mySwiper = new Swiper(".gallery-top", {
      spaceBetween: 20,
      slidesPerView: 3,
      parallax: true,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 2000,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
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

  // Extract slider and exhibition data from the combined JSON file
  const sliderData = galleryData.slider;
  const exhibitionData = galleryData.exhibition;

  return (
    <div>
      {/* Artistic Header Section */}
      <section className="py-24 bg-gradient-to-r from-gray-800 via-black to-gray-900 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="pb-16">
            <h2 className="w-full text-center text-white text-5xl font-bold font-manrope leading-tight pb-2.5">
              Azaiki Digital Art Gallery
            </h2>
            <p className="w-full text-center text-gray-300 text-xl font-light leading-relaxed max-w-3xl mx-auto">
              Immerse yourself in a realm where creativity and technology converge.
              Explore stunning digital masterpieces crafted by visionary artists,
              each telling a unique story.
            </p>
          </div>

          {/* Slider Wrapper */}
          <div className="mx-auto w-auto relative">
            <button className="swiper-button-prev absolute left-0 top-[35%] hidden xl:flex w-11 h-11 p-3 shadow-lg items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg group hover:bg-gray-900 dark:hover:bg-white transition-all duration-700 ease-in-out">
              <svg
                className="text-gray-900 dark:text-white group-hover:text-white dark:group-hover:text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M12.5002 14.9999L7.50005 9.99973L12.5032 4.99658"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="swiper-container gallery-top w-full md:w-[1028px] mx-auto xl:overflow-hidden pt-6">
              <div className="swiper-wrapper w-max mx-auto mb-5 flex gap-3">
                {sliderData.map((item, index) => (
                  <div className="swiper-slide max-w-[319px] grid" key={index}>
                    <img
                      className="grow shrink basis-0 w-full rounded-xl object-cover"
                      src={item.src}
                      alt={item.title}
                    />
                    <div className="swiper-box mx-auto relative flex-col justify-center items-center gap-1 flex mt-5">
                      <h5 className="w-full text-center text-gray-900 dark:text-white text-xl font-medium leading-loose">
                        {item.title}
                      </h5>
                      <p className="w-full text-center text-gray-600 dark:text-gray-300 text-base font-normal leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="swiper-button-next absolute top-[35%] right-0 hidden xl:flex shadow-lg w-11 h-11 items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg group transition-all duration-700 ease-in-out hover:bg-gray-900 dark:hover:bg-white">
              <svg
                className="text-gray-900 dark:text-white group-hover:text-white dark:group-hover:text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M7.50301 4.99637L12.5032 9.99657L7.50006 14.9997"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Custom Styles for Slider */}
        <style jsx>{`
          .gallery-top .swiper-slide {
            height: fit-content;
            margin-right: 0px;
          }
          .gallery-top .swiper-slide-active {
            transform: scale(1.1);
          }
          .swiper-button-next,
          .swiper-button-prev {
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

      {/* Digital Art Exhibition Section */}
      <section className="py-24 relative bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-7xl px-6 lg:px-8 mx-auto">
          <div className="flex flex-col items-center justify-center gap-5 mb-14">
            <span className="bg-indigo-150 dark:bg-yellow-500 dark:text-white text-indigo-500 text-xs font-medium px-3.5 py-1 rounded-full">
              Art Gallery
            </span>
            <h2 className="font-manrope font-bold text-4xl dark:text-yellow-500 text-gray-900 text-center">
              Digital Art Exhibition
            </h2>
            <p className="text-lg font-normal dark:text-white text-gray-800 max-w-3xl mx-auto text-center">
              Step into a curated collection of mesmerizing digital artworks. Each piece is a testament to creativity, skill, and innovation, uniting art and technology.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-14">
            {exhibitionData.map((img, index) => (
              <div key={index} className="block">
                <Image
                  src={img}
                  alt="Digital artwork on display"
                  width={400}
                  height={300}
                  className="w-full rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
          <button className="w-full rounded-lg py-4 px-6 text-center bg-indigo-100 dark:bg-yellow-500 text-lg font-medium text-black transition-all duration-300 hover:text-white hover:bg-indigo-600">
            View More Artworks
          </button>
        </div>
      </section>

      {/* Hero Section for Call to Action */}
      <div
        className="hero min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1023589586/photo/hand-of-employer-filing-final-remuneration-to-employee-letter-of-resignation-resign-concept.jpg?b=1&s=612x612&w=0&k=20&c=BzZiTTaE_HmDCuSIs936rBGdKIGMn_EPO5fLTUFMWNI=')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="hero-content text-neutral-content text-center relative z-10">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-light-text dark:text-dark-text">
              Want to be a digital artist with the museum?
            </h1>
            <p className="mb-5 text-light-text dark:text-dark-text">
              Join us to explore your creativity and showcase your digital art in a vibrant community where art meets innovation.
            </p>
            <button className="button">
              <a href="/contact">
                <span className="button_lg">
                  <span className="button_sl"></span>
                  <span className="button_text">{buttonText}</span>
                </span>
              </a>
              <style jsx>{`
                .button {
                  -moz-appearance: none;
                  -webkit-appearance: none;
                  appearance: none;
                  border: none;
                  background: none;
                  color: #0f1923;
                  cursor: pointer;
                  position: relative;
                  padding: 8px;
                  margin-bottom: 20px;
                  text-transform: uppercase;
                  font-weight: bold;
                  font-size: 14px;
                  transition: all 0.15s ease;
                }
                .button::before,
                .button::after {
                  content: '';
                  display: block;
                  position: absolute;
                  right: 0;
                  left: 0;
                  height: calc(50% - 5px);
                  border: 1px solid #7D8082;
                  transition: all 0.15s ease;
                }
                .button::before {
                  top: 0;
                  border-bottom-width: 0;
                }
                .button::after {
                  bottom: 0;
                  border-top-width: 0;
                }
                .button:active,
                .button:focus {
                  outline: none;
                }
                .button:active::before,
                .button:active::after {
                  right: 3px;
                  left: 3px;
                }
                .button:active::before {
                  top: 3px;
                }
                .button:active::after {
                  bottom: 3px;
                }
                .button_lg {
                  position: relative;
                  display: block;
                  padding: 10px 20px;
                  color: #fff;
                  background-color: #0f1923;
                  overflow: hidden;
                  box-shadow: inset 0px 0px 0px 1px transparent;
                }
                .button_lg::before {
                  content: '';
                  display: block;
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 2px;
                  height: 2px;
                  background-color: #0f1923;
                }
                .button_lg::after {
                  content: '';
                  display: block;
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  width: 4px;
                  height: 4px;
                  background-color: #0f1923;
                  transition: all 0.2s ease;
                }
                .button_sl {
                  display: block;
                  position: absolute;
                  top: 0;
                  bottom: -1px;
                  left: -8px;
                  width: 0;
                  background-color: #ff4655;
                  transform: skew(-15deg);
                  transition: all 0.2s ease;
                }
                .button_text {
                  position: relative;
                }
                .button:hover {
                  color: #0f1923;
                }
                .button:hover .button_sl {
                  width: calc(100% + 15px);
                }
                .button:hover .button_lg::after {
                  background-color: #fff;
                }
              `}</style>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
