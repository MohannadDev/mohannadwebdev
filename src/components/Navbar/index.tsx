"use client";

import { useState, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavMenu } from "./menu";
import Link from "next/link";
import { ContactContext } from "@/context/ContactContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleContact } = useContext(ContactContext);

  const navItems: Array<{
    name: string;
    path: string;
    variant: "left-to-right" | "center-outward" | "random" | "from-cursor";
  }> = [
    { name: "Home", path: "/", variant: "from-cursor" },
    { name: "About", path: "/#About", variant: "from-cursor" },
    { name: "Projects", path: "/#Projects", variant: "from-cursor" },
    { name: "Skills", path: "/#Skills", variant: "from-cursor" },
    { name: "How It Works", path: "/#HowItWorks", variant: "from-cursor" },
  ];

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const menuOverlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 z-10 w-full bg-bgDark backdrop-blur-md "
        initial={{ opacity: 0, y: -70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div>
              <Link href="/" className="flex items-center" aria-label="Go to homepage">
                <svg
                  className="w-9 h-9"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"></path>
                </svg>
              </Link>
            </motion.div>

            <div className="items-center justify-center hidden md:flex">
              <NavMenu items={navItems} isMobile={false} />
            </div>

            <div className="hidden md:block">
              <motion.button
                onClick={toggleContact}
                className="px-4 py-2 text-white transition-colors rounded-md hover:opacity-90 bg-btnLight"
                whileTap={{ scale: 0.95 }}
                aria-label="Contact Me"
              >
                Let&apos;s Talk
              </motion.button>
            </div>

            <div className="flex items-center md:hidden z-100">
              {!isMenuOpen && (
                <>
                  <button
                    onClick={toggleContact}
                    className="px-3 py-1 mx-3 text-sm text-white rounded-md bg-btnLight hover:opacity-90"
                    aria-label="Contact Me"
                  >
                    Let&apos;s talk
                  </button>
                  <button
                    onClick={toggleMenu}
                    className="p-2 text-white rounded-md focus:outline-none"
                    aria-label="Open navigation menu"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                      ></path>
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence mode="wait" initial={false}>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu-overlay"
            className="fixed z-20 w-screen h-screen bg-transparent backdrop-blur-lg"
            variants={menuOverlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={closeMenu}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex items-center justify-center h-full">
              <button
                onClick={closeMenu}
                className="absolute text-white top-5 right-5"
                aria-label="Close navigation menu"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              <NavMenu
                items={navItems}
                isMobile={true}
                onItemClick={closeMenu}
                onClose={closeMenu}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
