/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap", // maps /sitemap.xml -> app/sitemap/route.js
      },
    ];
  },
};

module.exports = nextConfig;
