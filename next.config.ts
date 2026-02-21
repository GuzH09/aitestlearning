import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    useCache: true,
    viewTransition: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
