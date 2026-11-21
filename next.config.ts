import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    cpus: 1,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/news",
        destination: "/reviews",
        permanent: false,
      },
      {
        source: "/news/:slug",
        destination: "/reviews",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
