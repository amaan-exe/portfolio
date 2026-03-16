"use client";

import Image from "next/image";
import { Project } from "@/lib/types";

interface ProjectPreviewProps {
  activeProject: Project | null;
}

export function ProjectPreview({ activeProject }: ProjectPreviewProps) {
  // We keep a history to smoothly crossfade between images
  // But for minimal implementation, we'll just handle activeProject directly
  
  if (!activeProject) return null;

  return (
    <div className="fixed top-0 right-0 w-1/2 h-[100dvh] pointer-events-none z-[-1] hidden lg:block overflow-hidden transition-opacity duration-500 ease-in-out opacity-80">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10" />
      
      {/* Fallback pattern to show if image hasn't loaded or doesn't exist */}
      <div className="absolute inset-0 bg-[var(--bg-elevated)] flex flex-col items-center justify-center border-l border-[var(--bg-border)]">
        <div className="w-24 h-24 rounded-full border border-[var(--accent-500)] flex items-center justify-center mb-8 opacity-20">
          <span className="font-mono text-xl text-[var(--accent-500)] tracking-widest">{activeProject.number}</span>
        </div>
        <h3 className="font-mono text-4xl text-[var(--text-disabled)] opacity-10 rotate-90 absolute right-8 bottom-32 origin-right whitespace-nowrap">
          {activeProject.title.toUpperCase()}
        </h3>
      </div>

      <Image 
        src={activeProject.image}
        alt={activeProject.title}
        fill
        sizes="50vw"
        className="object-cover transition-transform duration-700 ease-out scale-105 hover:scale-100 mix-blend-screen"
        onError={(e) => {
          // Hide broken image icon, fallback is shown behind
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}
