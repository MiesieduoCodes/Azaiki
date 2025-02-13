"use client";
import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AfricanArtsPage = () => {
  
  // Art pieces data

  const artists = [
    {
      id: 1,
      name: "El Anatsui",
      description: "A Ghanaian sculptor renowned for his monumental works made from recycled materials, such as bottle caps, exploring themes of consumption, waste, and transformation.",
      image: "https://sothebys-com.brightspotcdn.com/94/8b/41c1172647f68cad11c6dfcc66f3/el-anatsui-at-the-domain-of-chaumont-sur-loire-france-2015-e.%20Sander....jpg" // Replace with a valid image URL
    },
    {
      id: 2,
      name: "Njideka Akunyili Crosby",
      description: "A Nigerian artist celebrated for her mixed-media paintings that weave together Nigerian and American culture, exploring identity, memory, and belonging.",
      image: "https://static01.nyt.com/images/2023/05/22/multimedia/21njideka-crosby1-fmhp/21njideka-crosby1-fmhp-superJumbo.jpg" // Replace with a valid image URL
    },
    {
      id: 3,
      name: "Yinka Shonibare",
      description: "A British-Nigerian artist known for his installations and sculptures that explore colonialism, post-colonialism, and cultural identity through the use of vibrant African textiles.",
      image: "https://www.alainelkanninterviews.com/wp-content/uploads/2024/06/JAMIESON_YinkaShonibare_HiRes07-copy-1225x640.jpg" // Replace with a valid image URL
    }
  ];
  

  const artPieces = [
    {
      id: 1,
      title: "African Mask",
      description:
        "This traditional mask is a symbol of spiritual and cultural significance in many African communities.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAh3X5QP9rdr0s1O3rsbCTn5eXVAHjNEpURg&s",
    },
    {
      id: 2,
      title: "Wooden Sculpture",
      description:
        "A beautifully crafted wooden sculpture, depicting the rich cultural history of the African people.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Masque_blanc_Punu-Gabon.jpg/800px-Masque_blanc_Punu-Gabon.jpg",
    },
    {
      id: 3,
      title: "Beaded Necklace",
      description:
        "This intricate beaded necklace represents the craftsmanship and cultural identity of African artisans.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn9KaIOjZc9-VUeb5yn5_mrMCa8bDlMrvYzQ&s",
    },
    {
      id: 4,
      title: "African Painting",
      description:
        "A stunning painting that depicts the vibrant life and traditions of African culture.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO98cwffNFuDp9IxDk6ZnkVNEAaZGECIqSAA&s",
    },
  ];

  // State for search query and filtered art pieces
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArt, setFilteredArt] = useState(artPieces);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter art pieces based on the search query
    const filtered = artPieces.filter(
      (art) =>
        art.title.toLowerCase().includes(query.toLowerCase()) ||
        art.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArt(filtered);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Header animation
    gsap.from(".header-title", {
      opacity: 0,
      y: -100,
      duration: 2,
      ease: "power3.out",
    });

    gsap.from(".header-description", {
      opacity: 0,
      y: 50,
      duration: 2,
      delay: 0.5,
      ease: "power3.out",
    });

    // Search bar animation
    gsap.from(".search-bar", {
      opacity: 0,
      x: -200,
      duration: 3,
      delay: 1,
      ease: "power3.in",
    });

    // Art pieces animation
    gsap.from(".art-piece", {
      opacity: 0,
      y: 100,
      stagger: 0.2,
      duration: 3,
      scrollTrigger: {
        trigger: ".art-piece",
        start: "top 90%",
        end: "top 20%",
        scrub: true,
      },
    });

    // Artist spotlight section animation
    gsap.from(".artist-spotlight", {
      opacity: 0,
      y: 100,
      stagger: 0.3,
      duration: 7,
      scrollTrigger: {
        trigger: ".artist-spotlight",
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
    });
  }, []);

  return (
    <div>
      <section className="relative bg-gradient-to-r pt-40 from-green-600 via-yellow-500 to-red-600 text-white py-20 px-6 text-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-screen-xl mx-auto">
          <h1 className="text-5xl font-extrabold leading-tight mb-4 header-title">
            Discover the Timeless Beauty of African Arts
          </h1>
          <p className="text-lg mb-6 header-description">
            Experience the rich cultural heritage, vibrant traditions, and
            unique artistic expressions of Africa. From ancient sculptures to
            contemporary masterpieces, African art tells stories that transcend
            time and borders.
          </p>
          <a
            href="#explore"
            className="bg-yellow-400 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition duration-300"
          >
            Explore African Art
          </a>

          {/* Search Input Section */}
          <form onSubmit={handleSearchSubmit} className="mt-8 search-bar">
            <div className="relative max-w-lg mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search African Art..."
                className="w-full py-3 px-6 text-lg rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Art Section */}
      <section className="py-16 px-6 bg-white text-black dark:bg-black dark:text-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold">Featured African Art Pieces</h2>
          <p className="text-lg text-gray-600 mt-4">
            Discover a curated collection of some of the most iconic and
            meaningful African art pieces, showcasing the diversity and beauty
            of the continent&apos;s artistic traditions.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Display filtered art pieces */}
          {filteredArt.length > 0 ? (
            filteredArt.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden art-piece"
              >
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {art.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{art.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              No art pieces found for your search.
            </p>
          )}
        </div>
      </section>

      {/* History and Cultural Significance Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">
            The Rich History of African Art
          </h2>
          <p className="text-lg text-gray-600 mt-6">
            African art has been an essential part of the continent&apos;s
            cultural and spiritual life for thousands of years. From the ancient
            rock art in the Sahara to the intricate beadwork of the Maasai,
            African art reflects the diversity, beliefs, and traditions of its
            people.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            Art in Africa is not just a form of expression but also a way of
            life. It plays a vital role in rituals, ceremonies, and daily life.
            Whether through sculptures, paintings, textiles, or beadwork,
            African art is deeply connected to the spiritual and cultural fabric
            of the continent.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Spotlight on African Artists
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Meet some of the most influential contemporary African artists who
            are shaping the global art scene with their unique perspectives and
            creative visions.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Map through artists data */}
          {artists.map((artist) => (
            <div key={artist.id} className="bg-white rounded-lg shadow-lg overflow-hidden artist-spotlight">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {artist.name}
                </h3>
                <p className="text-gray-600 mt-2">
                  {artist.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 bg-yellow-100">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Have questions or want to learn more about African art? Reach out to
            us and we&apos;ll be happy to assist you.
          </p>
          <a
            href="mailto:info@africanart.com"
            className="mt-6 inline-block bg-yellow-500 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default AfricanArtsPage;
