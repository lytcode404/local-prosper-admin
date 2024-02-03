/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "dummyimage.com",
      "firebasestorage.googleapis.com",
      "images.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
