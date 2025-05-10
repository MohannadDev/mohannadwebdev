import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TrueFocusProps {
    firstSentence?: string;
    secondSentence?: string;
    manualMode?: boolean;
    blurAmount?: number;
    borderColor?: string;
    glowColor?: string;
    animationDuration?: number;
    pauseBetweenAnimations?: number;
}

interface FocusRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
    firstSentence = "True Focus",
    secondSentence = "Amazing Results",
    manualMode = false,
    blurAmount = 5,
    borderColor = "#929292",
    glowColor = "rgba(0, 255, 0, 0.6)",
    animationDuration = 0.5,
    pauseBetweenAnimations = 1,
}) => {
    const [activeIndex, setActiveIndex] = useState<0 | 1>(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const sentenceRefs = useRef<(HTMLDivElement | null)[]>([null, null]);
    const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });
    
    // Toggle between sentences
    useEffect(() => {
        if (manualMode) return;
        
        const interval = setInterval(() => {
            setActiveIndex(prev => prev === 0 ? 1 : 0);
        }, (animationDuration + pauseBetweenAnimations) * 1000);
        
        return () => clearInterval(interval);
    }, [manualMode, animationDuration, pauseBetweenAnimations]);

    // Update focus rectangle
    useEffect(() => {
        if (!containerRef.current || !sentenceRefs.current[activeIndex]) return;

        const parentRect = containerRef.current.getBoundingClientRect();
        const activeRect = sentenceRefs.current[activeIndex]!.getBoundingClientRect();

        setFocusRect({
            x: activeRect.left - parentRect.left,
            y: activeRect.top - parentRect.top,
            width: activeRect.width,
            height: activeRect.height,
        });
    }, [activeIndex]);

    const handleMouseEnter = (index: 0 | 1) => {
        if (manualMode) {
            setActiveIndex(index);
        }
    };

    return (
        <div 
            className="relative flex items-center justify-center gap-6 py-4"
            ref={containerRef}
        >
            <div 
                ref={(el) => {sentenceRefs.current[0] = el;}}
                className="text-[3rem] font-black cursor-pointer highlight"
                style={{
                    filter: activeIndex === 0 ? 'blur(0px)' : `blur(${blurAmount}px)`,
                    // transition: `filter ${animationDuration * 0.8}s cubic-bezier(0.4, 0, 0.2, 1)`,
                    transition: `filter ${animationDuration * 0.8}s linear`,
                }}
                onMouseEnter={() => handleMouseEnter(0)}
            >
                {firstSentence}
            </div>
            
            <div 
                ref={(el) => {sentenceRefs.current[1] = el;}}
                className="text-[3rem] font-black cursor-pointer highlight"
                style={{
                    filter: activeIndex === 1 ? 'blur(0px)' : `blur(${blurAmount}px)`,
                    transition: `filter ${animationDuration * 0.8}s linear`,
                }}
                onMouseEnter={() => handleMouseEnter(1)}
            >
                {secondSentence}
            </div>

            <motion.div
                className="box-border absolute top-0 left-0 border-0 pointer-events-none"
                animate={{
                    x: focusRect.x,
                    y: focusRect.y,
                    width: focusRect.width,
                    height: focusRect.height,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: animationDuration,
                }}
                style={{
                    "--border-color": borderColor,
                    "--glow-color": glowColor,
                } as React.CSSProperties}
            >
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"
                    style={{
                        borderColor: "var(--border-color)",
                        filter: "drop-shadow(0 0 4px var(--border-color))",
                    }}
                ></span>
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
                    style={{
                        borderColor: "var(--border-color)",
                        filter: "drop-shadow(0 0 4px var(--border-color))",
                    }}
                ></span>
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
                    style={{
                        borderColor: "var(--border-color)",
                        filter: "drop-shadow(0 0 4px var(--border-color))",
                    }}
                ></span>
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
                    style={{
                        borderColor: "var(--border-color)",
                        filter: "drop-shadow(0 0 4px var(--border-color))",
                    }}
                ></span>
            </motion.div>
        </div>
    );
};

export default TrueFocus;