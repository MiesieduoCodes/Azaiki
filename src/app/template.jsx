"use client";

import { useEffect } from "react";
import { animatePageIn } from "@/utils/animations";

export default function Template({ children }) {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Banner Sections with Improved Animations */}
      <div
        id="banner-1"
        className="min-h-screen bg-yellow-400 z-50 fixed top-0 left-1/4 w-1/4 transform -translate-x-full animate-slide-in"
      />
      <div
        id="banner-2"
        className="min-h-screen bg-yellow-500 z-50 fixed top-0 left-0 w-1/4 transform -translate-x-full animate-slide-in delay-100"
      />
      <div
        id="banner-3"
        className="min-h-screen bg-yellow-600 z-50 fixed top-0 left-3/4 w-1/4 transform translate-x-full animate-slide-in delay-200"
      />
      <div
        id="banner-4"
        className="min-h-screen bg-yellow-700 z-50 fixed top-0 left-2/4 w-1/4 transform translate-x-full animate-slide-in delay-300"
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}