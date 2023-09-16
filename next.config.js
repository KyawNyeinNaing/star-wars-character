/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lumiere-a.akamaihd.net', 'starwars-visualguide.com', 'lumiere-a.akamaihd.net'],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
