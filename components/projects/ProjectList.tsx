"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from "../../public/data/projects.json";
import { Project } from "@/lib/types";
import { ProjectListItem } from "./ProjectListItem";
import { ProjectPreview } from "./ProjectPreview";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function ProjectList() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !listRef.current) return;

    const ctx = gsap.context(() => {
      const rows = document.querySelectorAll(".project-row");
      gsap.fromTo(
        rows,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
          },
        }
      );
    }, listRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <>
      <div ref={listRef} className="border-t border-[var(--bg-border)]">
        {(projectsData as Project[]).map((project) => (
          <ProjectListItem 
            key={project.id} 
            project={project} 
            onHover={setActiveProject} 
          />
        ))}
      </div>
      
      {/* Full screen preview for desktop */}
      <ProjectPreview activeProject={activeProject} />
    </>
  );
}
