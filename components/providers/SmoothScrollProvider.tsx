"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsapCore from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsapCore.registerPlugin(ScrollTrigger);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsapCore.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsapCore.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsapCore.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
