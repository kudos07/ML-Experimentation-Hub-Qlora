/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // important for static export
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js image optimization
  },
  basePath: '/ML-Experimentation-Hub-Qlora', // repo name
};

module.exports = nextConfig;
