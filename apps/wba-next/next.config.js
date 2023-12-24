// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("node:path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    outputFileTracingRoot: path.join(__dirname, "../../"),
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

  transpilePackages: [
    "@wba/tsconfig",
    "@wba/prisma",
    "@wba/openai",
    "@wba/eslint-config-custom",
    "@wba/types",
  ],
};

module.exports = nextConfig;
