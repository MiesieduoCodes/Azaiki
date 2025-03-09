'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaBook, FaAward, FaGlobe } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const Page = () => {
  // Profile data defined directly within the component
  const profileData = {
    profile: {
      name: 'Professor Steve Azaiki',
      title: 'Scholar, Author, and Statesman',
      profileImage: '/images/Prof-Steve-Portrait.jpg',
      coverImage: '/images/IMG-20250207-WA0040.jpg',
      socialLinks: {
        email: 'mailto:professor.steve@university.com',
        linkedin: 'https://www.linkedin.com/in/steveazaiki/',
        twitter: 'https://twitter.com/profsteveazaiki',
      },
    },
    education: [
      { degree: 'D.Sc. in Personnel Management', year: 2021 },
      { degree: 'PhD in Personnel Management', year: 2017 },
      { degree: 'MBA in Project Management', institution: 'Federal University of Technology, Owerri (FUTO)', year: 2001 },
      { degree: 'PhD in Agriculture (Biological Sciences)', institution: 'Ukrainian Agricultural University, Kiev', year: 1991 },
      { degree: 'M.Sc. in Agronomy (Plant Protection)', institution: 'Ukrainian Agricultural University, Kiev', year: 1986 },
      { degree: 'Grade 1 Certificate', year: 1979 },
    ],
    workExperience: [
      { role: 'Adjunct Professor of Agriculture (Agronomy)', institution: 'University of Life and Environmental Sciences, Kiev, Ukraine', period: 'Present' },
      { role: 'Adjunct Professor of Agriculture (Agronomy)', institution: 'Institute of Potato Research, Nemecheva, Ukraine', period: 'Present' },
      { role: 'National Director', institution: 'National Directorate of Employment (NDE), Abuja', period: '2007–2010' },
      { role: 'State Coordinator', institution: 'NDE (Rivers State)', period: '1999–2003' },
      { role: 'Pioneer Commissioner for Agriculture', institution: 'Bayelsa State', period: '1997–1999' },
      { role: 'Honorary Professor of Conflict and Crisis Management', institution: 'Interregional Academy of Personnel Management, Kiev, Ukraine' },
    ],
    communityService: [
      'Established the Institute of Science and Technology, Yenagoa (2015)',
      'Built Azaiki Museum of Niger Delta and African Arts (2015)',
      'Built Azaiki Public Library (2010/2011)',
      'Built Yenebebeli Anglican Church (2010/2011)',
      'Built St. Andrew Primary School, Yenebebeli (1998/1999)',
      'Contributed to community development with schools, skills acquisition centers, and health facilities in Bayelsa State',
    ],
    travels: 'Visited over 90 countries including Russia, Germany, France, Britain, China, and the United States.',
    activities: [
      { role: 'Founder and Coordinator', organization: 'National Think Tank Nigeria (NTTN)', period: '2007–present' },
      { role: 'President', organization: 'Global Organization of Parliamentarians Against Corruption (GOPAC), Nigeria', period: '2019–2023' },
      { role: 'Vice Chairman', organization: 'World Bank/IMF Parliamentary Network', period: '2021–2023' },
      { role: 'President', organization: 'International Society of Comparative Education, Science, and Technology (ISCEST), Nigeria', period: '2014–2017' },
      { role: 'President', organization: 'World Environmental Foundation for Africa (WEMFFA)', period: '1993–2003' },
    ],
    politics: {
      position: 'Honourable Member (9th National Assembly)',
      constituency: 'House of Representatives, Yenagoa/Kolokuma-Opokuma Federal Constituency, Bayelsa State',
      period: '2019–2023',
    },
    directorPositions: [
      'Board Member, Sovereign Trust Insurance Plc',
      'Board Member, Bayelsa State Development & Investment Cooperation (BDIC)',
      'Board Member, Bayelsa State Agricultural Development Board',
    ],
    publications: 'Prof. Steve Azaiki has published extensively.'
  };

  const { profile } = profileData;
  const { profileImage, coverImage, name, title, socialLinks } = profile;

  // Smooth scroll animations
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="text-gray-900 dark:text-gray-100 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      {/* Hero Section with Background Slider */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative bg-cover pt-24 bg-center bg-no-repeat text-white py-32 w-full shadow-lg"
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto flex flex-col items-center relative z-10">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-white"
          >
            <Image
              src={profileImage}
              alt={name}
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </motion.div>

          {/* Name and Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-5xl font-extrabold mt-6 text-center"
          >
            {name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-3 text-lg italic text-center"
          >
            {title}
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-6 flex space-x-6"
          >
            <a
              href={socialLinks.email}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
              className="hover:scale-110 transition-transform"
            >
              <FaEnvelope className="text-white text-3xl" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:scale-110 transition-transform"
            >
              <FaLinkedin className="text-white text-3xl" />
            </a>
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:scale-110 transition-transform"
            >
              <FaSquareXTwitter className="text-white text-3xl" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Biography Section */}
      <motion.div
        ref={ref}
        style={{ opacity, scale }}
        className="w-full px-4 sm:px-6 lg:px-8 py-16 mt-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg mx-auto max-w-4xl transition-colors duration-500"
      >
        <h2 className="text-4xl font-semibold mb-8 text-center text-gray-900 dark:text-gray-100">
          Biography
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-8 text-justify">
          Professor Steve Azaiki is a distinguished scholar, author, and statesman with a lifelong
          commitment to education, public service, and community development. With a career
          spanning decades, he has made significant contributions to academia, politics, and
          philanthropy.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-8 text-justify mt-6">
          Prof. Steve Azaiki was born in Yenagoa, Bayelsa State. He completed his Ph.D. in
          Agriculture in 1991 and later became a lecturer and research fellow. He is recognized for
          his contributions to education and public service, earning numerous awards, including the
          Officer of the Niger (OON).
        </p>
      </motion.div>

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full px-4 sm:px-6 lg:px-8 py-16 mt-10 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg mx-auto max-w-4xl transition-colors duration-500"
      >
        <h2 className="text-4xl font-semibold mb-8 text-center text-gray-900 dark:text-gray-100">
          Achievements
        </h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 leading-8 space-y-4">
          {profileData.education.map((edu, index) => (
            <li key={index} className="flex items-start">
              <FaAward className="text-yellow-500 text-2xl mr-4 mt-1" />
              {edu.degree} {edu.institution ? `from ${edu.institution}` : ''} ({edu.year})
            </li>
          ))}
          {profileData.workExperience.map((work, index) => (
            <li key={index} className="flex items-start">
              <FaGlobe className="text-yellow-500 text-2xl mr-4 mt-1" />
              {work.role} at {work.institution} ({work.period})
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative bg-cover w-full bg-center py-32 mt-10"
        style={{
          backgroundImage: "url('/images/library-bg.jpg')",
        }}
      >
        <div className="bg-black bg-opacity-60 py-16 px-4 sm:px-6 lg:px-8 rounded-lg w-full text-center mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-6">Vision</h2>
          <p className="text-gray-300 leading-8 text-justify">
            &quot;To inspire a generation of thinkers and leaders who will shape a brighter, more
            equitable future through knowledge, innovation, and unwavering dedication to the
            common good.&quot;
          </p>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full px-4 sm:px-6 lg:px-8 py-16 mt-10 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg mx-auto max-w-4xl transition-colors duration-500"
      >
        <h2 className="text-4xl font-semibold mb-8 text-center text-gray-900 dark:text-gray-100">
          Get in Touch
        </h2>
        <div className="flex justify-center mt-6 space-x-8">
          <a
            href={socialLinks.email}
            aria-label="Email"
            className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-600 transition-transform hover:scale-110"
          >
            <FaEnvelope size={32} />
          </a>
          <a
            href={socialLinks.linkedin}
            aria-label="LinkedIn"
            className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-600 transition-transform hover:scale-110"
          >
            <FaLinkedin size={32} />
          </a>
          <a
            href={socialLinks.twitter}
            aria-label="Twitter"
            className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-600 transition-transform hover:scale-110"
          >
            <FaSquareXTwitter size={32} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
