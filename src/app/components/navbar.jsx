"use client";
import React, { useState, useEffect } from "react";
import Navdata from "@/app/components/constants/navadata";
import TransitionLink from "@/app/components/TransitionLink";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { ModeToggle } from "@/app/components/mode-toggle";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuData, setMenuData] = useState(null);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMenuData(Navdata);
  }, []);

  if (!menuData) {
    return <div>Loading...</div>;
  }

  const toggleDropdown = (index) => {
    setActiveDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      {/* Top Contact Navbar */}
      <div className="bg-yellow-500 text-white w-full fixed text-sm py-2 px-4 flex justify-between items-center z-50 top-0 shadow-md">
        <div className="flex space-x-6 text-xs md:text-sm">
          <span>Email: contact@example.com </span>
          <span>Phone: +123 456 7890</span>
        </div>
        <div className="flex space-x-6 text-xs md:text-sm">
          <span><TransitionLink href="/contact" label="Contact"/></span>
          <span></span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white pt-3 dark:bg-black text-black dark:text-white shadow-md fixed w-full z-40 top-8">
        <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-3xl font-bold hover:text-gray-500">
            <TransitionLink href={menuData.teams[0].url} label={menuData.teams[0].name} />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 items-center">
            {menuData.navMain.map((item, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => toggleDropdown(index)}
                  className="flex items-center font-semibold px-4 py-2 hover:text-gray-500 transition"
                >
                  {item.title}
                  <ChevronDown
                    className={`w-4 h-4 ml-2 transition-transform ${
                      activeDropdownIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {activeDropdownIndex === index && item.items && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg border rounded-lg p-2">
                    <ul>
                      {item.items.map((subItem, subIndex) => (
                        <li key={subIndex} className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                          <TransitionLink href={subItem.url} label={subItem.title} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Theme Toggle Button */}
          <ModeToggle />

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu with Animation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="lg:hidden bg-white dark:bg-black text-black dark:text-white shadow-md p-4 fixed top-16 left-0 w-3/4 h-full z-30"
            >
              <ul className="space-y-4">
                {menuData.navMain.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: index % 2 === 0 ? "-50%" : "50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                    className="flex flex-col"
                  >
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="flex items-center w-full justify-between px-4 py-2 font-semibold"
                    >
                      {item.title}
                      {item.items && <ChevronDown className="w-4 h-4" />}
                    </button>
                    {activeDropdownIndex === index && item.items && (
                      <ul className="mt-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                        {item.items.map((subItem, subIndex) => (
                          <motion.li
                            key={subIndex}
                            initial={{ x: subIndex % 2 === 0 ? "-30%" : "30%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, ease: "easeOut", delay: subIndex * 0.1 }}
                            className="px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg"
                          >
                            <TransitionLink href={subItem.url} label={subItem.title} />
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
  
