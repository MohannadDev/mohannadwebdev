'use client';

import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  highlightedText?: string;
  className?: string;
  staggerDuration?: number; // Time between each word animation
  initialDelay?: number; // Delay before animation starts
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number; 
  ease?: string | number[];
}

export default function AnimatedText({ 
  text, 
  highlightedText = '',
  className = '', 
  staggerDuration = 0.06, 
  initialDelay = 0, 
  springConfig = {
    damping: 40,
    stiffness: 90,
    mass: 0.5
  },
  direction = 'up',
  distance = 20,
  ease = [0.25, 0.1, 0.25, 1]
}: AnimatedTextProps) {
  // Combine the regular text and highlighted text
  const combinedText = highlightedText ? `${text} ${highlightedText}` : text;
  const words = combinedText.split(' ');
  
  // Calculate where the highlighted part begins
  const mainTextLength = text.trim().split(' ').length;

  // Custom container animation with improved transitions
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: staggerDuration, 
        delayChildren: initialDelay,
        duration: 0.15,
        ease: "easeOut"
      },
    },
  };

  // Child animation with refined physics and easing
  const child = {
    visible: {
      opacity: 1,
      x: direction === 'left' || direction === 'right' ? 0 : undefined,
      y: direction === 'up' || direction === 'down' ? 0 : undefined,
      transition: {
        // For smoother animations, use a tween for opacity and movement
        opacity: { duration: 0.6, ease },
        x: direction === 'left' || direction === 'right' 
          ? { 
              type: 'spring', 
              damping: springConfig.damping, 
              stiffness: springConfig.stiffness, 
              mass: springConfig.mass,
              restDelta: 0.0001,
              restSpeed: 0.0001
            } 
          : undefined,
        y: direction === 'up' || direction === 'down' 
          ? { 
              type: 'spring', 
              damping: springConfig.damping, 
              stiffness: springConfig.stiffness, 
              mass: springConfig.mass,
              restDelta: 0.0001,
              restSpeed: 0.0001
            } 
          : undefined,
      },
    },
    hidden: {
      opacity: 0,
      ...getInitialTransform(),
      transition: {
        // Match the visible transition for consistency
        opacity: { duration: 0.3, ease },
        x: direction === 'left' || direction === 'right' 
          ? { 
              type: 'spring', 
              damping: springConfig.damping, 
              stiffness: springConfig.stiffness, 
              mass: springConfig.mass 
            } 
          : undefined,
        y: direction === 'up' || direction === 'down' 
          ? { 
              type: 'spring', 
              damping: springConfig.damping, 
              stiffness: springConfig.stiffness, 
              mass: springConfig.mass 
            } 
          : undefined,
      },
    },
  };

  // Helper function to determine the initial transform
  function getInitialTransform() {
    switch(direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return { y: distance };
    }
  }

  return (
    <motion.div
      className={`w-full mx-auto py-2 flex flex-wrap items-center justify-center text-center overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ willChange: 'transform, opacity' }}
    >
      {words.map((word, index) => {
        // Check if this word is part of the highlighted text based on position
        const isHighlighted = highlightedText && index >= mainTextLength;
        
        return (
          <motion.span
            key={index}
            className={`inline-block mx-1 my-1 ${isHighlighted ? 'highlight' : ''}`}
            variants={child}
            style={{ 
              willChange: 'transform, opacity',
              display: 'inline-block',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'antialiased',
              transform: 'translateZ(0)'
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
} 