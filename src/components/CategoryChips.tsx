import Link from "next/link";
import type { WordPressCategory } from "@/lib/wordpress";

interface CategoryChipsProps {
  categories: WordPressCategory[];
  /** Optional slug of the currently active category to highlight. */
  activeSlug?: string;
  /** Max number of chips to show. Defaults to 12. */
  limit?: number;
}

/**
 * Horizontally-scrollable bar of category links.
 * Mobile-first: swipe-scrolls with snap, hides the scrollbar, never wraps.
 * Lets readers jump straight to a topic instead of hunting through the menu.
 */
export default function CategoryChips({
  categories,
  activeSlug,
  limit = 12,
}: CategoryChipsProps) {
  const items = [...categories]
    .filter((cat) => cat.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

  if (items.length === 0) return null;

  return (
    <nav aria-label="หมวดหมู่" className="relative">
      <ul className="flex gap-2 overflow-x-auto snap-x scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap py-1">
        {items.map((category) => {
          const active = category.slug === activeSlug;
          return (
            <li key={category.id} className="snap-start shrink-0">
              <Link
                href={`/category/${category.slug}`}
                className={`inline-flex items-center whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 hover:no-underline ${
                  active
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-black/10 bg-white text-gray-700 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 dark:border-white/15 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
