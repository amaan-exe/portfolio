"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { Pointer } from "lucide-react";

export function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setIsMounted(true);

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  if (!isMounted || prefersReducedMotion) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden sm:block will-change-transform"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      >
        <motion.div
           animate={{
             scale: isClicked ? 0.9 : isHovering ? 1.1 : 1,
             rotate: isClicked ? -10 : 0,
           }}
           transition={{ type: "spring", stiffness: 400, damping: 15 }}
           className="relative"
        >
          {isHovering ? (
            <div className="relative -top-1 -left-2.5 drop-shadow-[0_0_10px_var(--accent-500)] text-white">
              <Pointer size={30} fill="#000000" strokeWidth={1.5} />
            </div>
          ) : (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_10px_var(--accent-500)]">
              <path d="M 2 2 L 12 25 L 15 15 L 25 12 Z" fill="#000000" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" />
              <path d="M 15 15 L 22 22" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <path d="M 15 15 L 22 22" stroke="#000000" strokeWidth="1" strokeLinecap="round" />
            </svg>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
