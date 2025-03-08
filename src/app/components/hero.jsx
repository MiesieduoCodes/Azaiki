import Lenis from 'lenis';
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const SmoothScrollHero = () => {
  return (
    <div className="dark:bg-zinc-950 bg-amber-200">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
          smoothWheel: true,
          syncTouch: true
        }}
      >
        <Hero />
        <Schedule />
      </ReactLenis>
    </div>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: "url(/images/IMG-20250207-WA0022.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-center bg-black/30">
        <div className="px-4 space-y-4 md:space-y-6 lg:space-y-8 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            Azaiki Art Gallery And Museum
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl lg:text-2xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)] px-4"
          >
            Preserving Cultural Heritage Through Contemporary African Art
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="/images/DSC_1156.jpg"
        alt="Traditional African sculpture"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="/images/IMG-20250101-WA0023.jpg"
        alt="Contemporary art exhibition"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="/images/IMG-20250207-WA0019.jpg"
        alt="Artist at work"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src="/images/DSC_1241.jpg"
        alt="Gallery interior"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={`${className} rounded-lg shadow-2xl`}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = () => {
  return (
    <motion.section
      id="exhibitions"
      className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 container mx-auto"
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {[
         {
          image: "https://plus.unsplash.com/premium_photo-1715457841520-6079d7d9459a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          title: "Explore Digital Art",
          description:
            "Immerse yourself in the world of digital art, featuring captivating visuals from talented creators.",
        },
        {
          image: "https://images.pexels.com/photos/2130137/pexels-photo-2130137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          title: "Upcoming Art Exhibitions",
          description:
            "Discover upcoming exhibitions and events showcasing the best in contemporary art.",
        },
        {
          image: "https://images.pexels.com/photos/3205574/pexels-photo-3205574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          title: "Join Artistic Communities",
          description:
            "Connect with fellow artists and art enthusiasts to collaborate, share ideas, and create together.",
        },
      ].map((section, index) => (
        <motion.div
          key={index}
          className="relative group overflow-hidden rounded-2xl shadow-xl bg-cover bg-center h-96 transform transition duration-500 hover:scale-105"
          style={{ backgroundImage: `url(${section.image})` }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500 flex flex-col justify-end p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
              {section.title}
            </h2>
            <p className="text-white text-base md:text-lg">{section.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
};