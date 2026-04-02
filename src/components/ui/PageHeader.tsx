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
        <span className="badge-brand text-sm px-4 py-1.5 rounded-full">
          {overline}
        </span>
      )}
      <h1
        className={`text-2xl md:text-3xl lg:text-4xl font-bold ${titleColor} tracking-tight`}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-base md:text-lg lg:text-xl text-gray-500 max-w-3xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="w-[60px] h-[3px] bg-brand-500 rounded-full mt-2" />
    </div>
  );
}
