"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function GlitchText({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !textRef.current || !containerRef.current) return;

    let timeoutId: NodeJS.Timeout;
    let tl: gsap.core.Timeline;

    const triggerGlitch = () => {
      if (isHovered) {
        scheduleNext();
        return;
      }

      tl = gsap.timeline({
        onComplete: scheduleNext
      });

      // Quick glitch jumps
      tl.to(textRef.current, { x: 4, duration: 0.05, ease: "none", color: "var(--accent-500)", clipPath: "inset(20% 0 80% 0)" })
        .to(textRef.current, { x: -4, duration: 0.05, ease: "none", clipPath: "inset(60% 0 10% 0)" })
        .to(textRef.current, { x: 2, duration: 0.05, ease: "none", color: "var(--text-primary)", clipPath: "inset(40% 0 50% 0)" })
        .to(textRef.current, { x: 0, duration: 0.05, ease: "none", clipPath: "inset(0% 0 0% 0)" });
    };

    const scheduleNext = () => {
      const delay = Math.random() * 4000 + 4000; // 4-8s
      timeoutId = setTimeout(triggerGlitch, delay);
    };

    scheduleNext();

    return () => {
      clearTimeout(timeoutId);
      if (tl) tl.kill();
    };
  }, [isHovered, prefersReducedMotion]);

  return (
    <div 
      ref={containerRef}
      className={`relative inline-block ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        // @ts-ignore
        ref={textRef} 
        className="font-display font-bold leading-none tracking-tight split-target overflow-hidden whitespace-nowrap"
      >
        {text}
      </div>
      <div className="absolute inset-0 font-display font-bold leading-none tracking-tight opacity-0 pointer-events-none select-none whitespace-nowrap">
        {text}
      </div>
    </div>
  );
}
