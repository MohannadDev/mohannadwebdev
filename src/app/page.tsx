"use client";

import SplitText from "@/components/UI/SplitText";
import AnimatedText from "@/components/UI/AnimatedText";
import dynamic from "next/dynamic";
import StarBorder from "@/components/UI/StarBorder";
import { motion } from "framer-motion";
import Link from "next/link";
import ScrollFloat from "@/components/UI/ScrollFloat";
import { useContext } from "react";
import { ContactContext } from "@/context/ContactContext";
import { Step } from "@/components/UI/Steper";
import { BackgroundBeams } from "@/components/UI/BackgroundBeams";
import Projects from "@/components/UI/Projects";
import { SkillsFlow } from "@/components/UI/SkillsFlow";

const DynamicStepper = dynamic(() => import("@/components/UI/Steper"), {
  loading: () => (
    <div className="flex justify-center items-center py-8 w-full">
      <motion.div
        className="flex flex-col gap-2 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="overflow-hidden w-40 h-1 rounded bg-white/10">
          <motion.div
            className="h-full bg-white/40"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </div>
  )
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
        delay: 0.2
      }
    }
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1, ease: "easeIn" }
    }
  };
  return (
    <>
      <section className="Hero flex flex-col items-center justify-center min-h-screen bg-bgDark pt-[70px] md:pt-[80px] text-white relative overflow-hidden">
        <div className="overflow-hidden absolute inset-0 w-full h-full">
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
            Front-End Developer & <b className="highlight"> Next Enthusiast</b>
          </motion.p>

          <AnimatedText
            text="I craft clean, lightning-fast web experiences with Next.js, React, and modern CSS—whether it's a single-page landing site or a complex data dashboard. Share your ambitions, and"
            highlightedText="we'll craft the web solution to match."
            className="justify-start mb-6 md:text-xl"
            staggerDuration={0.04}
          />
          <motion.div
            className="flex z-0 gap-4 justify-center items-center"
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
            <Link href="#Projects">
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
        className="z-1 relative flex items-center justify-center min-h-[80vh] bg-black py-16 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl md:px-8">
          <div className="flex flex-col gap-10 items-center md:flex-row">
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
                  onClick={toggleContact}
                  style={{
                    transform: "scale(1.01)"
                  }}
                >
                  Let&apos;s Talk
                </StarBorder>
              </motion.div>
            </div>

            <motion.div
              className="flex flex-1 justify-center items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="relative p-4 w-full max-w-md aspect-square">
                <div className="absolute inset-0 rounded-xl bg-black/10"></div>

                <div className="absolute inset-2 border-[6px] border-white/10 rounded-lg z-10"></div>

                <div
                  className="overflow-hidden relative z-0 w-full h-full rounded-lg shadow-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #8B5A2B 0%, #A67C52 100%)",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: "black"
                    }}
                  ></div>
                  <div className="flex absolute inset-0 justify-center items-center text-xl font-medium tracking-wide text-white/30">
                    Image Coming Soon
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="overflow-hidden relative py-6 text-white bg-black">
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
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Technologies and tools I use to bring Ideas to life
            </p>
          </motion.div>

          <motion.div
            className="mx-auto w-full max-w-4xl"
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

      {/* Projects Section  */}
      <Projects limit={3} showViewAll={true} />

      <section
        id="HowItWorks"
        className="flex justify-center pb-8 text-white md:pb-16 bg-bgDark"
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
            onFinalStepCompleted={() => null}
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
                strong and <b className="highlight">aligned with your vision.</b>
              </p>
            </Step>
            <Step>
              <h2 className="stepHeading">2. Wireframing & Prototyping</h2>
              <p>
                Before any code is written, I design the layout using tools like
                Figma to <b className="highlight">visualize the structure and user flow</b> , allowing
                for feedback and early adjustments.
              </p>
            </Step>
            <Step>
              <h2 className="stepHeading">3. UI Design Integration</h2>
              <p>
                3. I excel in utilizing advanced front-end techniques to create
                responsive, user-friendly interfaces. For projects that demand
                extensive research and branding, collaborating with a UI/UX
                designer<b className="highlight"> can enhance the results. </b> However,{" "}
                <b className="highlight">I&apos;m fully equipped to deliver exceptional designs</b>{" "}
                that perform flawlessly across all devices on my own.
              </p>
            </Step>
            <Step>
              <h2 className="stepHeading">4. Modular & Scalable Code</h2>
              <p>
                I develop using modern technologies like React and Tailwind CSS,  
                <b className="highlight"> focusing on reusable components, scalability, and
                  maintainability.
                </b>
              </p>
            </Step>
            <Step>
              <h2 className="stepHeading">5. Cross-Browser Testing</h2>
              <p>
                Every project is tested across multiple devices and browsers to
                <b className="highlight"> ensure it works smoothly for all users</b>, regardless of
                how they access it.
              </p>
            </Step>
            <Step>
              <h2 className="stepHeading">6. Deployment & Handover</h2>
              <p>
                I deploy the site to <b className="highlight"> fast </b>, secure platforms like Vercel and
                provide{" "}
                support for future updates.
              </p>
            </Step>
          </DynamicStepper>
        </div>
      </section>
    </>
  );
}
