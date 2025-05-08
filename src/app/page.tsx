"use client";
// import Image from "next/image";
// import Link from "next/link";
// import AnimatedText from "@/components/AnimatedText";

// import AnimatedText from "@/components/UI/AnimatedText";
import SplitText from "@/components/UI/SplitText";



export default function Home() {
  return (
    <div className="bg-bgDark pt-[10vh] text-white">
      <div className="flex flex-col items-center justify-center h-screen">
        <section className="">
          <SplitText
            text="HI!"
            className="text-4xl text-center highlight"
            delay={70}
            animationFrom={{ opacity: 0, transform: "translateY(50px)" }}
            animationTo={{ opacity: 1, transform: "translateY(0)" }}
            easing="easeOutQuint"
            threshold={1}
            rootMargin="0px"
            // onLetterAnimationComplete={handleAnimationComplete}
          />
        </section>
      </div>
    </div>
  );
}
