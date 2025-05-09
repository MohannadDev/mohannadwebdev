import { motion } from "framer-motion";
import HoverText from "../UI/HoverText";
import StarBorder from "../UI/StarBorder";

export default function ContactDetails({
  closeContact,
}: {
  closeContact: () => void;
}) {
  return (
    <motion.div
      className="fixed z-30 w-screen h-screen bg-transparent backdrop-blur-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={closeContact}
    >
      <motion.div
        className="fixed top-0 right-0 h-screen bg-[#1a1a1a] md:w-[70vw] w-[98vw]"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-between h-full p-10 text-gray-400 md:p-12">
          <div className="flex justify-end mb-4">
            <span
              className="transition-colors duration-300 cursor-pointer text-md hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                closeContact();
              }}
            >
              X CLOSE
            </span>
          </div>

          {/* Main content */}
          <div className="flex-grow">
            <h2 className="mb-12 text-xl font-light leading-tight tracking-wide text-gray-300 md:text-5xl">
              Ready to shape your next digital success? Let&apos;s chat.
            </h2>
            <StarBorder
              as="button"
              btnClassName="hover:opacity-90 transition-colors duration-600"
              speed="5s"
            >
              <a
                href="mailto:mohannadwebdev@gmail.com"
                className="flex items-center justify-center"
              >
                <span className="mr-2 highlight ">
                  LET&apos;S TALK
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="rotate-[-45deg]"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>{" "}
            </StarBorder>
          </div>

          <div className="pt-6 mt-auto border-t border-gray-500">
            <div className="grid grid-cols-2 gap-4 text-sm tracking-wide">
              <div className="space-y-2">
              <a
                  href="https://github.com/MohannadDev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors duration-300 hover:text-white"
                >
                  <HoverText
                    text="GITHUB"
                    variant="from-cursor"
                    baseColor="var(--color-textMuted)"
                    hoverColor="var(--color-textHighlight)"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohannaddev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors duration-300 hover:text-white"
                >
                  <HoverText
                    text="LINKEDIN"
                    variant="from-cursor"
                    baseColor="var(--color-textMuted)"
                    hoverColor="var(--color-textHighlight)"
                  />
                </a>

                <a
                  href="mailto:mohannadwebdev@gmail.com"
                  className="block transition-colors duration-300 hover:text-white"
                >
                  <HoverText
                    text="EMAIL"
                    variant="from-cursor"
                    baseColor="var(--color-textMuted)"
                    hoverColor="var(--color-textHighlight)"
                  />
                </a>
              </div>
              <div className="text-right">
                <a
                  href="mailto:mohannadwebdev@gmail.com"
                  className="transition-colors duration-300 hover:text-white"
                >
                  <HoverText
                    text="mohannadwebdev@gmail.com"
                    variant="from-cursor"
                    baseColor="var(--color-textMuted)"
                    hoverColor="var(--color-textHighlight)"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
