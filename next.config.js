/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    typedRoutes: true,
  },
  images: {
    domains: ["picsum.photos", "img.clerk.com", "lh3.googleusercontent.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["./src/components/ui"],
};

module.exports = nextConfig;
