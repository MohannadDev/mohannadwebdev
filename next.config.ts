import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: process.env.NODE_ENV === 'production'
  },
  // Optimize for single-page application
  trailingSlash: true, // Ensures consistent URLs
  output: 'export', // Static HTML export for single-page apps
  // Disable server components as they're not needed for a single-page app
  experimental: {
    // Enables better tree-shaking for reduced bundle size
    optimizeCss: true,
  },
  // Improve asset loading - use / for production to ensure paths are correct
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
};

export default nextConfig;
