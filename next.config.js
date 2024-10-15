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
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    // Add raw-loader for .hbs files
    config.module.rules.push({
      test: /\.hbs$/,
      loader: "raw-loader",
    });

    return config;
  },
};
