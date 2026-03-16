"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectList } from "./ProjectList";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-[128px] max-w-[1280px] mx-auto px-6 md:px-12 relative w-full">
      <SectionLabel number="02" label="PROJECTS" />
      
      <h2 className="font-display font-bold text-h1 md:text-5xl text-[var(--text-primary)] mb-16 md:mb-24">
        Selected Work
      </h2>

      <ProjectList />
    </section>
  );
}
