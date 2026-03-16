"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NavLink } from "./NavLink";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const links = [
    { number: "01", label: "ABOUT", href: "#about" },
    { number: "02", label: "PROJECTS", href: "#projects" },
    { number: "03", label: "SKILLS", href: "#skills" },
    { number: "04", label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ease-out ${
          scrolled
            ? "bg-[#050508]/85 backdrop-blur-[20px] saturate-180 border-b border-[var(--bg-border)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link 
            href="/" 
            className="font-display font-bold text-xl tracking-wider text-[var(--accent-500)] cursor-pointer"
          >
            AMAAN
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
            <a 
              href="https://github.com/amaan-exe" 
              target="_blank" 
              rel="noreferrer"
              className="text-sm font-mono text-[var(--text-secondary)] hover:text-[var(--accent-500)] transition-colors"
            >
              GitHub ↗
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[90] bg-[var(--bg-primary)] flex flex-col justify-center items-center">
          <nav className="flex flex-col space-y-8 text-center text-2xl font-display">
            {links.map((link, i) => (
              <a 
                key={link.href} 
                href={link.href}
                className="group flex flex-col items-center animate-slide-in"
                style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "both" }}
                onClick={(e) => {
                  setMenuOpen(false);
                  const target = document.querySelector(link.href);
                  if (target) {
                    setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 300);
                  } else {
                    e.preventDefault();
                  }
                }}
              >
                <span className="font-mono text-xs text-[var(--accent-500)] mb-1">{link.number}</span>
                <span className="text-[var(--text-primary)] group-hover:text-[var(--accent-500)] transition-colors">{link.label}</span>
              </a>
            ))}
            <a 
              href="https://github.com/amaan-exe" 
              target="_blank" 
              rel="noreferrer"
              className="font-mono text-sm text-[var(--text-secondary)] hover:text-[var(--accent-500)] transition-colors animate-slide-in"
              style={{ animationDelay: `${links.length * 0.08}s`, animationFillMode: "both" }}
            >
              GitHub ↗
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
