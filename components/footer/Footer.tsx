import { CONTACT_EMAIL } from "@/lib/constants";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = 2026; // Hardcoded to 2026 as per spec

  return (
    <footer className="w-full relative z-10 bg-[var(--bg-primary)]">
      {/* Top Border with Glow */}
      <div className="w-full h-px bg-[var(--bg-border)] shadow-[0_-1px_0_rgba(0,255,127,0.1)]" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="text-center md:text-left">
            <h2 className="font-mono text-4xl text-[var(--text-disabled)] tracking-widest font-bold mb-4 opacity-50 select-none">
              AMAAN
            </h2>
          </div>

          <div className="text-center flex flex-col items-center md:items-end gap-2 text-xs md:text-sm text-[var(--text-secondary)] font-body">
            <p>Built with Next.js, GSAP, Three.js</p>
            <p>© {currentYear} Md Amanullah · All rights reserved.</p>
          </div>

          <div className="flex items-center space-x-6">
            <a 
              href="https://github.com/amaan-exe" 
              target="_blank" 
              rel="noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--accent-500)] transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/md-amanullah-79523224b/" 
              target="_blank" 
              rel="noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--accent-500)] transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[var(--text-secondary)] hover:text-[var(--accent-500)] transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
