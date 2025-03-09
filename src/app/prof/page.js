'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaBook, FaAward, FaGlobe } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const Page = () => {
  // Full profile data
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
      { degree: 'Grade 1 Certificate', year: 1979 }
    ],
    workExperience: [
      { role: 'Adjunct Professor of Agriculture (Agronomy)', institution: 'University of Life and Environmental Sciences, Kiev, Ukraine', period: 'Present' },
      { role: 'National Director', institution: 'National Directorate of Employment (NDE), Abuja', period: '2007–2010' },
      { role: 'Pioneer Commissioner for Agriculture', institution: 'Bayelsa State', period: '1997–1999' }
    ],
  };

  const { profile } = profileData;
  const { profileImage, coverImage, name, title, socialLinks } = profile;

  return (
    <div className="text-gray-900 dark:text-gray-100 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <motion.div className="relative bg-cover pt-24 bg-center bg-no-repeat text-white py-32 w-full shadow-lg" style={{ backgroundImage: `url(${coverImage})` }}>
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto flex flex-col items-center relative z-10">
          <motion.div className="w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-white">
            <Image src={profileImage} alt={name} width={160} height={160} className="object-cover w-full h-full" />
          </motion.div>
          <motion.h1 className="text-5xl font-extrabold mt-6 text-center">{name}</motion.h1>
          <motion.p className="mt-3 text-lg italic text-center">{title}</motion.p>
          <motion.div className="mt-6 flex space-x-6">
            <a href={socialLinks.email}><FaEnvelope className="text-white text-3xl" /></a>
            <a href={socialLinks.linkedin}><FaLinkedin className="text-white text-3xl" /></a>
            <a href={socialLinks.twitter}><FaSquareXTwitter className="text-white text-3xl" /></a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
