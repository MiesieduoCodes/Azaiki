'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';

const Page = () => {
  // Profile data defined directly within the component
  const profileData = {
    profile: {
      name: 'Professor Steve Azaiki',
      title: 'Scholar, Author, and Statesman',
      profileImage: '/images/Prof-Steve-Portrait.jpg',
      coverImage: '/images/Prof-Steve-Portrait.jpg',
      socialLinks: {
        email: 'mailto:professor.steve@university.com',
        linkedin: 'https://www.linkedin.com/in/steveazaiki/',
        twitter: 'https://twitter.com/profsteveazaiki',
      },
    },
    images: ['/images/Prof-Steve-Portrait.jpg'],
  };

  const { profile } = profileData;
  const { profileImage, coverImage, name, title, socialLinks } = profile;

  return (
    <div className="text-black pt-24 dark:text-gray-300 min-h-screen">
      {/* Hero Section with Background Slider */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative bg-cover pt-24 bg-center bg-no-repeat text-white py-20 w-full shadow-lg"
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto flex flex-col items-center relative z-10">
          {/* Profile Image */}
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl">
            <img src={profileImage} alt={name} className="object-cover" />
          </div>

          {/* Name and Title */}
          <h1 className="text-5xl font-extrabold mt-6">{name}</h1>
          <p className="mt-3 text-lg italic">{title}</p>

          {/* Social Links */}
          <div className="mt-4 flex space-x-4">
            <a href={socialLinks.email} target="_blank" rel="noopener noreferrer">
              <FaEnvelope className="text-white text-2xl" />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-white text-2xl" />
            </a>
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              <FaSquareXTwitter className="text-white text-2xl" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Biography Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="w-full px-4 sm:px-6 lg:px-8 py-12 mt-10 bg-earth-tone dark:bg-dark-brown shadow-lg rounded-lg mx-auto"
      >
        <h2 className="text-3xl text-black dark:text-gray-300 font-semibold mb-4 text-center">Biography</h2>
        <p className="text-black dark:text-gray-300 leading-8 text-justify">
          Professor Steve Azaiki is a distinguished scholar, author, and statesman with a lifelong
          commitment to education, public service, and community development. With a career
          spanning decades, he has made significant contributions to academia, politics, and
          philanthropy.
        </p>
        <p className="text-black dark:text-gray-300 leading-8 text-justify mt-4">
          Prof. Steve Azaiki was born in Yenagoa, Bayelsa State. He completed his Ph.D. in
          Agriculture in 1991 and later became a lecturer and research fellow. He is recognized for
          his contributions to education and public service, earning numerous awards, including the
          Officer of the Niger (OON).
        </p>
      </motion.div>

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="w-full px-4 sm:px-6 lg:px-8 py-12 mt-10 bg-gray-50 dark:bg-black shadow-lg rounded-lg mx-auto"
      >
        <h2 className="text-3xl font-semibold mb-4 text-center text-black dark:text-gray-300">
          Achievements
        </h2>
        <ul className="list-disc pl-6 text-black dark:text-gray-300 leading-8">
          <li>Authored over 10 influential books on social and political development.</li>
          <li>Founder of several educational and philanthropic initiatives.</li>
          <li>Recipient of numerous national and international awards for leadership and service.</li>
          <li>Keynote speaker at global forums on education and sustainable development.</li>
        </ul>
      </motion.div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="relative bg-cover w-fit bg-center py-20"
        style={{
          backgroundImage: "url('/images/library-bg.jpg')",
        }}
      >
        <div className="bg-black bg-opacity-60 py-12 px-4 sm:px-6 lg:px-8 rounded-lg w-full text-center mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Vision</h2>
          <p className="text-gray-300 leading-8">
            &quot;To inspire a generation of thinkers and leaders who will shape a brighter, more
            equitable future through knowledge, innovation, and unwavering dedication to the
            common good.&quot;
          </p>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full px-4 sm:px-6 lg:px-8 py-12 mt-10 bg-gray-50 dark:bg-black shadow-lg rounded-lg mx-auto"
      >
        <h2 className="text-3xl font-semibold mb-4 text-center text-black dark:text-gray-300">
          Get in Touch
        </h2>
        <div className="flex justify-center mt-6 space-x-6">
          <a href={socialLinks.email} className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-600">
            <FaEnvelope size={24} />
          </a>
          <a href={socialLinks.linkedin} className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-600">
            <FaLinkedin size={24} />
          </a>
          <a href={socialLinks.twitter} className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-600">
            <FaSquareXTwitter size={24} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
