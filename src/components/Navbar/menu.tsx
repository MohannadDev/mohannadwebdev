import { motion } from "framer-motion";
import Link from "next/link";
import HoverText from "../UI/HoverText";

type NavItemProps = {
  path: string;
  name: string;
  onClick?: () => void;
  isMobile?: boolean;
  variant: "left-to-right" | "center-outward" | "random" | "from-cursor";
};

export const NavItem = ({
  path,
  name,
  onClick,
  isMobile = false,
  variant,
}: NavItemProps) => {
  return (
    <motion.div
      className={`relative ${isMobile ? "w-full" : "px-1"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Link
        href={path}
        onClick={onClick}
        className="block px-3 py-2 font-medium rounded-md text-text-dark dark:text-text-white hover:text-primary dark:hover:text-primary"
      >
        <HoverText
          text={name}
          variant={variant}
          baseColor="var(--color-textMuted)"
          hoverColor="var(--color-textHighlight)"
        />
      </Link>
    </motion.div>
  );
};

type NavMenuProps = {
  items: Array<{
    name: string;
    path: string;
    variant: "left-to-right" | "center-outward" | "random" | "from-cursor";
  }>;
  isMobile: boolean;
  isOpen?: boolean;
  onItemClick?: () => void;
  onClose?: () => void;
};

export const NavMenu = ({
  items,
  isMobile,
  onItemClick,
  onClose,
}: NavMenuProps) => {
  if (isMobile) {
    return (
      <motion.div
        className="fixed top-0 right-0 w-4/5 h-screen pt-20 bg-white z-70"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ 
   
          type: "tween",
          duration: 0.35,
          ease: "easeOut",
          exit: { 
            duration: 0.45, 
            ease: "easeInOut"
          }
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute top-5 right-7 z-100"
          onClick={(e) => {
            e.stopPropagation(); 
            if (onClose) onClose();
          }}
        >
          <motion.button
            className="p-2 rounded-lg focus:outline-none bg-bgDark"
            whileTap={{ scale: 0.95 }}
            aria-label="Close navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: "var(--color-textHighlight)" }}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        </div>

        <div className="flex flex-col justify-center p-8 h-8/10">
          {items.map((item, i) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ 
                delay: i * 0.04,
                duration: 0.25,
                ease: "easeOut",
                exit: {
                  duration: 0.35,
                  ease: "easeInOut"
                }
              }}
            >
              <NavItem
                path={item.path}
                name={item.name}
                onClick={onItemClick}
                isMobile={true}
                variant={item.variant}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="items-center hidden space-x-1 md:flex">
      {items.map((item) => (
        <NavItem
          key={item.path}
          path={item.path}
          name={item.name}
          variant={item.variant}
        />
      ))}
    </div>
  );
};
