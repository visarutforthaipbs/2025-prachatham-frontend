interface PageHeaderProps {
  /** Overline / badge text — e.g. "WHO WE ARE" */
  overline?: string;
  title: string;
  subtitle?: string;
  /** Centred by default */
  align?: "center" | "start";
  /** Title colour — defaults to brand */
  titleColor?: string;
}

/**
 * Re-usable page/section header with optional overline badge.
 */
export default function PageHeader({
  overline,
  title,
  subtitle,
  align = "center",
  titleColor = "text-brand-700",
}: PageHeaderProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignClass} mb-8 md:mb-12`}>
      {overline && (
        <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-700 dark:text-brand-300">
          {overline}
        </span>
      )}
      <h1
        className={`text-3xl md:text-4xl lg:text-5xl font-bold ${titleColor} tracking-normal leading-none`}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-base md:text-lg lg:text-xl text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="w-[72px] h-px bg-brand-500 mt-2" />
    </div>
  );
}
