import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/index";
import Footer from "@/components/Footer";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import ClickSpark from "../components/UI/ClickSpark";
import { ContactProvider } from "@/context/ContactContext";
import ContactDetailsWrapper from "@/components/Navbar/ContactDetailsWrapper";

export const metadata: Metadata = {
  title: "Mohannad - Creative Full-Stack Developer & UI/UX Designer",
  description:
    "Portfolio showcasing innovative web development projects, modern designs, and expertise in Next.js, React, and TypeScript. View my latest work and get in touch for collaborations.",
  keywords: [
    "web development",
    "frontend developer",
    "React developer",
    "Next.js",
    "UI/UX design",
    "portfolio",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "Mohannad", url: "https://github.com/MohannadDev" }],
  creator: "Mohannad",
  publisher: "Mohannad",
  metadataBase: new URL("https://mohannadwebdev.vercel.app"),
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  openGraph: {
    type: "website",
    title: "Mohannad - Creative Full-Stack Developer & UI/UX Designer",
    description:
      "Portfolio showcasing innovative web development projects, modern designs, and expertise in Next.js, React, and TypeScript.",
    url: "https://mohannadwebdev.vercel.app/",
    siteName: "Mohannad's Portfolio",
    images: [
      {
        url: "/images/portfolio-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Mohannad - Creative Developer Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohannad - Creative Full-Stack Developer & UI/UX Designer",
    description:
      "Portfolio showcasing innovative web development projects and modern designs",
    images: ["/images/portfolio-preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  category: "Technology",
};

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-heading",
});
const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-body",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
    >
      <body className="flex flex-col min-h-screen bg-bg-white dark:bg-bg-dark">
        <ContactProvider>
          <ClickSpark
            sparkColor="#fff"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            <Navbar />
            <ContactDetailsWrapper />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ClickSpark>
        </ContactProvider>
      </body>
    </html>
  );
}
