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

  // Split text into letters on mount and initialize their colors
  useEffect(() => {
    const chars = text.split('');
    setLetters(chars);
    setLetterColors(new Array(chars.length).fill(baseColor));
  }, [text, baseColor]);

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
        const distanceMoved = Math.sqrt(dx * dx + dy * dy);
        
        // Only process if mouse moved more than 3 pixels (threshold)
        if (distanceMoved < 3) {
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
      }, 5); // Very small delay for responsiveness
    }
  };

  // Find the index of the letter being hovered using element.contains()
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
      
      // If direct hit test fails, fall back to nearest calculation
      return findNearestLetterIndex(e, letterElements);
    }
    
    // Fall back to nearest calculation if elementFromPoint fails
    return findNearestLetterIndex(e, letterElements);
  };
  
  // Helper function to find the nearest letter by precise distance calculation
  const findNearestLetterIndex = (
    e: React.MouseEvent<HTMLSpanElement>, 
    letterElements: NodeListOf<Element>
  ): number => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    // Compute distance to each letter with weighted preference for x-axis
    for (let i = 0; i < letterElements.length; i++) {
      const letterRect = letterElements[i].getBoundingClientRect();
      
      // Check if cursor is directly within the bounds of this letter (strongest signal)
      if (
        mouseX >= letterRect.left && 
        mouseX <= letterRect.right && 
        mouseY >= letterRect.top && 
        mouseY <= letterRect.bottom
      ) {
        return i; // Immediately return this index if cursor is inside
      }
      
      // Otherwise calculate weighted distance (prioritize x-axis more than y-axis)
      const letterCenterX = letterRect.left + letterRect.width / 2;
      const letterCenterY = letterRect.top + letterRect.height / 2;
      
      // Weight horizontal distance more (3x) than vertical distance for text
      const xDistance = mouseX - letterCenterX;
      const yDistance = (mouseY - letterCenterY) / 3; // Reduce y-axis influence
      
      const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
      
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
    
    // Get animation sequence based on variant
    const sequence = getAnimationSequence();
    if (!sequence.length) return;
    
    let currentStep = 0;
    
    // Create a new array with all baseColors to start
    const newColors = new Array(letters.length).fill(baseColor);
    setLetterColors(newColors);
    
    // Start animation interval
    intervalRef.current = setInterval(() => {
      if (currentStep >= sequence.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setAnimationComplete(true);
        isAnimatingRef.current = false; // Reset the animation flag
        return;
      }
      
      // Update the color of the current index in the sequence
      const indexToColor = sequence[currentStep];
      
      setLetterColors(prevColors => {
        const newColors = [...prevColors];
        newColors[indexToColor] = hoverColor;
        return newColors;
      });
      
      currentStep++;
    }, duration * 100);
  };
  
  // Get the sequence of indices to animate based on the variant
  const getAnimationSequence = (): number[] => {
    const totalLetters = letters.length;
    
    switch (variant) {
      case "left-to-right":
        return Array.from({ length: totalLetters }, (_, i) => i);
        
      case "center-outward": {
        const center = Math.floor(totalLetters / 2);
        const sequence = [center];
        
        // Add indices by distance from center
        for (let dist = 1; dist < totalLetters; dist++) {
          const left = center - dist;
          const right = center + dist;
          
          if (left >= 0) sequence.push(left);
          if (right < totalLetters) sequence.push(right);
        }
        
        return sequence;
      }
      
      case "from-cursor": {
        const center = hoveredLetterIndex ?? 0;
        const sequence = [center];
        
        // Add indices by distance from hover point
        for (let dist = 1; dist < totalLetters; dist++) {
          const left = center - dist;
          const right = center + dist;
          
          if (left >= 0) sequence.push(left);
          if (right < totalLetters) sequence.push(right);
        }
        
        return sequence;
      }
        
      case "random": {
        // Create array of indices and shuffle it
        const indices = Array.from({ length: totalLetters }, (_, i) => i);
        // Fisher-Yates shuffle
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        return indices;
      }
      
      default:
        return [];
    }
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