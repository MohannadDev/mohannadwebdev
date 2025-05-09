import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/index";
import Footer from "@/components/Footer";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import ClickSpark from "../components/UI/ClickSpark";
import { ContactProvider } from "@/context/ContactContext";
import ContactDetailsWrapper from "@/components/Navbar/ContactDetailsWrapper";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A showcase of my projects and skills",
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
