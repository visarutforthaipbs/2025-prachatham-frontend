interface StatCardProps {
  value: string;
  label: string;
  /** Icon element to display above the value */
  icon?: React.ReactNode;
}

/**
 * Stat display used in statistics / impact sections.
 */
export default function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center p-6 rounded-lg border border-white/15 bg-white/8 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5">
      {icon && (
        <div className="text-white/80 mb-1">
          {icon}
        </div>
      )}
      <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-none">
        {value}
      </p>
      <p className="text-sm md:text-base text-white/90 font-medium">
        {label}
      </p>
    </div>
  );
}
