import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const TeamSection = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current;

    gsap.fromTo(
      cards,
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const teamMembers = [
    {
      name: "Professor Steve Azaiki",
      image: "/images/IMG-20250207-WA0040.jpg",
      about: "Professor Steve Azaiki (OON), is an astute administrator and his achievements cut across several fields including Academics, Environmentalism, Consultancy and Public Service."
    },
    {
      name: "Bob Smith",
      image: "/images/bob.jpg",
      about: "Specializes in contemporary art and manages exhibitions worldwide."
    },
    {
      name: "Clara Davis",
      image: "/images/clara.jpg",
      about: "Expert in African arts, curator of numerous collections."
    },
    {
      name: "David Lee",
      image: "/images/david.jpg",
      about: "Sculptor and historian passionate about preserving cultural heritage."
    }
  ];

  return (
    <section ref={sectionRef} className="py-12 bg-gray-100 dark:bg-black font-sans">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-yellow-300">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="relative group overflow-hidden rounded-lg shadow-lg bg-white dark:bg-black transition-transform duration-300 hover:scale-105"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-44 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                <p className="text-lg font-semibold">{member.name}</p>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-yellow-400">{member.name}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{member.about}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
