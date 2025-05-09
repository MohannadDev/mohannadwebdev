"use client";

import SplitText from "@/components/UI/SplitText";
// import HoverText from "@/components/UI/HoverText";
import AnimatedText from "@/components/UI/AnimatedText";
import Threads from "@/components/UI/Threads";
import StarBorder from "@/components/UI/StarBorder";
import { motion } from "framer-motion"; // Import motion
import Stepper, { Step } from "@/components/UI/Steper";
// import Image from "next/image";
import DecryptedText from "@/components/UI/Decrypted";
// import { useContact } from "@/context/ContactContext";

export default function Home() {
  // const { toggleContact } = useContact();

  const buttonsFadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 1,
        damping: 1,
        mass: 0.5,
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center min-h-screen bg-bgDark pt-[70px] md:pt-[80px] text-white">
        <div className="flex justify-center flex-col px-4 mx-auto md:max-w-[90vw] mt-10 md:mt-16">
          <SplitText
            text="Hi, I’m Mohannad."
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
            className="mb-6 text-left md:text-xl"
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
              // onClick={toggleContact}


            >
              Let&apos;s Talk
            </StarBorder>
            <button
              className="custom-class px-4 py-[16px] rounded-[20px]  bg-transparent 
                     text-shadow-white 
                     hover:text-white
                     transition-colors duration-600 "
            >
              Projects
            </button>
          </motion.div>
        </div>

        <div className="w-full h-[300px] relative m-0 p-0">
          <Threads 
            amplitude={1} 
            distance={0} 
            enableMouseInteraction={true} 
            width={"100vw"}
            height={"70vh"}
          />
        </div>
      </section>
      <section>
        <div style={{ marginTop: "4rem" }}>
          <DecryptedText
            text="Customize me"
            speed={100}
            maxIterations={20}
            characters="ABCD1234!?"
            className="revealed"
            parentClassName="all-letters"
            encryptedClassName="encrypted"
          />
        </div>
        <Stepper
          initialStep={1}
          onStepChange={(step) => {
            console.log(step);
          }}
          onFinalStepCompleted={() => console.log("All steps completed!")}
          backButtonText="Previous"
          nextButtonText="Next"
        >
          <Step>
            <h2 className="mb-2 text-xl font-bold">1. Discovery</h2>
            <p>
              I begin by understanding your project goals, audience, and
              requirements. This ensures the foundation of the project is strong
              and aligned with your vision.
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
            <h2 className="mb-2 text-xl font-bold">3. UI Design Integration</h2>
            <p>
              I bring designs to life using modern front-end techniques. While I
              can handle UI design for responsive and user-friendly interfaces,
              I recommend collaborating with a dedicated UI/UX designer for
              projects needing extensive user research and branding. However, if
              you&apos;re on a budget, I can still deliver high-quality designs that
              work well across devices.
            </p>
          </Step>
          <Step>
            <h2 className="mb-2 text-xl font-bold">
              4. Modular & Scalable Code
            </h2>
            <p>
              I develop using modern technologies like React and Tailwind CSS,
              focusing on reusable components, scalability, and maintainability.
            </p>
          </Step>
          <Step>
            <h2 className="mb-2 text-xl font-bold">5. Cross-Browser Testing</h2>
            <p>
              Every project is tested across multiple devices and browsers to
              ensure it works smoothly for all users, regardless of how they
              access it.
            </p>
          </Step>
          <Step>
            <h2 className="mb-2 text-xl font-bold">6. Deployment & Handover</h2>
            <p>
              I deploy the site to fast, secure platforms like Vercel and
              provide helpful documentation or support for future updates.
            </p>
          </Step>
        </Stepper>
      </section>
    </>
  );
}
