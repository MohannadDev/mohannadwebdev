import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true
  },
  trailingSlash: true, 
  experimental: {
    optimizeCss: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',

};

export default nextConfig;
