/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    typedRoutes: true,
  },
  images: {
    domains: ["picsum.photos", "img.clerk.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["./src/components/ui"],
};

module.exports = nextConfig;
