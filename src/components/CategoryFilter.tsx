import Link from "next/link";
import { WordPressCategory } from "@/lib/wordpress";

interface CategoryFilterProps {
  categories: WordPressCategory[];
  activeCategory?: string;
}

export default function CategoryFilter({
  categories,
  activeCategory,
}: CategoryFilterProps) {
  const allCategoriesActive = !activeCategory;
  const primaryCategories = categories.slice(0, 2);
  const secondaryCategories = categories.slice(2);

  return (
    <div className="mb-8 border-y border-gray-200 dark:border-gray-800 py-4">
      <p className="text-xs font-semibold mb-3 text-gray-500 dark:text-gray-400 tracking-[0.18em] uppercase">
        หมวดหมู่
      </p>
      <div className="hidden md:flex gap-2 overflow-x-auto pb-1">
        {/* All Categories Button */}
        <Link href="/posts" className="hover:no-underline">
          <span
            className={`inline-flex items-center min-h-[44px] whitespace-nowrap text-base font-medium rounded-full px-4 py-1.5 cursor-pointer border transition-colors duration-200 hover:-translate-y-px ${
              allCategoriesActive
                ? "bg-brand-600 text-white border-brand-600 hover:bg-brand-700"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:border-brand-300 dark:hover:border-brand-700"
            }`}
          >
            ทั้งหมด
          </span>
        </Link>

        {/* Category Tags */}
        {categories.map((category) => {
          const isActive = activeCategory === category.slug;
          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="hover:no-underline"
            >
              <span
                className={`inline-flex items-center min-h-[44px] whitespace-nowrap text-base font-medium rounded-full px-4 py-1.5 cursor-pointer border transition-colors duration-200 hover:-translate-y-px ${
                  isActive
                    ? "bg-brand-600 text-white border-brand-600 hover:bg-brand-700"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:border-brand-300 dark:hover:border-brand-700"
                }`}
              >
                {category.name} ({category.count})
              </span>
            </Link>
          );
        })}
      </div>

      <div className="md:hidden flex flex-col gap-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <Link href="/posts" className="hover:no-underline">
            <span
              className={`inline-flex items-center min-h-[44px] whitespace-nowrap text-base font-medium rounded-full px-4 py-1.5 cursor-pointer border transition-colors duration-200 ${
                allCategoriesActive
                  ? "bg-brand-600 text-white border-brand-600"
                  : "bg-white dark:bg-forest-900 text-gray-700 dark:text-gray-200 border-black/10 dark:border-white/15 hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-forest-800"
              }`}
            >
              ทั้งหมด
            </span>
          </Link>

          {primaryCategories.map((category) => {
            const isActive = activeCategory === category.slug;
            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="hover:no-underline"
              >
                <span
                  className={`inline-flex items-center min-h-[44px] whitespace-nowrap text-base font-medium rounded-full px-4 py-1.5 cursor-pointer border transition-colors duration-200 ${
                    isActive
                      ? "bg-brand-600 text-white border-brand-600"
                      : "bg-white dark:bg-forest-900 text-gray-700 dark:text-gray-200 border-black/10 dark:border-white/15 hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-forest-800"
                  }`}
                >
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>

        {secondaryCategories.length > 0 && (
          <details className="group">
            <summary className="inline-flex items-center min-h-[44px] cursor-pointer text-base font-bold text-brand-700 dark:text-brand-200 list-none">
              หมวดหมู่เพิ่มเติม
            </summary>
            <div className="flex flex-wrap gap-2 pt-3">
              {secondaryCategories.map((category) => {
                const isActive = activeCategory === category.slug;
                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="hover:no-underline"
                  >
                    <span
                      className={`inline-flex items-center min-h-[44px] text-base font-medium rounded-full px-4 py-1.5 cursor-pointer border transition-colors duration-200 ${
                        isActive
                          ? "bg-brand-600 text-white border-brand-600"
                          : "bg-white dark:bg-forest-900 text-gray-700 dark:text-gray-200 border-black/10 dark:border-white/15 hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-forest-800"
                      }`}
                    >
                      {category.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
