# Single-Page App Deployment Guide

This document provides instructions for deploying your single-page Next.js portfolio application.

## Build Configuration

This application is configured as a single-page application (SPA) using Next.js with static export. Key configurations:

- `output: 'export'` in next.config.ts generates static HTML/CSS/JS files
- `trailingSlash: true` ensures consistent URL formats
- Google Analytics is configured in both App Router and Pages Router for compatibility

## Deployment Steps

### Local Build

1. Create `.env.local` file in the project root with your environment variables:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-8GF7F7BCLY
   ```

2. Install dependencies and build the project:
   ```bash
   npm install
   npm run build
   ```

3. The static site will be generated in the `out` directory

### Deployment Options

#### 1. Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Set the output directory to `out`
4. Deploy

#### 2. GitHub Pages

1. Install the gh-pages package (already included in devDependencies):
   ```bash
   npm install gh-pages --save-dev
   ```

2. Deploy using the npm script:
   ```bash
   npm run deploy
   ```

#### 3. Any Static Hosting

1. Upload the contents of the `out` directory to any static hosting provider like:
   - Netlify
   - Firebase Hosting
   - Amazon S3
   - Cloudflare Pages

## Environment Variables

For production deployments, make sure to set:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Your Google Analytics measurement ID

## SPA Routing

Since this is a single-page application, client-side routing is handled by Next.js. The `index.html` file in the public directory serves as a fallback for direct URL access on some hosting providers.

## Performance Notes

- Google Analytics is configured to track SPA navigation events
- Preconnect hints are set up for faster font loading
- Custom document and app files optimize the SPA experience
- Meta tags are configured for SEO and social sharing

## Troubleshooting

If you encounter issues with paths or assets not loading, check:

1. The `assetPrefix` in next.config.ts
2. Ensure all internal links use relative paths
3. Verify that `trailingSlash` is set to true 