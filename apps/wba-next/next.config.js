/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },
  async rewrites() {
    return [
      {
        source: "/blogs",
        destination: "/blogs/1",
      },
    ];
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
