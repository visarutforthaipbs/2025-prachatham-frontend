interface PageHeaderProps {
  /** Overline — short Thai label above the title, e.g. "ข่าวสาร" */
  overline?: string;
  title: string;
  subtitle?: string;
  /** Centred by default */
  align?: "center" | "start";
  /** Heading level — sections inside a page are h2 (one h1 per page). */
  as?: "h1" | "h2";
}

/**
 * Section header: overline → title → subtitle.
 * HIG: hierarchy by size + weight + colour; no letter-spacing or uppercase
 * on Thai (it breaks shaping), no decorative rule under the title.
 */
export default function PageHeader({
  overline,
  title,
  subtitle,
  align = "center",
  as: Heading = "h2",
}: PageHeaderProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-2 ${alignClass} mb-8 md:mb-12`}>
      {overline && (
        <span className="text-sm font-bold text-brand-700 dark:text-brand-200">
          {overline}
        </span>
      )}
      <Heading className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-950 dark:text-gray-50 leading-[1.2]">
        {title}
      </Heading>
      {subtitle && (
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
