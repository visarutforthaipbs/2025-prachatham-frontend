"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { wordpressApi, WordPressPost } from "@/lib/wordpress";

// Cap deep-link restores so /posts?page=999 can't trigger hundreds of fetches
const MAX_INITIAL_PAGES = 10;

interface PaginatedPostsResult {
  posts: WordPressPost[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  loadPage: (page: number) => Promise<boolean>;
  loadMore: () => void;
}

interface UsePaginatedPostsOptions {
  perPage?: number;
  searchQuery?: string;
  excludeCategories?: string[];
  initialPage?: number;
}

export function usePaginatedPosts(
  options: UsePaginatedPostsOptions = {}
): PaginatedPostsResult {
  const { perPage = 12, searchQuery, excludeCategories, initialPage = 1 } = options;
  const normalizedInitialPage = Math.min(
    MAX_INITIAL_PAGES,
    Math.max(1, Math.floor(initialPage) || 1)
  );

  // Re-derive the array from a string key so callers passing an inline
  // array literal don't recreate loadPage (and refetch) on every render.
  const excludeKey = (excludeCategories || []).join(",");
  const stableExcludeCategories = useMemo(
    () => (excludeKey ? excludeKey.split(",") : []),
    [excludeKey]
  );

  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Bumped whenever the query changes or the hook unmounts, so in-flight
  // requests from a stale query can't write their results into fresh state.
  const generationRef = useRef(0);

  const loadPage = useCallback(
    async (page: number): Promise<boolean> => {
      const generation = generationRef.current;
      try {
        if (page === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }
        setError(null);

        let data;
        if (searchQuery) {
          data = await wordpressApi.searchPosts(searchQuery, page);
        } else {
          data = await wordpressApi.getPostsExcludingCategories(
            stableExcludeCategories,
            { page, per_page: perPage }
          );
        }

        if (generation !== generationRef.current) return false;

        if (page === 1) {
          setPosts(data.posts);
        } else {
          setPosts((prev) => [...prev, ...data.posts]);
        }

        setCurrentPage(page);
        setTotalPages(data.totalPages);
        return true;
      } catch (err) {
        if (generation !== generationRef.current) return false;
        setError(searchQuery ? "เกิดข้อผิดพลาดในการค้นหา" : "ไม่สามารถโหลดบทความได้");
        console.error("Error loading posts:", err);
        return false;
      } finally {
        if (generation === generationRef.current) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    },
    [searchQuery, stableExcludeCategories, perPage]
  );

  const loadMore = useCallback(() => {
    if (currentPage < totalPages) {
      loadPage(currentPage + 1);
    }
  }, [currentPage, totalPages, loadPage]);

  useEffect(() => {
    generationRef.current += 1;
    const generation = generationRef.current;

    setCurrentPage(1);
    setTotalPages(1);
    setPosts([]);

    async function loadInitialPages() {
      for (let page = 1; page <= normalizedInitialPage; page++) {
        if (generation !== generationRef.current) return;
        const ok = await loadPage(page);
        if (!ok) return; // stop restoring pages if one fails (e.g. rate limit)
      }
    }

    loadInitialPages();

    return () => {
      generationRef.current += 1;
    };
  }, [searchQuery, normalizedInitialPage, loadPage]);

  return {
    posts,
    loading,
    loadingMore,
    error,
    currentPage,
    totalPages,
    hasMore: currentPage < totalPages,
    loadPage,
    loadMore,
  };
}
