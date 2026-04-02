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
    <div className="bg-white py-3 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
          <Link
            href="/"
            className="text-gray-500 hover:text-brand-600 transition-colors duration-150"
          >
            หน้าแรก
          </Link>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <span key={index} className="flex items-center gap-2">
                <span className="text-gray-300 text-xs">&gt;</span>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-brand-600 transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-800 font-medium">
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
