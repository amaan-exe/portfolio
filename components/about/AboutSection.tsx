"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const statsRefs = useRef<(HTMLElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Paragraph reveals
      textRefs.current.forEach((p, i) => {
        if (!p) return;
        gsap.fromTo(
          p,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: p,
              start: "top 80%",
            },
            delay: i * 0.15,
          }
        );
      });

      // Stats count up
      statsRefs.current.forEach((stat) => {
        if (!stat) return;
        const targetValue = parseInt(stat.dataset.target || "0", 10);
        if (isNaN(targetValue)) return; // Don't animate non-numbers like infinity yet
        
        gsap.to(stat, {
          innerText: targetValue,
          duration: 1.5,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
          },
        });
      });

      // Infinity symbol fade in
      const infinityStat = document.querySelector(".stat-infinity");
      if (infinityStat) {
        gsap.fromTo(
          infinityStat,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: infinityStat,
              start: "top 85%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="about" ref={sectionRef} className="py-[128px] max-w-[1280px] mx-auto px-6 md:px-12">
      <SectionLabel number="01" label="ABOUT" />

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* LEFT COLUMN (60%) */}
        <div className="lg:w-[60%] space-y-8">
          <p 
            ref={(el) => { textRefs.current[0] = el; }}
            className="font-body text-body-lg md:text-xl text-[var(--text-primary)] leading-relaxed"
          >
            I'm Amaan — a B.Tech Computer Science student and aspiring web developer/freelancer. I hail from Jamshedpur, Jharkhand, but I'm currently based in Berhampur, Odisha for my second year at NIST University, where I build real software between lectures.
          </p>
          <p 
            ref={(el) => { textRefs.current[1] = el; }}
            className="font-body text-body-lg md:text-xl text-[var(--text-secondary)] leading-relaxed"
          >
            My work lives at the intersection of clean code and functional design. I gravitate toward building tools and systems — things that solve actual problems, not just look good in a demo.
          </p>
          <p 
            ref={(el) => { textRefs.current[2] = el; }}
            className="font-body text-body-lg md:text-xl text-[var(--text-secondary)] leading-relaxed"
          >
            When I'm not writing code or organizing tech events as a Core Member of Club Excel NIST, I'm thinking about geopolitics, learning languages, or deep in a strategy game.
          </p>

          <div className="pt-4">
            <div className="inline-flex items-center space-x-3 px-4 py-2 bg-[var(--bg-surface)] border border-[var(--bg-border)] rounded-full text-sm font-mono text-[var(--text-primary)] relative group">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--success)] shadow-[var(--glow-sm)]"></span>
              </span>
              <span>Available for freelance work</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (40%) */}
        <div className="lg:w-[40%] flex flex-col gap-12 pt-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12">
            <div>
              <div className="font-display font-bold text-h1 text-[var(--text-primary)] flex items-end">
                <span ref={(el) => { statsRefs.current[0] = el; }} data-target="6" className="leading-none">0</span>
                <span className="text-[var(--accent-500)] text-2xl mb-2">+</span>
              </div>
              <div className="font-body text-sm text-[var(--text-secondary)] mt-2">Projects shipped</div>
            </div>
            
            <div>
              <div className="font-display font-bold text-h1 text-[var(--text-primary)] flex items-end">
                <span ref={(el) => { statsRefs.current[1] = el; }} data-target="7" className="leading-none">0</span>
              </div>
              <div className="font-body text-sm text-[var(--text-secondary)] mt-2">Programming languages</div>
            </div>

            <div>
              <div className="font-display font-bold text-h1 text-[var(--text-primary)] flex items-end">
                <span ref={(el) => { statsRefs.current[2] = el; }} data-target="15" className="leading-none">0</span>
                <span className="text-[var(--accent-500)] text-2xl mb-2">+</span>
              </div>
              <div className="font-body text-sm text-[var(--text-secondary)] mt-2">Tools & frameworks</div>
            </div>

            <div>
              <div className="font-display font-bold text-h1 text-[var(--text-primary)] flex items-end">
                <span className="stat-infinity leading-none">∞</span>
              </div>
              <div className="font-body text-sm text-[var(--text-secondary)] mt-2">Problems left to solve</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
