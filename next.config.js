/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ["utfs.io"], // Add the domain of the image source here
  },
};
