# Mohannad - Creative Full-Stack Developer Portfolio

A modern, responsive portfolio website built with Next.js, React, TypeScript, and Tailwind CSS showcasing my projects, skills, and experience.

## Features

- **Modern UI/UX Design**: Clean, responsive interface with smooth animations
- **Optimized Performance**: Fast loading times with Next.js App Router
- **Interactive Elements**: Engaging user interactions using Framer Motion
- **Responsive Design**: Seamless experience across all devices
- **Dark Mode Support**: Beautiful light and dark themes
- **SEO Optimized**: Best practices for search engine visibility
- **Analytics Integration**: Performance and visitor tracking

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Font Optimization**: Next.js Font Optimization with Google Fonts
- **Deployment**: [Vercel](https://vercel.com)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/MohannadDev/portfolio.git
   cd portfolio
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following content:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-8GF7F7BCLY
   ```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── Assets/         # Local assets
│   ├── components/     # Reusable components
│   │   ├── Navbar/     # Navigation components
│   │   └── UI/         # UI components
│   ├── context/        # React context providers
│   └── lib/            # Utility functions
├── .env.local          # Environment variables (create this)
└── next.config.ts      # Next.js configuration
```

## Deployment

The site is automatically deployed to Vercel on pushes to the main branch.

## Contact

For questions or feedback, feel free to reach out:

- GitHub: [MohannadDev](https://github.com/MohannadDev)
- Website: [mohannadwebdev.vercel.app](https://mohannadwebdev.vercel.app)
