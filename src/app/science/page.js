// components/ShuffleHero.js
"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ShuffleHero = () => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
          Advancing Knowledge
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
          Welcome to Azaiki Science and Technology Institute
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
          Explore our cutting-edge research and innovative technologies that empower students and faculty to make a difference in the world.
        </p>
        <button className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95">
          Learn More
        </button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

// Embedded JSON data for Azaiki Science and Technology Institute
const instituteData = [
  {
    id: 1,
    src: "/images/DSC_1241.jpg",
    description: "Innovative Research Lab"
  },
  {
    id: 2,
    src: "/images/",
    description: "Collaboration Spaces"
  },
  {
    id: 3,
    src: "/images/DSC_1241.jpg",
    description: "Advanced Technology Classroom"
  },
  {
    id: 4,
    src: "/images/",
    description: "Student Projects Showcase"
  },
  {
    id: 5,
    src: "/images/DSC_1241.jpg",
    description: "Research Presentation"
  },
  {
    id: 6,
    src: "/images/",
    description: "Technological Innovations"
  },
];

const generateSquares = () => {
  return shuffle(instituteData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full relative"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hidden text-white bg-black bg-opacity-50 p-4">
        {sq.description}
      </div>
    </motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;