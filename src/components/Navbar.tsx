"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// NavItem component 
type NavItemProps = {
  path: string;
  name: string;
  onClick?: () => void;
  isMobile?: boolean;
};

const NavItem = ({ path, name, onClick, isMobile = false }: NavItemProps) => {
  
  return (
    <motion.div
      className={`relative ${isMobile ? 'w-full' : 'px-1'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Link 
        href={path} 
        onClick={onClick}
        className="block px-3 py-2 font-medium rounded-md text-text-dark dark:text-text-white hover:text-primary dark:hover:text-primary"
      >
        {name}
      </Link>
   
    </motion.div>
  );
};

// NavMenu component
type NavMenuProps = {
  items: Array<{ name: string; path: string }>;
  isMobile: boolean;
  isOpen?: boolean;
  onItemClick?: () => void;
};

const NavMenu = ({ items, isMobile, isOpen, onItemClick }: NavMenuProps) => {
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
     
          <motion.div 
            className="fixed top-0 right-0 z-50 w-4/5 h-screen pt-20 bg-bgLight"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col justify-center p-8 h-8/10">
              {items.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <NavItem 
                    path={item.path} 
                    name={item.name} 
                    onClick={onItemClick}
                    isMobile={true} 
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
  
  return (
    <div className="items-center hidden space-x-1 md:flex">
      {items.map((item) => (
        <NavItem 
          key={item.path} 
          path={item.path} 
          name={item.name} 
        />
      ))}
    </div>
  );
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Backdrop overlay */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed z-40 w-screen h-screen md:hidden backdrop-blur-md bg-[#e1dcd533]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    
      <motion.nav
        className="fixed top-0 z-50 w-full "
        initial={{ y: -100 }}
        animate={{ y: 0 }}
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
              <p
                className="px-2"
                style={{ color: "var(--color-textHighlight)" }}
              >
                Mohannad
              </p>
            </motion.div>

            {/* Desktop menu */}
            <NavMenu items={navItems} isMobile={false} />

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden z-100">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 focus:outline-none rounded-lg ${isMenuOpen ? 'bg-bgDark z-50' : ''}`}
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
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

     
      </motion.nav>
      <NavMenu 
          items={navItems} 
          isMobile={true} 
          isOpen={isMenuOpen} 
          onItemClick={() => setIsMenuOpen(false)} 
        />
    </>
  );
}
