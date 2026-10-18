"use client";

import { ThemeProvider } from "@/lib/theme";
import { BatchViewCountProvider } from "@/components/BatchViewCountProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system">
      <BatchViewCountProvider>{children}</BatchViewCountProvider>
    </ThemeProvider>
  );
}
