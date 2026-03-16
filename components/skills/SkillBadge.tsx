"use client";

interface SkillBadgeProps {
  label: string;
  colorHex?: string;
}

export function SkillBadge({ label, colorHex = "#00ff7f" }: SkillBadgeProps) {
  return (
    <div className="skill-badge inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-[var(--bg-border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] font-mono text-sm transition-all duration-300 hover:border-[var(--accent-500)] hover:text-[var(--accent-300)] hover:shadow-[var(--glow-sm)] cursor-default">
      <span 
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: colorHex, boxShadow: `0 0 4px ${colorHex}80` }}
      />
      <span>{label}</span>
    </div>
  );
}
