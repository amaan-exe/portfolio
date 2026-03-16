"use client";

import dynamic from "next/dynamic";
import { HeroText } from "./HeroText";
import { NoiseBg } from "@/components/ui/NoiseBg";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const ParticleField = dynamic(() => import("./ParticleField"), {
  ssr: false,
  loading: () => null,
});

export function HeroSection() {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !indicatorRef.current || !arrowRef.current) return;

    // Bounce animation
    const bounceTl = gsap.timeline({ repeat: -1 });
    bounceTl.to(indicatorRef.current, { y: 10, duration: 1, ease: "sine.inOut", yoyo: true });
    
    // Offset arrow animation slightly
    const arrowTl = gsap.timeline({ repeat: -1 });
    arrowTl.to(arrowRef.current, { y: 5, duration: 1, ease: "sine.inOut", yoyo: true, delay: 0.2 });

    // Fade on scroll
    const scrollTl = gsap.to(indicatorRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "100px top",
        scrub: true,
      }
    });

    return () => {
      bounceTl.kill();
      arrowTl.kill();
      scrollTl.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <section className="relative w-full h-[100dvh] overflow-hidden bg-[var(--bg-primary)]">
      {/* 1. ParticleField base layer */}
      <ParticleField />

      {/* 2. Radial Vignette Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, #050508 100%)"
        }}
      />

      {/* 3. Noise Texture */}
      <NoiseBg />

      {/* 4. Hero Content */}
      <HeroText />

      {/* Scroll Indicator */}
      <div 
        ref={indicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-2 z-20 pointer-events-none"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-secondary)]">
          SCROLL
        </span>
        <svg 
          ref={arrowRef}
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="var(--accent-500)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </section>
  );
}
