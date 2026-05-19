"use client";

import { ThemeProvider } from "@/lib/theme";
import { BatchViewCountProvider } from "@/components/BatchViewCountProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light">
      <BatchViewCountProvider>{children}</BatchViewCountProvider>
    </ThemeProvider>
  );
}
