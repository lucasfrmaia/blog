/** @type {import('next').NextConfig} */
const nextConfig = {
   env: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'your-secret-key',
      API_URL: process.env.API_URL,
   },
   images: {
      domains: ['github.com'],
   },
};

module.exports = nextConfig;
