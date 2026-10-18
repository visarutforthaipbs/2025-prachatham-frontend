"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="bg-white dark:bg-forest-950 py-1 border-b border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
          <Link
            href="/"
            className="inline-flex items-center min-h-[44px] whitespace-nowrap text-gray-600 dark:text-gray-300 hover:text-brand-700 dark:hover:text-brand-200 transition-colors duration-150"
          >
            หน้าแรก
          </Link>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <span key={index} className="flex items-center gap-2">
                <span aria-hidden="true" className="text-gray-400">/</span>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="inline-flex items-center min-h-[44px] whitespace-nowrap text-gray-600 dark:text-gray-300 hover:text-brand-700 dark:hover:text-brand-200 transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-800 dark:text-gray-100 font-medium truncate" aria-current="page">
                    {item.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
