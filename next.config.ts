import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true
  },
  // Optimize for single-page application
  trailingSlash: true, // Ensures consistent URLs
  output: 'export', // Static HTML export for single-page apps
  // Disable server components as they're not needed for a single-page app
  experimental: {
    // Enables better tree-shaking for reduced bundle size
    optimizeCss: true,
  },
  // Improve asset loading
  assetPrefix: process.env.NODE_ENV === 'production' ? '.' : '',
};

export default nextConfig;
