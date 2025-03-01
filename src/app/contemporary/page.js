"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Swiper from "swiper";
import "swiper/css";
import combinedData from "@/app/components/constants/contemporary.json";

export default function GalleryProfilePage() {
  const { id } = useParams();
  const [profileArtist, setProfileArtist] = useState(null);

  // Always define these objects—even if combinedData is undefined, we fall back to {}
  const artistsData = combinedData?.contemporaryArtists ?? {};
  const galleryData = combinedData?.galleryImages ?? {};

  // Use useEffect to update profileArtist when id changes.
  useEffect(() => {
    if (id && Object.keys(artistsData).length > 0) {
      const artistsArray = Object.values(artistsData);
      const selectedArtist = artistsArray.find(
        (artist) => artist.id === parseInt(id)
      );
      setProfileArtist(selectedArtist);
    }
  }, [id, artistsData]);

  // Always call the gallery slider useEffect, but only initialize if no id is provided.
  useEffect(() => {
    if (!id) {
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
          1920: { slidesPerView: 3, spaceBetween: 20 },
          1400: { slidesPerView: 3, spaceBetween: 20 },
          900: { slidesPerView: 3, spaceBetween: 15 },
          200: { slidesPerView: 2, spaceBetween: 15 },
        },
      });
    }
  }, [id]);

  // Now, conditionally render content (after all hooks have been called)
  if (!combinedData) {
    return <div>Loading data...</div>;
  }

  if (id && !profileArtist) {
    return <div>Loading profile...</div>;
  }

  if (id) {
    // Render the Profile View.
    return (
      <div className="min-h-screen bg-gradient-to-r from-green-400 to-teal-500 text-white">
        <div className="max-w-4xl mx-auto py-16 px-4">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src={profileArtist.image}
              alt={profileArtist.name}
              className="w-full md:w-1/3 rounded-lg shadow-lg"
            />
            <div>
              <h1 className="text-4xl font-bold mb-4">{profileArtist.name}</h1>
              <p className="text-lg mb-6">{profileArtist.bio}</p>
              <h2 className="text-2xl font-semibold mb-4">Portfolio</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.values(profileArtist.portfolio ?? {}).map(
                  (image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      className="rounded-lg shadow-md"
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render the Gallery View.
  const artworks = Object.values(galleryData.artworks ?? {});
  const contemporaryArtists = Object.values(artistsData);
  const buttonText = "Join Us";

  return (
    <div>
      {/* Gallery Slider Section */}
      <section className="py-24 bg-gray-350 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="pb-16">
            <h2 className="w-full text-center text-gray-900 dark:text-yellow-500 text-4xl font-bold font-manrope leading-loose pb-2.5">
              Azaiki Contemporary Art Gallery
            </h2>
            <p className="w-full text-center text-gray-600 dark:text-gray-300 text-lg font-normal leading-8">
              Immerse yourself in a world where tradition meets innovation.
              Explore striking contemporary masterpieces crafted by visionary
              artists.
            </p>
          </div>

          <div className="mx-auto w-auto relative">
            <button className="top-[35%] swiper-button-prev w-11 h-11 p-3 xl:flex hidden shadow-lg items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg group hover:bg-gray-900 dark:hover:bg-white transition-all duration-700 ease-in-out">
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
                {artworks.map((item, index) => (
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
            <button className="swiper-button-next top-[35%] xl:flex hidden shadow-lg w-11 h-11 items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg group transition-all duration-700 ease-in-out hover:bg-gray-900 dark:hover:bg-white">
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
          .gallery-top .swiper-slide .swiper-box {
            opacity: 0;
            transform: scale(1);
          }
          .gallery-top .swiper-slide-active .swiper-box {
            transform: scale(0.9);
            opacity: 1;
          }
        `}</style>
      </section>

      {/* Artists Section */}
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-6 lg:px-8 mx-auto">
          <div className="flex items-center justify-center flex-col gap-5 mb-14">
            <h2 className="font-manrope font-bold text-4xl dark:text-yellow-500 text-gray-900 text-center">
              Meet Our Artists
            </h2>
            <p className="text-lg font-normal dark:text-white text-gray-800 max-w-3xl mx-auto text-center">
              Discover the talented artists behind the masterpieces. Each artist
              brings their unique vision and creativity to our gallery.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-14">
            {contemporaryArtists.map((artist, index) => (
              <div key={index} className="block text-center">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  width={400}
                  height={300}
                  className="w-full rounded-lg object-cover mb-4"
                />
                <h3 className="text-xl font-bold dark:text-yellow-500 text-gray-900">
                  {artist.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {artist.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
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
            <h1 className="mb-5 text-5xl font-bold text-light-text">
              Want to be a contemporary artist with the museum?
            </h1>
            <p className="mb-5 text-light-text">
              Join us to explore your creativity and showcase your contemporary
              art in a vibrant community.
            </p>
            <button className="button">
              <span className="button_lg">
                <span className="button_sl"></span>
                <span className="button_text">{buttonText}</span>
              </span>
              <style jsx>{`
                .button {
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
                  content: "";
                  display: block;
                  position: absolute;
                  right: 0;
                  left: 0;
                  height: calc(50% - 5px);
                  border: 1px solid #7d8082;
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
                  content: "";
                  display: block;
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 2px;
                  height: 2px;
                  background-color: #0f1923;
                }
                .button_lg::after {
                  content: "";
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
}
