"use client";

import { useTheme } from "@/lib/theme";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Prevent hydration mismatch — render a placeholder
    return (
      <button
        className="p-2 rounded-md text-gray-400 hover:bg-gray-100 transition-colors"
        aria-label="สลับธีม"
      >
        <span className="w-4 h-4 block" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors"
      aria-label={isDark ? "สลับเป็นโหมดสว่าง" : "สลับเป็นโหมดมืด"}
      title={isDark ? "โหมดสว่าง" : "โหมดมืด"}
    >
      {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
    </button>
  );
}
