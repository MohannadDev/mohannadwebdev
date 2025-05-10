"use client";
import React, { useRef, useEffect, useCallback } from "react";

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  extraScale?: number;
  children?: React.ReactNode;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
  cosAngle: number; // Pre-computed cos value
  sinAngle: number; // Pre-computed sin value
}

// Pre-compute 2 * Math.PI to avoid repeated calculations
const TWO_PI = 2 * Math.PI;

const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]); // Stores spark data
  const isAnimatingRef = useRef<boolean>(false);
  const lastClickTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout : NodeJS.Timeout;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    // Less frequent resize handling
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 200); // Increased debounce time
    };

    // Observe size changes
    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);

    // Initial sizing
    resizeCanvas();

    // Cleanup
    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Memoized easing function to avoid recreation
  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  // Animation logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const draw = (timestamp: number) => {
      // Only clear canvas if there are sparks to draw
      if (sparksRef.current.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      sparksRef.current = sparksRef.current.filter((spark: Spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          // Spark finished its animation
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        // Use pre-computed sin/cos values
        const x1 = spark.x + distance * spark.cosAngle;
        const y1 = spark.y + distance * spark.sinAngle;
        const x2 = spark.x + (distance + lineLength) * spark.cosAngle;
        const y2 = spark.y + (distance + lineLength) * spark.sinAngle;

        // Draw the spark line
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      // Only continue animation if we have sparks left
      if (sparksRef.current.length > 0) {
        animationId = requestAnimationFrame(draw);
      } else {
        isAnimatingRef.current = false;
      }
    };

    // Only start animation if not already running
    const startAnimation = () => {
      if (!isAnimatingRef.current && sparksRef.current.length > 0) {
        isAnimatingRef.current = true;
        animationId = requestAnimationFrame(draw);
      }
    };

    // Set up an interval to check if we need to start animation
    const checkInterval = setInterval(() => {
      if (sparksRef.current.length > 0 && !isAnimatingRef.current) {
        startAnimation();
      }
    }, 100);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(checkInterval);
    };
  }, [sparkColor, sparkSize, sparkRadius, duration, easeFunc, extraScale]);

  // Optimized click handler
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const now = performance.now();
      // Debounce clicks - ignore if less than 100ms since last click
      if (now - lastClickTimeRef.current < 100) return;
      lastClickTimeRef.current = now;

      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      
      // Check if the click was inside our container
      if (container.contains(e.target as Node)) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create sparks with pre-computed sin/cos values
        const newSparks: Spark[] = [];
        for (let i = 0; i < sparkCount; i++) {
          const angle = (TWO_PI * i) / sparkCount;
          newSparks.push({
            x,
            y,
            angle,
            startTime: now,
            cosAngle: Math.cos(angle),
            sinAngle: Math.sin(angle)
          });
        }

        sparksRef.current.push(...newSparks);
        
        // Start animation if it's not already running
        if (!isAnimatingRef.current && canvasRef.current) {
          isAnimatingRef.current = true;
          requestAnimationFrame(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Initial draw call to start animation
            const draw = (ts: number) => {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              
              sparksRef.current = sparksRef.current.filter((spark: Spark) => {
                const elapsed = ts - spark.startTime;
                if (elapsed >= duration) return false;
                
                const progress = elapsed / duration;
                const eased = easeFunc(progress);
                
                const distance = eased * sparkRadius * extraScale;
                const lineLength = sparkSize * (1 - eased);
                
                const x1 = spark.x + distance * spark.cosAngle;
                const y1 = spark.y + distance * spark.sinAngle;
                const x2 = spark.x + (distance + lineLength) * spark.cosAngle;
                const y2 = spark.y + (distance + lineLength) * spark.sinAngle;
                
                ctx.strokeStyle = sparkColor;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                
                return true;
              });
              
              if (sparksRef.current.length > 0) {
                requestAnimationFrame(draw);
              } else {
                isAnimatingRef.current = false;
              }
            };
            
            requestAnimationFrame(draw);
          });
        }
      }
    };

    // Use passive event listener for better performance
    document.addEventListener('click', handleGlobalClick, { passive: true });

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [sparkColor, sparkCount, sparkRadius, sparkSize, duration, easeFunc, extraScale]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full"
      style={{ zIndex: 1 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1000 }} // Ensure canvas is above all content
      />
      {children}
    </div>
  );
};

export default ClickSpark;
