"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavMenu } from "./menu";
import AnimatedText from "../AnimatedText";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Backdrop overlay */}
      {/* {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed z-40 w-screen h-screen bg-transparent md:hidden backdrop-blur-xl"
          onClick={() => setIsMenuOpen(false)}
        />
      )} */}

      <motion.nav
        className="fixed top-0 w-full"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                ></path>
              </svg>
              <AnimatedText text="Mohannad" className="text-textHighlight" />
            </motion.div>

            {/* Desktop menu */}
            <NavMenu items={navItems} isMobile={false} />

            {/* Mobile menu button - hamburger only (shown when menu is closed) */}
            {!isMenuOpen && (
              <div className="flex items-center md:hidden z-100">
                <motion.button
                  onClick={toggleMenu}
                  className="p-2 rounded-lg focus:outline-none"
                  whileTap={{ scale: 0.95 }}
                  style={{ zIndex: 60 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: "var(--color-textHighlight)" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Backdrop with mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed z-20 w-screen h-screen bg-transparent backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={closeMenu}
          >
            <NavMenu
              items={navItems}
              isMobile={true}
              isOpen={isMenuOpen}
              onItemClick={closeMenu}
              onClose={closeMenu}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
