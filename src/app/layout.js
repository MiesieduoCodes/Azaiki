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

// Function to map paths to page titles and meta descriptions
const getPageMetadata = (pathname) => {
  const routeMetadata = {
    "/": {
      title: "Welcome to AAGM - Home of Arts",
      description: "Discover various forms of art at AAGM, your home of creativity and inspiration.",
      keywords: "arts, gallery, creativity, AAGM",
    },
    "/about": {
      title: "About Us - Learn About AAGM",
      description: "Learn more about AAGM, our mission, and our dedication to the arts.",
      keywords: "about AAGM, mission, arts",
    },
    "/faq": {
      title: "FAQ - Your Questions Answered",
      description: "Find answers to frequently asked questions about AAGM and our services.",
      keywords: "FAQ, questions, AAGM",
    },
    "/support": {
      title: "Support - We're Here to Help",
      description: "Contact our support team for assistance with any inquiries.",
      keywords: "support, help, AAGM",
    },
    "/contact": {
      title: "Contact Us - Get in Touch",
      description: "Get in touch with AAGM for any inquiries or collaborations.",
      keywords: "contact, AAGM, inquiries",
    },
    "/digital": {
      title: "Explore Digital Art - AAGM Gallery",
      description: "Explore the world of digital art at AAGM Gallery.",
      keywords: "digital art, gallery, AAGM",
    },
    "/sculptures": {
      title: "Sculptures - Timeless Creations",
      description: "Discover timeless sculptures at AAGM, reflecting creativity and culture.",
      keywords: "sculptures, art, AAGM",
    },
    "/niger-delta": {
      title: "Niger Delta Arts - Cultural Heritage",
      description: "Explore the rich cultural heritage of the Niger Delta through art.",
      keywords: "Niger Delta, arts, culture",
    },
    "/african": {
      title: "African Arts - Rich Traditions",
      description: "Experience the rich traditions of African arts at AAGM.",
      keywords: "African arts, culture, AAGM",
    },
    "/contemporary": {
      title: "Contemporary Arts - Modern Expressions",
      description: "Discover modern expressions in contemporary arts at AAGM.",
      keywords: "contemporary arts, modern art, AAGM",
    },
    "/all": {
      title: "General Gallery - Discover More",
      description: "Explore our general gallery and discover a variety of artworks.",
      keywords: "gallery, arts, AAGM",
    },
  };

  return routeMetadata[pathname] || {
    title: "AAGM - Art & Culture Gallery",
    description: "AAGM offers a diverse range of art and cultural experiences.",
    keywords: "AAGM, arts, culture, gallery",
  };
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const { title, description, keywords } = getPageMetadata(pathname);

  useEffect(() => {
    // Update document title dynamically
    document.title = title;
    // Update meta description dynamically
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.content = description;
    }
    // Update keywords dynamically
    const metaKeywords = document.querySelector("meta[name='keywords']");
    if (metaKeywords) {
      metaKeywords.content = keywords;
    }
  }, [pathname, title, description, keywords]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`https://yourdomain.com${pathname}`} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        {/* Open Graph Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://yourdomain.com${pathname}`} />
        <meta property="og:image" content="https://yourdomain.com/path/to/image.jpg" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://yourdomain.com/path/to/image.jpg" />
      </head>
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