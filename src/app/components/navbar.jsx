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

  useEffect(() => {
    setMenuData(Navdata[0]);
  }, []);

  if (!menuData) {
    return <div>Loading...</div>;
  }

  const toggleDropdown = (index) => {
    setActiveDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleLinkClick = () => {
    setActiveDropdownIndex(null); // Close the dropdown on link click
    setIsMobileMenuOpen(false); // Close the mobile menu on link click
  };

  return (
    <>
      {/* Top Contact Navbar */}
      <div className="bg-yellow-500 text-white w-full fixed top-0 z-50 shadow-md text-sm py-2 px-4 flex justify-between items-center">
        <div className="flex space-x-4 text-xs md:text-sm">
          <a href="/faq" className="hover:text-yellow-200 transition-colors">FAQ</a>
          <a href="/contact" className="hover:text-yellow-200 transition-colors">Contact</a>
          <a href="/support" className="hover:text-yellow-200 transition-colors">Support</a>
        </div>

        <div className="flex space-x-4 text-xs md:text-sm">
          <a href="/contact" className="hover:text-yellow-200 transition-colors">+2349060462206</a>
          <a href="/support" className="hover:text-yellow-200 transition-colors">miesieduoveria@gmail.com</a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white pt-3 dark:bg-black text-black dark:text-white shadow-md fixed w-full z-40 top-8">
        <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-3xl headingg font-bold hover:text-gray-500 dark:hover:text-gray-400 transition-colors">
            <TransitionLink href={menuData.teams[0].url} label={menuData.teams[0].name} />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 items-center">
            {menuData.navMain.map((item, index) => (
              <div key={index} className="relative">
                {item.items ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="flex items-center font-semibold px-4 py-2 hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
                    >
                      {item.title}
                      <ChevronDown
                        className={`w-4 h-4 ml-2 transition-transform ${
                          activeDropdownIndex === index ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                    {activeDropdownIndex === index && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-black shadow-lg rounded-lg p-2">
                        <ul>
                          {item.items.map((subItem, subIndex) => (
                            <li key={subIndex} className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                              <TransitionLink 
                                href={subItem.url} 
                                label={subItem.title}
                                className="block w-full text-left"
                                onClick={handleLinkClick} // Close dropdown on link click
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center h-full">
                    <TransitionLink
                      href={item.url}
                      label={item.title}
                      className="font-semibold px-4 py-2 hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
                      onClick={handleLinkClick} // Close dropdown on link click
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Theme Toggle and Mobile Menu */}
          <div className="flex items-center gap-4">
            <ModeToggle />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden p-2 hover:text-gray-500 dark:hover:text-gray-400"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden bg-white dark:bg-black border-t dark:border-gray-800"
            >
              <div className="container mx-auto px-4 py-4">
                <ul className="space-y-2">
                  {menuData.navMain.map((item, index) => (
                    <li key={index} className="border-b dark:border-gray-800 last:border-0">
                      {item.items ? (
                        <>
                          <button
                            onClick={() => toggleDropdown(index)}
                            className="w-full flex justify-between items-center py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                          >
                            <span className="font-medium">{item.title}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${
                              activeDropdownIndex === index ? "rotate-180" : "rotate-0"
                            }`} />
                          </button>
                          {activeDropdownIndex === index && (
                            <ul className="pl-6 py-2 space-y-2">
                              {item.items.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <TransitionLink
                                    href={subItem.url}
                                    label={subItem.title}
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    onClick={handleLinkClick} // Close dropdown on link click
                                  />
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      ) : (
                        <div className="w-full py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                          <TransitionLink
                            href={item.url}
                            label={item.title}
                            className="block font-medium"
                            onClick={handleLinkClick} // Close dropdown on link click
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;