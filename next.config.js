/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [`${process.env.DOMAIN}`],
    unoptimized: true,
  },
  output: "export",
};

module.exports = nextConfig;
