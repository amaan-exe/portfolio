"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const TIMELINE_DATA = [
  {
    year: "2025",
    title: "GeoStrategos",
    status: "In Progress",
    desc: "Building a browser strategy game with React + Vite + Leaflet.",
  },
  {
    year: "2025",
    title: "Web Dev Roadmap",
    status: null,
    desc: "Following the CodeWithHarry full-stack web development curriculum.",
  },
  {
    year: "2024",
    title: "NIST Berhampur",
    status: "Ongoing",
    desc: "Started B.Tech in Computer Science. CGPA tracking ongoing.",
  },
  {
    year: "2024",
    title: "Blood Bank Management System",
    status: null,
    desc: "First major shipped project. Python + Tkinter desktop app.",
  },
  {
    year: "2024",
    title: "Sehat Nabha",
    status: null,
    desc: "First TypeScript deployment. Archived post-milestone.",
  },
  {
    year: "2024",
    title: "CrypTXT",
    status: null,
    desc: "Text encryption tool. Learned Python file I/O and cipher logic.",
  },
];

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Line drawing animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );

      // Node and Card animations
      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
      items.forEach((item, i) => {
        const node = item.querySelector(".timeline-node");
        const card = item.querySelector(".timeline-card");
        const isEven = i % 2 === 0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 65%",
            once: true,
          },
        });

        tl.fromTo(node, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" })
          .fromTo(
            card,
            { x: isEven ? -40 : 40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            "-=0.2"
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="timeline" className="py-[128px] max-w-[1280px] mx-auto px-6 md:px-12 overflow-hidden">
      <SectionLabel number="04" label="TIMELINE" />

      <div ref={containerRef} className="relative mt-16 max-w-4xl mx-auto">
        {/* Center Line Container (background line + active animated line) */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[var(--bg-border)]" />
        <div 
          ref={lineRef} 
          className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[var(--accent-500)] origin-top scale-y-0"
        />

        {TIMELINE_DATA.map((item, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={i} className={`timeline-item relative flex items-center mb-16 md:mb-24 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
              
              {/* Center Node */}
              <div className="absolute left-8 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center z-10 timeline-node">
                <div className={`w-3 h-3 rounded-full bg-[var(--accent-500)] shadow-[var(--glow-sm)] ${item.status ? 'animate-pulse' : ''}`} />
              </div>

              {/* Card Container */}
              <div className={`w-full ml-20 md:ml-0 md:w-[45%] timeline-card ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className={`bg-[var(--bg-surface)] p-6 md:p-8 border border-[var(--bg-border)] hover:border-[var(--accent-500)]/30 transition-colors duration-300`}>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <span className="font-mono text-[var(--accent-500)] text-sm">{item.year}</span>
                    {item.status && (
                      <span className="inline-flex items-center space-x-1.5 px-2 py-1 bg-[var(--accent-500)]/10 border border-[var(--accent-500)]/20 rounded text-[10px] font-mono uppercase text-[var(--accent-500)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-500)] animate-pulse" />
                        <span>{item.status}</span>
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-display font-medium text-xl md:text-2xl text-[var(--text-primary)] mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="font-body text-sm md:text-base text-[var(--text-secondary)]">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
