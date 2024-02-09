/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],
    unoptimized: true,
  },
  output: "export",
};

module.exports = nextConfig;
