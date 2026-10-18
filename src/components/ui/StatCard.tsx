interface StatCardProps {
  value: string;
  label: string;
  /** Icon element to display above the value */
  icon?: React.ReactNode;
}

/**
 * Stat display used in statistics / impact sections.
 * HIG: content layer — no glass, no hover motion on non-interactive items.
 * Numbers are ink (white on the brand band), tabular so they align.
 */
export default function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="flex flex-col items-center gap-1 text-center px-2 py-4">
      {icon && <div className="text-white/80 mb-1">{icon}</div>}
      <p className="text-5xl md:text-6xl font-bold leading-none tabular-nums text-white">
        {value}
      </p>
      <p className="text-base md:text-lg text-white/85">{label}</p>
    </div>
  );
}
