"use client";

import { Project } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";

interface ProjectListItemProps {
  project: Project;
  onHover: (project: Project | null) => void;
}

export function ProjectListItem({ project, onHover }: ProjectListItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <div className="project-row relative overflow-hidden group border-b border-[var(--bg-border)]">
      {/* Hover Background Fill */}
      <div 
        className="absolute inset-0 bg-[var(--accent-500)] opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-5"
      />

      {/* Row Content */}
      <div 
        className="relative px-4 py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
        onMouseEnter={() => {
          setIsHovered(true);
          onHover(project);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          onHover(null);
        }}
        onClick={() => {
          // Brief flash effect
          if (rowRef.current) {
            rowRef.current.classList.add("bg-[var(--accent-500)]", "bg-opacity-20");
            setTimeout(() => {
              if (rowRef.current) rowRef.current.classList.remove("bg-[var(--accent-500)]", "bg-opacity-20");
              window.open(project.github || project.live || "#", "_blank");
            }, 100);
          }
        }}
        ref={rowRef}
      >
        <div className="flex items-start md:items-center space-x-6 md:space-x-12">
          {/* Number */}
          <span className={`font-mono text-sm transition-colors duration-300 ${isHovered ? "text-[var(--accent-500)] text-glow" : "text-[var(--text-secondary)]"}`}>
            {project.number}
          </span>

          {/* Title */}
          <h3 className="font-display font-medium text-2xl md:text-3xl text-[var(--text-primary)] transition-transform duration-300 group-hover:translate-x-3">
            {project.title}
          </h3>
        </div>

        <div className="flex items-center space-x-8 md:space-x-16 ml-12 md:ml-0">
          {/* Tech Tags */}
          <div className="font-mono text-xs text-[var(--text-secondary)] tracking-wider">
            {project.tech.slice(0, 3).join(" · ")}
          </div>

          {/* Year & Icon */}
          <div className="flex items-center space-x-4 text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-[var(--text-primary)]">
            <span className="font-mono text-xs">[{project.year}]</span>
            <ArrowUpRight 
              size={18} 
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
