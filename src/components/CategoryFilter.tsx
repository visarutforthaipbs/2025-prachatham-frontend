"use client";

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

  return (
    <div className="mb-8">
      <p className="text-sm font-semibold mb-3 text-gray-500 tracking-wide uppercase">
        หมวดหมู่
      </p>
      <div className="flex flex-wrap gap-2">
        {/* All Categories Button */}
        <Link href="/posts" className="hover:no-underline">
          <span
            className={`inline-block text-sm font-medium rounded-full px-4 py-2 cursor-pointer border transition-all duration-200 hover:-translate-y-px hover:shadow-sm ${
              allCategoriesActive
                ? "bg-brand-600 text-white border-brand-600 hover:bg-brand-700"
                : "bg-white text-gray-600 border-gray-200 hover:bg-brand-50 hover:border-brand-300"
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
                className={`inline-block text-sm font-medium rounded-full px-4 py-2 cursor-pointer border transition-all duration-200 hover:-translate-y-px hover:shadow-sm ${
                  isActive
                    ? "bg-brand-600 text-white border-brand-600 hover:bg-brand-700"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-brand-50 hover:border-brand-300"
                }`}
              >
                {category.name} ({category.count})
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
