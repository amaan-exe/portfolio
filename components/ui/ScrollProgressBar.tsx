"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !barRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2, // Small amount of smoothing
        },
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[200] pointer-events-none">
      <div 
        ref={barRef}
        className="h-full bg-[var(--accent-500)] origin-left scale-x-0 relative shadow-[var(--glow-md)]"
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--accent-500)] blur-sm opacity-50 translate-x-1/2" />
      </div>
    </div>
  );
}
