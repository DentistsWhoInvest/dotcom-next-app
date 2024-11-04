/** @type {import('next').NextConfig} */
const { exec } = require("child_process");

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.dentistswhoinvest.com",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
  output: "export",
  compress: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      exec("node generate-sitemap.js", (err, stdout, stderr) => {
        if (err) {
          console.error(`Error generating sitemap: ${stderr}`);
        } else {
          console.log(`Sitemap generated: ${stdout}`);
        }
      });
    }
    return config;
  },
};

module.exports = nextConfig;
