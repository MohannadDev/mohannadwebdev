import { motion } from "framer-motion";
import HoverText from "../UI/HoverText";
import StarBorder from "../UI/StarBorder";

export default function ContactDetails({
  closeContact,
  onAnimationComplete
}: {
  closeContact: () => void;
  onAnimationComplete: () => void;
}) {
  // Define animation variants
  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  const panelVariants = {
    initial: { opacity: 0, x: "100%" },
    animate: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        type: "tween", 
        duration: 0.3, 
        ease: "easeInOut" 
      } 
    },
    exit: { 
      opacity: 0, 
      x: "100%", 
      transition: { 
        type: "tween", 
        duration: 0.3, 
        ease: "easeInOut" 
      } 
    }
  };

  return (
    <motion.div
      className="fixed z-30 w-screen h-screen bg-transparent backdrop-blur-lg"
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={closeContact}
      onAnimationComplete={(definition) => {
        if (definition === "exit") {
          onAnimationComplete();
        }
      }}
    >
      <motion.div
        className="fixed top-0 right-0 h-screen bg-[#1a1a1a] md:w-[70vw] w-[98vw]"
        variants={panelVariants}
        initial="initial"
        animate="animate"
        exit="exit"
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
            <h2 className="mb-12 text-3xl font-light leading-tight tracking-wide text-gray-300 md:text-5xl">
              Ready to shape your next digital success? Let&apos;s chat.
            </h2>
            <StarBorder
              as="button"
              btnClassName="hover:opacity-90 transition-colors duration-600"
              speed="5s"
            >
              <a
                href="mailto:mohannadwebdev@gmail.com?subject=Collaboration%20Opportunity&body=I%20recently%20discovered%20your%20profile%20and%20was%20really%20impressed%20by%20your%20work.%20I%20have%20a%20project%20in%20mind%20and%20would%20greatly%20appreciate%20your%20expertise%20and%20insights.%0A%0ACould%20we%20schedule%20a%20time%20to%20chat%3F"
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
              </a>
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
                  href="mailto:mohannadwebdev@gmail.com?subject=Collaboration%20Opportunity&body=I%20recently%20discovered%20your%20profile%20and%20was%20really%20impressed%20by%20your%20work.%20I%20have%20a%20project%20in%20mind%20and%20would%20greatly%20appreciate%20your%20expertise%20and%20insights.%0A%0ACould%20we%20schedule%20a%20time%20to%20chat%3F"
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
                  href="mailto:mohannadwebdev@gmail.com?subject=Collaboration%20Opportunity&body=I%20recently%20discovered%20your%20profile%20and%20was%20really%20impressed%20by%20your%20work.%20I%20have%20a%20project%20in%20mind%20and%20would%20greatly%20appreciate%20your%20expertise%20and%20insights.%0A%0ACould%20we%20schedule%20a%20time%20to%20chat%3F"
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
