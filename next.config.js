/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.drjamesmartin.co.uk',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  output: "export",
};

module.exports = nextConfig;
