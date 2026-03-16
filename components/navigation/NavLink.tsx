"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface NavLinkProps {
  href: string;
  number: string;
  label: string;
}

export function NavLink({ href, number, label }: NavLinkProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Basic active state through observer
    const handleScroll = () => {
      const sectionId = href.replace("#", "");
      if (!sectionId) return;

      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        // If section is roughly in viewport
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [href]);

  return (
    <Link 
      href={href}
      className={`group relative flex items-center space-x-2 text-sm transition-colors duration-300 ${
        isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      }`}
      onClick={(e) => {
        // Smooth scroll to element using Lenis automatically if href has hash, but let's just let it be.
        if (href.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      }}
    >
      <span 
        className={`font-mono transition-colors duration-300 ${
          isActive ? "text-[var(--accent-500)] text-glow" : "group-hover:text-[var(--accent-500)] group-hover:text-glow"
        }`}
      >
        {number}
      </span>
      <span>{label}</span>
      
      {/* Underline container */}
      <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--bg-border)] overflow-hidden">
        {/* Animated underline */}
        <span 
          className={`absolute inset-0 bg-[var(--accent-500)] shadow-[var(--glow-sm)] transition-transform duration-300 ease-out origin-left ${
            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
        />
      </span>
    </Link>
  );
}
