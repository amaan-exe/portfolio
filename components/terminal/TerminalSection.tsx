"use client";

import { useRef } from "react";
import { Terminal } from "./Terminal";

export function TerminalSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={sectionRef}
      id="terminal"
      className="relative w-full py-20 px-6 bg-[var(--bg-primary)] z-10 border-b border-[var(--bg-border)]/50"
    >
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="font-mono text-sm text-[var(--accent-500)] tracking-widest mb-4">
            {"< SYSTEM />"}
          </div>
          <h2 className="font-display font-medium text-3xl md:text-4xl text-[var(--text-primary)] mb-4 leading-tight">
            Interactive Prompt
          </h2>
          <p className="font-body text-[var(--text-secondary)] max-w-xl text-base md:text-lg">
            Prefer the command line? Use the terminal below to explore my portfolio. Standard bash-like commands supported.
          </p>
        </div>

        <Terminal />
      </div>
    </section>
  );
}
