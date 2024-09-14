/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
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
  compress: true
};

module.exports = nextConfig;
