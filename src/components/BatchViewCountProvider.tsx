"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";

interface BatchViewCountContextType {
  getViewCount: (postId: number) => number | null;
  registerPostId: (postId: number) => void;
}

const BatchViewCountContext = createContext<BatchViewCountContextType>({
  getViewCount: () => null,
  registerPostId: () => {},
});

export function useBatchViewCount() {
  return useContext(BatchViewCountContext);
}

export function BatchViewCountProvider({ children }: { children: React.ReactNode }) {
  const [viewCounts, setViewCounts] = useState<Record<number, number>>({});
  const pendingIds = useRef<Set<number>>(new Set());
  const fetchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchBatch = useCallback(async () => {
    const ids = Array.from(pendingIds.current);
    pendingIds.current.clear();

    if (ids.length === 0) return;

    try {
      const response = await fetch(`/api/views/batch?ids=${ids.join(",")}`);
      if (response.ok) {
        const data = await response.json();
        setViewCounts((prev) => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error("Failed to fetch batch view counts:", err);
    }
  }, []);

  const registerPostId = useCallback(
    (postId: number) => {
      pendingIds.current.add(postId);

      // Debounce: wait 50ms to collect all post IDs, then fetch once
      if (fetchTimer.current) clearTimeout(fetchTimer.current);
      fetchTimer.current = setTimeout(fetchBatch, 50);
    },
    [fetchBatch]
  );

  const getViewCount = useCallback(
    (postId: number) => viewCounts[postId] ?? null,
    [viewCounts]
  );

  useEffect(() => {
    return () => {
      if (fetchTimer.current) clearTimeout(fetchTimer.current);
    };
  }, []);

  return (
    <BatchViewCountContext.Provider value={{ getViewCount, registerPostId }}>
      {children}
    </BatchViewCountContext.Provider>
  );
}
