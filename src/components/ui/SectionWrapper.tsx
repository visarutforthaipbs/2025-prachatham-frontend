import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  /** Background colour — defaults to white */
  bg?: string;
  /** Extra vertical padding preset */
  size?: "sm" | "md" | "lg";
  /** Whether to use narrow max-width */
  narrow?: boolean;
  /** HTML id for anchor links */
  id?: string;
}

const paddingMap = {
  sm: "py-10 md:py-12",
  md: "py-12 md:py-16 lg:py-20",
  lg: "py-16 md:py-20 lg:py-24",
};

/**
 * Consistent section container with responsive padding & max-width.
 */
export default function SectionWrapper({
  children,
  bg = "bg-white",
  size = "md",
  narrow = false,
  id,
}: SectionWrapperProps) {
  return (
    <section className={`${bg} ${paddingMap[size]}`} id={id}>
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${narrow ? "max-w-4xl" : "max-w-7xl"}`}>
        {children}
      </div>
    </section>
  );
}
