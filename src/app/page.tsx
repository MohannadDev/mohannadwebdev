"use client";

import SplitText from "@/components/UI/SplitText";
import dynamic from "next/dynamic";
import StarBorder from "@/components/UI/StarBorder";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { Step } from "@/components/UI/Steper";
// import { BackgroundBeams } from "@/components/UI/BackgroundBeams";
import Projects from "@/components/UI/Projects";
import { SkillsFlow } from "@/components/UI/SkillsFlow";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DynamicStepper = dynamic(() => import("@/components/UI/Steper"), {
  loading: () => (
    <div className="flex justify-center items-center py-8 w-full">
      <div className="flex flex-col gap-2 items-center">
        <div className="overflow-hidden w-40 h-1 rounded bg-white/10">
          <div className="h-full animate-pulse bg-white/40"></div>
        </div>
      </div>
    </div>
  )
});

export default function Home() {
  const [showContact, setShowContact] = useState(false);

  const handleContactToggle = () => {
    setShowContact((prev) => !prev);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".paragraph_Fade",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.8,
          stagger: 0.3,
          scrub: true
        }
      );

      gsap.fromTo(
        ".about-heading",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          delay: 0.1,
          scrollTrigger: {
            trigger: ".about-heading",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(
        ".about-paragraphs",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          scrollTrigger: {
            trigger: ".about-paragraphs",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(
        ".about-button",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          delay: 0.5,
          scrollTrigger: {
            trigger: ".about-button",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Tech Stack section animations
      gsap.fromTo(
        ".tech-stack-heading",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: ".tech-stack-heading",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(
        ".tech-stack-content",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: ".tech-stack-content",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Hero buttons animation
      gsap.fromTo(
        ".hero-buttons",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          delay: 0.2,
          ease: "power3.out"
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="Hero flex flex-col items-center justify-center min-h-screen bg-bgDark pt-[70px] md:pt-[80px] text-white relative overflow-hidden">
        <div className="overflow-hidden absolute inset-0 w-full h-full">
          {/* <BackgroundBeams /> */}
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
          <p className="m-6 mt-4 font-bold text-center md:text-xl paragraph_Fade">
            Front-End Developer &{" "}
            <b className="highlight"> Next.JS Enthusiast</b>
          </p>
          <p className="mb-6 text-center md:text-xl paragraph_Fade">
            I craft clean, lightning-fast web experiences with Next.js, React,
            and modern CSS—whether it&apos;s a single-page landing site or a
            complex data dashboard. Share your ambitions, and we&apos;ll craft
            the web solution to match.
          </p>
          <div className="flex z-0 gap-4 justify-center items-center hero-buttons">
            <StarBorder
              as="button"
              btnClassName="hover:opacity-90 transition-colors duration-600 text-white"
              speed="5s"
              onClick={handleContactToggle}
            >
              Let&apos;s Talk
            </StarBorder>
            <Link href="#Projects">
              <button
                className="custom-class px-4 py-[16px] rounded-[20px] bg-transparent underline
                    text-shadow-white 
                    hover:text-white
                    transition-colors duration-600 hover:scale-105 active:scale-95"
              >
                Projects
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section
        id="About"
        className="relative flex items-center justify-center py-16 md:pt-24 min-h-[50vh] overflow-hidden text-white bg-black z-1"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl md:px-8">
          <div className="flex flex-col gap-10 items-center md:flex-row">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl font-bold md:text-6xl about-heading">
                <span>I&apos;m a web developer & designer</span>
              </h2>

              <div className="space-y-6 text-lg md:text-xl about-paragraphs">
                <p className="my-2">
                  Based in Egypt,{" "}
                  <span className="highlight"> the land of the Pharaohs </span>{" "}
                  , I am a skilled web developer and designer specializing in{" "}
                  <span className="highlight">Frontend Engineering</span>.
                </p>
                <p className="my-2">
                  I create high-quality web experiences through{" "}
                  <span className="highlight">clean code</span> and{" "}
                  <span className="highlight">thoughtful design</span>.
                </p>
                <p className="my-2">
                  Let&apos;s collaborate to{" "}
                  <span className="highlight">
                    elevate your online presence!
                  </span>
                </p>
              </div>

              <div className="flex justify-center about-button">
                <StarBorder
                  as="button"
                  btnClassName="hover:opacity-80 transition-colors duration-600 text-white font-bold text-xl py-4 px-8 "
                  speed="5s"
                  onClick={handleContactToggle}
                  style={{
                    transform: "scale(1.01)"
                  }}
                >
                  Let&apos;s Talk
                </StarBorder>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden relative py-6 text-white bg-black">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center tech-stack-heading">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              My <span className="highlight">Tech Stack</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Technologies and tools I use to bring Ideas to life
            </p>
          </div>

          <div className="mx-auto w-full max-w-4xl tech-stack-content">
            <div id="Skills">
              <SkillsFlow />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section  */}
      <Projects limit={3} showViewAll={true} />

      <section
        id="HowItWorks"
        className="flex justify-center p-8 text-white md:pb-16 bg-bgDark"
      >
        <div className="container">
          <SplitText
            text="How It Works!"
            className="py-8 text-xl my- md:text-4xl highlight"
            delay={70}
            animationFrom={{ opacity: 0, transform: "translateY(50px)" }}
            animationTo={{ opacity: 1, transform: "translateY(0)" }}
            easing="easeOutQuint"
            threshold={1}
            rootMargin="0px"
            textAlign="center"
          />
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
                strong and{" "}
                <b className="highlight">aligned with your vision.</b>
              </p>
            </Step>
            <Step>
              <h2 className="stepHeading">2. Wireframing & Prototyping</h2>
              <p>
                Before any code is written, I design the layout using tools like
                Figma to{" "}
                <b className="highlight">
                  visualize the structure and user flow
                </b>{" "}
                , allowing for feedback and early adjustments.
              </p>
            </Step>
            <Step>
              <h2 className="stepHeading">3. UI Design Integration</h2>
              <p>
                3. I excel in utilizing advanced front-end techniques to create
                responsive, user-friendly interfaces. For projects that demand
                extensive research and branding, collaborating with a UI/UX
                designer<b className="highlight"> can enhance the results. </b>{" "}
                However,{" "}
                <b className="highlight">
                  I&apos;m fully equipped to deliver exceptional designs
                </b>{" "}
                that perform flawlessly across all devices on my own.
              </p>
            </Step>
            <Step>
              <h2 className="stepHeading">4. Modular & Scalable Code</h2>
              <p>
                I develop using modern technologies like React and Tailwind CSS,
                <b className="highlight">
                  {" "}
                  focusing on reusable components, scalability, and
                  maintainability.
                </b>
              </p>
            </Step>
            <Step>
              <h2 className="stepHeading">5. Cross-Browser Testing</h2>
              <p>
                Every project is tested across multiple devices and browsers to
                <b className="highlight">
                  {" "}
                  ensure it works smoothly for all users
                </b>
                , regardless of how they access it.
              </p>
            </Step>
            <Step>
              <h2 className="stepHeading">6. Deployment & Handover</h2>
              <p>
                I deploy the site to <b className="highlight"> fast </b>, secure
                platforms like Vercel and provide support for future updates.
              </p>
            </Step>
          </DynamicStepper>
        </div>
      </section>

      {/* Contact Panel */}
      <div
        className={`contact-panel ${
          showContact ? "showContact" : "hideContact"
        }`}
      >
        {/* Contact details go here */}
      </div>
    </>
  );
}
