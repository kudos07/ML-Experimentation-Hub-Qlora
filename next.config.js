/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Required for static export
  basePath: "/ML-Experimentation-Hub-Qlora", // Repo name here
  images: {
    unoptimized: true, // GitHub Pages does not support next/image optimization
  },
};

module.exports = nextConfig;
