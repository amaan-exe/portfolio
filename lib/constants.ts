export const TIMING = {
  instant:   0.15,
  fast:      0.3,
  normal:    0.5,
  slow:      0.8,
  verySlow:  1.2,
  stagger:   0.08,      // between sequential elements
  ease:      [0.16, 1, 0.3, 1],   // custom cubic-bezier (spring-like)
  easeIn:    [0.4, 0, 1, 1],
  easeOut:   [0, 0, 0.2, 1],
  spring:    { type: "spring", stiffness: 300, damping: 30 }
};

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "amaan@example.com";
export const CONTACT_PHONE = "+91 8271301179";
