"use client";

import SplitText from "@/components/UI/SplitText";
import AnimatedText from "@/components/UI/AnimatedText";
import dynamic from "next/dynamic";
import StarBorder from "@/components/UI/StarBorder";
import { motion } from "framer-motion";
import Link from "next/link";
import ScrollFloat from "@/components/UI/ScrollFloat";
import { useContext, useEffect, useState } from "react";
import { ContactContext } from "@/context/ContactContext";
import { Step } from "@/components/UI/Steper";


// Create a client-only wrapper component to isolate hydration
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <>{children}</> : null;
};

const DynamicThreads = dynamic(() => import("@/components/UI/Threads"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] flex items-center justify-center bg-bgDark">
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="relative w-16 h-16">
          <div className="absolute top-0 w-full h-full border-4 rounded-full border-t-white border-l-transparent border-r-transparent border-b-transparent animate-spin"></div>
          <div className="absolute top-0 w-full h-full border-4 rounded-full border-t-transparent border-l-transparent border-r-white border-b-transparent animate-spin animation-delay-500"></div>
        </div>
        <span className="text-sm text-white/75">Loading visual experience</span>
      </motion.div>
    </div>
  ),
});

const DynamicStepper = dynamic(() => import("@/components/UI/Steper"), {
  loading: () => (
    <div className="flex items-center justify-center w-full py-8">
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-40 h-1 overflow-hidden rounded bg-white/10">
          <motion.div
            className="h-full bg-white/40"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </div>
  ),
});

export default function Home() {
  const { toggleContact } = useContext(ContactContext);

  const buttonsFadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.4,
        delay: 0.2,
      },
    },
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1, ease: "easeIn" },
    },
  };
  return (
    <>
      <section className="Hero flex flex-col items-center justify-center min-h-screen bg-bgDark pt-[70px] md:pt-[80px] text-white">
        <div className="flex justify-center flex-col px-4 mx-auto md:max-w-[90vw] mt-10 md:mt-16">
          <SplitText
            text="Hi, I'm Mohannad."
            className="text-3xl md:text-6xl highlight"
            delay={70}
            animationFrom={{ opacity: 0, transform: "translateY(50px)" }}
            animationTo={{ opacity: 1, transform: "translateY(0)" }}
            easing="easeOutQuint"
            threshold={1}
            rootMargin="0px"
            textAlign="center"
          />
          <motion.p
            className="m-6 mt-4 font-bold text-center md:text-xl"
            variants={buttonsFadeInUpVariants}
            initial="hidden"
            animate="show"
          >
            Front-End Developer & Next Enthusiast
          </motion.p>

          <AnimatedText
            text="I craft clean, lightning-fast web experiences with Next.js, React, and modern CSS—whether it's a single-page landing site or a complex data dashboard. Share your ambitions, and"
            highlightedText="we'll craft the web solution to match."
            className="justify-start mb-6 md:text-xl "
            staggerDuration={0.04}
          />
          <motion.div
            className="flex items-center justify-center gap-4 "
            variants={buttonsFadeInUpVariants}
            initial="hidden"
            animate="show"
          >
            <StarBorder
              as="button"
              btnClassName="hover:opacity-90 transition-colors duration-600 text-white"
              speed="5s"
              onClick={toggleContact}
            >
              Let&apos;s Talk
            </StarBorder>
            <Link href="/projects">
              <motion.button
                className="custom-class px-4 py-[16px] rounded-[20px] bg-transparent 
                      text-shadow-white 
                      hover:text-white
                      transition-colors duration-600 "
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Projects
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <div className="w-full h-[300px]  relative m-0 p-0">
          <ClientOnly>
            <div className="hidden md:block">
              <DynamicThreads
                amplitude={0.6}
                distance={0}
                enableMouseInteraction={true}
                width={"100vw"}
                height={"70vh"}
              />
            </div>
            <div className="md:hidden">
              {" "}
              <DynamicThreads
                amplitude={0.6}
                distance={0}
                enableMouseInteraction={true}
                width={"100vw"}
                height={"40vh"}
              />
            </div>
          </ClientOnly>
        </div>
      </section>

      {/* About Me Section */}
      <section className="relative flex items-center justify-center min-h-[80vh] bg-black py-16 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
        
        <div className="container relative z-10 px-4 mx-auto max-w-7xl md:px-8">
          <div className="flex flex-col items-center gap-10 md:flex-row">
            <div className="flex-1 space-y-8">
              <motion.h2 
                className="text-4xl font-bold md:text-6xl" 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <span className="block">I&apos;m a web</span>
                <span className="highlight">developer & designer</span>
              </motion.h2>
              
              <motion.div
                className="space-y-6 text-lg md:text-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <p>
                  Based in Egypt, <span className="highlight"> the land of the Pharaohs </span> , I am a skilled web developer and designer specializing in <span className="highlight">Frontend Engineering</span>.
                </p>
                <p>
                  I create high-quality web experiences through <span className="highlight">clean code</span> and <span className="highlight">thoughtful design</span>.
                </p>
                <p>
                  Let&apos;s collaborate to <span className="highlight">elevate your online presence!</span>
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <StarBorder
                  as="button"
                  btnClassName="hover:opacity-80 transition-colors duration-600 text-white font-bold text-xl py-4 px-8"
                  speed="5s"
                  onClick={toggleContact}
                  style={{
                    transform: 'scale(1.01)',
                  }}
                >
                  Let&apos;s Talk
                </StarBorder>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex items-center justify-center flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full max-w-md p-4 aspect-square">
                <div className="absolute inset-0 bg-black/10 rounded-xl"></div>
                
                <div className="absolute inset-2 border-[6px] border-white/10 rounded-lg z-10"></div>
                
                <div 
                  className="relative z-0 w-full h-full overflow-hidden rounded-lg shadow-xl"
                  style={{
                    background: "linear-gradient(135deg, #8B5A2B 0%, #A67C52 100%)",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  <div 
                    className="absolute inset-0" 
                    style={{
                     backgroundColor: "black"
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xl font-medium tracking-wide text-white/30">
                    Image Coming Soon
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="HowItWorks"
        className="flex justify-center pb-8 text-white md:pb-16 bg-bgDark "
      >
        <div className="container">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            textClassName="text-3xl sm:text-5xl sm:px-[10%] text-textHighlight p-4 text-center"
          >
            How It Works!
          </ScrollFloat>
          <DynamicStepper
            initialStep={1}
            onStepChange={(step) => {
              console.log(step);
            }}
            onFinalStepCompleted={() => console.log("All steps completed!")}
            backButtonText="Previous"
            nextButtonText="Next"
            stepCircleContainerClassName="bg-bgDark border-neutral-700"
            stepContainerClassName="bg-bgDark"
            contentClassName="bg-bgDark"
            footerClassName="bg-bgDark"
          >
            <Step>
              <h2 className="stepHeading">1. Discovery</h2>
              <p>
                I begin by understanding your project goals, audience, and
                requirements. This ensures the foundation of the project is
                strong and aligned with your vision.
              </p>
            </Step>
            <Step>
              <h2 className="mb-2 text-xl font-bold">
                2. Wireframing & Prototyping
              </h2>
              <p>
                Before any code is written, I design the layout using tools like
                Figma to visualize the structure and user flow, allowing for
                feedback and early adjustments.
              </p>
            </Step>
            <Step>
              <h2 className="mb-2 text-xl font-bold">
                3. UI Design Integration
              </h2>
              <p>
                3. I excel in utilizing advanced front-end techniques to create
                responsive, user-friendly interfaces. For projects that demand
                extensive research and branding, collaborating with a UI/UX
                designer<b> can enhance the results. </b> However,{" "}
                <b>I&apos;m fully equipped to deliver exceptional designs</b>{" "}
                that perform flawlessly across all devices on my own.
              </p>
            </Step>
            <Step>
              <h2 className="mb-2 text-xl font-bold">
                4. Modular & Scalable Code
              </h2>
              <p>
                I develop using modern technologies like React and Tailwind CSS,
                focusing on reusable components, scalability, and
                maintainability.
              </p>
            </Step>
            <Step>
              <h2 className="mb-2 text-xl font-bold">
                5. Cross-Browser Testing
              </h2>
              <p>
                Every project is tested across multiple devices and browsers to
                ensure it works smoothly for all users, regardless of how they
                access it.
              </p>
            </Step>
            <Step>
              <h2 className="mb-2 text-xl font-bold">
                6. Deployment & Handover
              </h2>
              <p>
                I deploy the site to fast, secure platforms like Vercel and
                provide helpful documentation or support for future updates.
              </p>
            </Step>
          </DynamicStepper>
        </div>
      </section>
 
    </>
  );
}
