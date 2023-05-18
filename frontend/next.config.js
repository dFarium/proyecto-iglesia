/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: process.env.SV,
  },
};

module.exports = nextConfig;
