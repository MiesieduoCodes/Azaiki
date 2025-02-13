/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['images.pexels.com'], // Allow images from Pexels
    },
  };
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  export default nextConfig;