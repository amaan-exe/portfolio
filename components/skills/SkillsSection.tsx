"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SkillBadge } from "./SkillBadge";
import skillsData from "@/public/data/skills.json";
import { SkillsData } from "@/lib/types";

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const data = skillsData as SkillsData;

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const badges = document.querySelectorAll(".skill-badge");
      gsap.fromTo(
        badges,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.04,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const categories = [
    { title: "LANGUAGES", items: data.languages, color: "#66ffaa" },
    { title: "FRONTEND", items: data.frontend, color: "#00ff7f" },
    { title: "TOOLS", items: data.tools, color: "#7b8fa6" },
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-[128px] max-w-[1280px] mx-auto px-6 md:px-12">
      <SectionLabel number="03" label="SKILLS" />
      
      <h2 className="font-display font-bold text-h1 md:text-5xl text-[var(--text-primary)] mb-16 md:mb-24">
        Tech Stack
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {categories.map((cat, i) => (
          <div key={i} className="flex flex-col">
            <h3 className="font-display font-bold text-[var(--accent-500)] tracking-[0.15em] text-xs uppercase mb-8 pb-4 border-b border-[var(--bg-border)]">
              {cat.title}
            </h3>
            <div className="flex flex-wrap gap-3">
              {cat.items.map((skill) => (
                <SkillBadge key={skill} label={skill} colorHex={cat.color} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
