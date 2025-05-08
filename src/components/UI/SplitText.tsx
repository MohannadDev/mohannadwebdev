"use client";
import { useEffect, useRef, useState } from "react";

// Define common easing functions
export const easings = {
  easeOutQuint: "cubic-bezier(0.22, 1, 0.36, 1)",
  easeOutCubic: "cubic-bezier(0.33, 1, 0.68, 1)",
  linear: "linear",
};

interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: { opacity: number; transform: string };
  animationTo?: { opacity: number; transform: string };
  easing?: keyof typeof easings;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "right" | "center" | "justify" | "initial" | "inherit";
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text = "",
  className = "",
  delay = 100,
  animationFrom = { opacity: 0, transform: "translateY(40px)" },
  animationTo = { opacity: 1, transform: "translateY(0)" },
  easing = "linear",
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const words = text.split(" ").map((w) => w.split(""));
  const letters = words.flat();

  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(ref.current as Element);
          
          // Handle animation complete callback after all letters have animated
          if (onLetterAnimationComplete) {
            const totalDuration = letters.length * delay + 500; // Add buffer
            setTimeout(onLetterAnimationComplete, totalDuration);
          }
        }
      },
      { threshold, rootMargin }
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, rootMargin, delay, letters.length, onLetterAnimationComplete]);

  // Get transition style for each letter
  const getTransitionStyle = (index: number) => {
    return {
      transition: `opacity 0.6s ${easings[easing]} ${index * delay}ms, transform 0.6s ${easings[easing]} ${index * delay}ms`,
      opacity: inView ? animationTo.opacity : animationFrom.opacity,
      transform: inView ? animationTo.transform : animationFrom.transform,
      display: "inline-block",
      willChange: "transform, opacity",
    };
  };

  return (
    <p
      ref={ref}
      className={`split-parent overflow-hidden inline ${className}`}
      style={{ textAlign }}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap">
          {word.map((letter, lIdx) => {
            const index =
              words.slice(0, wIdx).reduce((acc, w) => acc + w.length, 0) + lIdx;

            return (
              <span
                key={index}
                style={getTransitionStyle(index)}
              >
                {letter}
              </span>
            );
          })}
          <span className="inline-block w-[0.3em]">&nbsp;</span>
        </span>
      ))}
    </p>
  );
};

export default SplitText;
