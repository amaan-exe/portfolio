"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { GlitchText } from "@/components/ui/GlitchText";
import { Github } from "lucide-react";

export function HeroText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>(null);
  const subheadRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const [descText, setDescText] = useState("");
  const fullDesc = "Intermediate-beginner level developer actively building real client projects.";

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) {
      setDescText(fullDesc);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Label fade in
      tl.fromTo(
        labelRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 0.2 }
      );

      // Headline characters
      const chars = document.querySelectorAll(".hero-char");
      tl.fromTo(
        chars,
        { y: 120, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 0.8, stagger: 0.06, ease: "expo.out" },
        0.4
      );

      // Subheadline
      tl.fromTo(
        subheadRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        1.2
      );

      // Typewriter
      tl.call(() => {
        let i = 0;
        const typeInterval = setInterval(() => {
          setDescText(fullDesc.substring(0, i + 1));
          i++;
          if (i === fullDesc.length) {
            clearInterval(typeInterval);
          }
        }, 30);
      }, undefined, 1.8);

      // Buttons
      const btns = btnsRef.current?.children;
      if (btns) {
        tl.fromTo(
          btns,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 },
          2.2
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, fullDesc]);

  // 3D Parallax Effect
  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;

      gsap.to(containerRef.current, {
        rotationY: xPos * 15,
        rotationX: -yPos * 15,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.5
      });
    };

    const handleMouseLeave = () => {
      gsap.to(containerRef.current, {
        rotationY: 0,
        rotationX: 0,
        ease: "power2.out",
        duration: 0.8
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
      <div 
        ref={labelRef}
        className="font-mono text-xs md:text-sm text-[var(--accent-500)] tracking-widest mb-6 opacity-0"
      >
        {"< PORTFOLIO / 2026 >"}
      </div>

      <div className="mb-4 perspective-[1000px]">
        {/* We use a manual split into spans to emulate SplitText cleanly without premium plugins */}
        <div className="relative inline-block font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none tracking-tight whitespace-nowrap">
          {"MD AMANULLAH".split("").map((c, i) => (
            <span key={i} className="hero-char inline-block opacity-0 transform-gpu">
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
          {/* GlitchText overlay - absolute positioned to trigger random glitches later */}
          <div className="absolute inset-0 z-10 text-transparent opacity-0 mix-blend-overlay">
            <GlitchText text="MD AMANULLAH" />
          </div>
        </div>
      </div>

      <h2 
        ref={subheadRef}
        className="font-display font-medium text-2xl md:text-3xl lg:text-h2 text-[var(--text-secondary)] mb-6 opacity-0 px-4 md:px-0"
      >
        I build tools and systems that solve actual problems.
      </h2>

      <p 
        ref={descRef}
        className="font-body text-base md:text-lg lg:text-body-lg text-[var(--text-primary)] max-w-xl mx-auto mb-10 h-8"
      >
        {descText}
        {!prefersReducedMotion && descText.length < fullDesc.length && (
          <span className="animate-pulse">|</span>
        )}
      </p>

      <div ref={btnsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={() => {
            const el = document.getElementById("projects");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="opacity-0 px-8 py-4 bg-transparent border border-[var(--accent-500)] text-[var(--accent-500)] font-mono text-sm tracking-widest hover:bg-[var(--accent-500)] hover:text-[#050508] transition-all duration-300 hover:shadow-[var(--glow-md)]"
        >
          View Work
        </button>
        <a 
          href="https://github.com/amaan-exe"
          target="_blank"
          rel="noreferrer"
          className="opacity-0 px-8 py-4 bg-[var(--bg-surface)] border border-[var(--bg-border)] text-[var(--text-primary)] font-mono text-sm tracking-widest hover:bg-[var(--bg-elevated)] transition-colors duration-300 flex items-center gap-2"
        >
          <Github size={16} /> GitHub ↗
        </a>
      </div>
    </div>
  );
}
