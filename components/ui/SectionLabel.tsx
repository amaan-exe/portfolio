export function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center space-x-3 mb-12 md:mb-16 uppercase">
      <div className="w-0.5 h-4 bg-[var(--accent-500)]" />
      <span className="font-mono text-xs md:text-sm tracking-widest text-[var(--accent-500)] shadow-sm">
        {number} / {label}
      </span>
    </div>
  );
}
