"use client";

import React, { useContext, useCallback, memo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ContactContext } from "@/context/ContactContext";
import { Step } from "@/components/UI/Steper";

// Lazy load components that are not immediately visible or are heavy
const SplitText = dynamic(() => import("@/components/UI/SplitText"), {
  ssr: false,
  loading: () => <div className="h-12 rounded bg-white/5 animate-pulse"></div>
});

const AnimatedText = dynamic(() => import("@/components/UI/AnimatedText"), {
  ssr: false,
  loading: () => <div className="h-24 rounded bg-white/5 animate-pulse"></div>
});

const StarBorder = dynamic(() => import("@/components/UI/StarBorder"), {
  ssr: false
});

const ScrollFloat = dynamic(() => import("@/components/UI/ScrollFloat"), {
  ssr: false
});

const BackgroundBeams = dynamic(() => import("@/components/UI/BackgroundBeams").then(mod => mod.BackgroundBeams), {
  ssr: false
});

const Projects = dynamic(() => import("@/components/UI/Projects"), {
  ssr: true,
  loading: () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="h-96 bg-white/5 rounded-xl animate-pulse"></div>
      ))}
    </div>
  )
});

const SkillsFlow = dynamic(() => import("@/components/UI/SkillsFlow").then(mod => mod.SkillsFlow), {
  ssr: false,
  loading: () => <div className="h-40 rounded bg-white/5 animate-pulse"></div>
});

const DynamicStepper = dynamic(() => import("@/components/UI/Steper"), {
  ssr: false,
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

// Define props interface for the HeroButton component
interface HeroButtonProps {
  onClick: () => void;
}

// Memoize static components to prevent unnecessary re-renders
const MemoizedHeroButton = memo(function HeroButton({ onClick }: HeroButtonProps) {
  return (
    <StarBorder
      as="button"
      btnClassName="hover:opacity-90 transition-colors duration-600 text-white"
      speed="5s"
      onClick={onClick}
    >
      Let&apos;s Talk
    </StarBorder>
  );
});

export default function Home() {
  const { toggleContact } = useContext(ContactContext);

  // Use useCallback for event handlers to prevent function recreation on render
  const handleContactClick = useCallback(() => {
    toggleContact();
  }, [toggleContact]);

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
      <section className="Hero flex flex-col items-center justify-center min-h-screen bg-bgDark pt-[70px] md:pt-[80px] text-white relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <BackgroundBeams />
        </div>

        <div className="flex justify-center flex-col px-4 mx-auto md:max-w-[90vw] mt-10 md:mt-16 relative z-10">
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
            <MemoizedHeroButton onClick={handleContactClick} />
            <Link href="#projects">
              <motion.button
                className="custom-class px-4 py-[16px] rounded-[20px] bg-transparent underline
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
      </section>
  
      <section
        id="About"
        className="z-20 relative flex items-center justify-center min-h-[80vh] bg-black py-16 text-white overflow-hidden"
      >
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
                  Based in Egypt,{" "}
                  <span className="highlight"> the land of the Pharaohs </span>{" "}
                  , I am a skilled web developer and designer specializing in{" "}
                  <span className="highlight">Frontend Engineering</span>.
                </p>
                <p>
                  I create high-quality web experiences through{" "}
                  <span className="highlight">clean code</span> and{" "}
                  <span className="highlight">thoughtful design</span>.
                </p>
                <p>
                  Let&apos;s collaborate to{" "}
                  <span className="highlight">
                    elevate your online presence!
                  </span>
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
                  onClick={handleContactClick}
                  style={{
                    transform: "scale(1.01)",
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
                    background:
                      "linear-gradient(135deg, #8B5A2B 0%, #A67C52 100%)",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: "black",
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
      <section className="relative py-6 overflow-hidden text-white bg-black">
        <div className="container px-4 mx-auto">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              My <span className="highlight">Tech Stack</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-400">
              Technologies I use to craft amazing digital experiences
            </p>
          </motion.div>

          <motion.div
            className="w-full max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div id="Skills">
              <SkillsFlow />
            </div>
          </motion.div>
        </div>
      </section>
      
      <section id="Projects" className="relative z-20 py-16 text-white bg-black">
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              <span className="highlight">Featured</span> Projects
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-400">
              Explore some of my recent work showcasing my skills and expertise
              in web development.
            </p>
          </motion.div>
          <Projects limit={3} showViewAll={true} />
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
            onStepChange={() => {}}
            onFinalStepCompleted={() => {}}
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
