"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/app/components/theme-provider";

// Use Inter font as Geist is unavailable in next/font/google
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Function to map paths to page titles
const getPageTitle = (pathname) => {
  const routeTitles = {
    "/": "Welcome to AAGM - Home of Arts",
    "/about": "About Us - Learn About AAGM",
    "/faq": "FAQ - Your Questions Answered",
    "/support": "Support - We're Here to Help",
    "/contact": "Contact Us - Get in Touch",
    "/digital": "Explore Digital Art - AAGM Gallery",
    "/sculptures": "Sculptures - Timeless Creations",
    "/niger-delta": "Niger Delta Arts - Cultural Heritage",
    "/african": "African Arts - Rich Traditions",
    "/contemporary": "Contemporary Arts - Modern Expressions",
    "/all": "General Gallery - Discover More",
  };

  return routeTitles[pathname] || "AAGM - Art & Culture Gallery";
};

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Update document title dynamically
    document.title = getPageTitle(pathname);
  }, [pathname]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased pt-20`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
