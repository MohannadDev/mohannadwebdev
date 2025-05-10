"use client";

import { useState, useRef, useEffect } from "react";

interface HoverTextProps {
  text: string;
  className?: string;
  baseColor?: string;
  hoverColor?: string;
  variant?: "left-to-right" | "center-outward" | "random" | "from-cursor";
  duration?: number;
  resetDelay?: number; // Time to wait before changing back to original color (ms)
}

const HoverText = ({
  text,
  className = "",
  baseColor = "var(--color-textMuted)",
  hoverColor = "var(--color-textHighlight)",
  variant = "left-to-right",
  duration = 0.3,
  resetDelay = 1000, // Time to wait before changing back to original color (ms)
}: HoverTextProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [letters, setLetters] = useState<string[]>([]);
  const [letterColors, setLetterColors] = useState<string[]>([]);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [hoveredLetterIndex, setHoveredLetterIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastProcessedPositionRef = useRef<{x: number, y: number} | null>(null);
  const lastHoveredIndexRef = useRef<number | null>(null);
  const isAnimatingRef = useRef<boolean>(false);
  const animationSequenceRef = useRef<number[]>([]);

  // Split text into letters on mount and initialize their colors
  useEffect(() => {
    const chars = text.split('');
    setLetters(chars);
    setLetterColors(new Array(chars.length).fill(baseColor));
    // Pre-compute the animation sequence for this text
    animationSequenceRef.current = getAnimationSequence(chars.length);
  }, [text, baseColor, variant]);

  // Handle hover start with improved initial letter detection
  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    setIsHovered(true);
    // Clear any existing timeout/interval
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    
    // Reset state
    setAnimationComplete(false);
    isAnimatingRef.current = false;
    lastProcessedPositionRef.current = { x: e.clientX, y: e.clientY };
    
    // If using from-cursor variant, find the hovered letter
    if (variant === "from-cursor") {
      const letterIndex = findHoveredLetterIndex(e);
      lastHoveredIndexRef.current = letterIndex;
      setHoveredLetterIndex(letterIndex);
    }
    
    // Start letter animation based on variant
    isAnimatingRef.current = true;
    animateLetters();
  };

  // Handle mouse move to update hovered letter with improved tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (variant === "from-cursor" && isHovered && !animationComplete) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Skip if mouse hasn't moved enough (optimization)
      const lastPos = lastProcessedPositionRef.current;
      if (lastPos) {
        const dx = mouseX - lastPos.x;
        const dy = mouseY - lastPos.y;
        // Fast distance approximation (avoid square root)
        const distanceMoved = Math.abs(dx) + Math.abs(dy);
        
        // Only process if mouse moved more than 5 pixels (increased threshold)
        if (distanceMoved < 5) {
          return;
        }
      }
      
      // Update last processed position
      lastProcessedPositionRef.current = { x: mouseX, y: mouseY };
      
      // Cancel previous timer to avoid queuing multiple updates
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      
      // Don't interrupt an ongoing animation if we're already animating
      if (isAnimatingRef.current) {
        return;
      }

      // Debounce the detection and animation start
      debounceTimerRef.current = setTimeout(() => {
        // Find the letter index under the cursor
        const letterIndex = findHoveredLetterIndex(e);
        
        // Only restart animation if hovering a different letter
        if (letterIndex !== lastHoveredIndexRef.current) {
          lastHoveredIndexRef.current = letterIndex;
          setHoveredLetterIndex(letterIndex);
          
          // Clear any existing animation
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          
          // Reset colors back to base
          setLetterColors(new Array(letters.length).fill(baseColor));
          
          // Start a new animation
          isAnimatingRef.current = true;
          animateLetters();
        }
      }, 10); // Increased debounce delay for better performance
    }
  };

  const findHoveredLetterIndex = (e: React.MouseEvent<HTMLSpanElement>): number => {
    if (!containerRef.current) return 0;
    
    const letterElements = containerRef.current.querySelectorAll('span');
    
    // Get the element directly under the cursor using document.elementFromPoint
    const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
    
    // If we found an element and it's one of our letter spans
    if (elementUnderCursor) {
      // Check which letter span contains this element
      for (let i = 0; i < letterElements.length; i++) {
        if (letterElements[i] === elementUnderCursor || letterElements[i].contains(elementUnderCursor)) {
          return i;
        }
      }
    }
    
    // Fall back to simplified nearest calculation
    return findNearestLetterIndex(e, letterElements);
  };
  
  // Optimized function to find the nearest letter
  const findNearestLetterIndex = (
    e: React.MouseEvent<HTMLSpanElement>, 
    letterElements: NodeListOf<Element>
  ): number => {
    const mouseX = e.clientX;
    
    // Simplified approach: find the letter whose horizontal center is closest to the mouse
    // This works well for horizontal text and is much faster than full 2D distance calculation
    let closestIndex = 0;
    let minDistance = Infinity;
    
    for (let i = 0; i < letterElements.length; i++) {
      const rect = letterElements[i].getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - centerX);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    
    return closestIndex;
  };

  // Handle hover end
  const handleMouseLeave = () => {
    // Clear any pending timers first
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    
    // Wait for a small delay before resetting to avoid flicker on quick hover movements
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      
      // Always reset colors, regardless of animation state
      resetColors();
      
      // Reset all tracking state
      setHoveredLetterIndex(null);
      lastHoveredIndexRef.current = null;
      setAnimationComplete(false);
      
      // Stop any ongoing animation
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        isAnimatingRef.current = false;
      }
    }, resetDelay); // Use the configurable resetDelay parameter
  };
  
  // Reset all letters to base color
  const resetColors = () => {
    setLetterColors(new Array(letters.length).fill(baseColor));
  };

  // Animate letters based on selected variant
  const animateLetters = () => {
    if (letters.length === 0) return;
    
    // Use pre-computed animation sequence
    const sequence = animationSequenceRef.current;
    if (!sequence.length) return;
    
    let currentStep = 0;
    // Create a new array with all baseColors to start
    const newColors = [...letterColors];
    
    // Start animation interval
    intervalRef.current = setInterval(() => {
      if (currentStep >= sequence.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        isAnimatingRef.current = false;
        setAnimationComplete(true);
        return;
      }
      
      const letterIndex = sequence[currentStep];
      if (letterIndex >= 0 && letterIndex < letters.length) {
        // Update only the color that changes
        newColors[letterIndex] = hoverColor;
        setLetterColors([...newColors]);
      }
      
      currentStep++;
    }, 16); // ~60fps timing
  };

  // Pre-compute animation sequence based on variant (memoized)
  const getAnimationSequence = (length: number): number[] => {
    if (length === 0) return [];
    
    let sequence: number[] = [];
    
    switch (variant) {
      case "left-to-right":
        sequence = Array.from({ length }, (_, i) => i);
        break;
        
      case "center-outward": {
        const center = Math.floor(length / 2);
        for (let offset = 0; offset <= center; offset++) {
          // Add letters outward from center (left then right)
          if (center - offset >= 0) sequence.push(center - offset);
          if (offset > 0 && center + offset < length) sequence.push(center + offset);
        }
        break;
      }
        
      case "random": {
        // Generate indices and shuffle them
        sequence = Array.from({ length }, (_, i) => i);
        for (let i = sequence.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
        }
        break;
      }
        
      case "from-cursor": {
        if (hoveredLetterIndex === null) {
          // Default to left-to-right if no hover position
          sequence = Array.from({ length }, (_, i) => i);
        } else {
          // Start from hovered letter and go outward
          sequence = [hoveredLetterIndex];
          
          for (let offset = 1; sequence.length < length; offset++) {
            // Add letter to the right if possible
            if (hoveredLetterIndex + offset < length) {
              sequence.push(hoveredLetterIndex + offset);
            }
            
            // Add letter to the left if possible
            if (hoveredLetterIndex - offset >= 0) {
              sequence.push(hoveredLetterIndex - offset);
            }
          }
        }
        break;
      }
    }
    
    return sequence;
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      // Reset all tracking state
      lastProcessedPositionRef.current = null;
      lastHoveredIndexRef.current = null;
      isAnimatingRef.current = false;
    };
  }, []);
  
  return (
    <span 
      ref={containerRef}
      className={`inline-block cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {letters.map((letter, index) => (
        <span 
          key={index}
          style={{
            color: letterColors[index] || baseColor,
            transition: `color ${duration}s ease-out`,
            display: 'inline-block',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </span>
  );
};

export default HoverText; 