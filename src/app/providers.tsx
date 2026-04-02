"use client";

import { BatchViewCountProvider } from "@/components/BatchViewCountProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <BatchViewCountProvider>{children}</BatchViewCountProvider>;
}
