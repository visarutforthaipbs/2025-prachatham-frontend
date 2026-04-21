"use client";

import { useState, useCallback, useEffect } from "react";
import { wordpressApi, WordPressPost } from "@/lib/wordpress";

interface PaginatedPostsResult {
  posts: WordPressPost[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  loadPage: (page: number) => Promise<void>;
  loadMore: () => void;
}

interface UsePaginatedPostsOptions {
  perPage?: number;
  searchQuery?: string;
  excludeCategories?: string[];
}

export function usePaginatedPosts(
  options: UsePaginatedPostsOptions = {}
): PaginatedPostsResult {
  const { perPage = 12, searchQuery, excludeCategories } = options;

  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPage = useCallback(
    async (page: number) => {
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
            excludeCategories || [],
            { page, per_page: perPage }
          );
        }

        if (page === 1) {
          setPosts(data.posts);
        } else {
          setPosts((prev) => [...prev, ...data.posts]);
        }

        setCurrentPage(page);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(searchQuery ? "เกิดข้อผิดพลาดในการค้นหา" : "ไม่สามารถโหลดบทความได้");
        console.error("Error loading posts:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [searchQuery, excludeCategories, perPage]
  );

  const loadMore = useCallback(() => {
    if (currentPage < totalPages) {
      loadPage(currentPage + 1);
    }
  }, [currentPage, totalPages, loadPage]);

  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(1);
    loadPage(1);
  }, [searchQuery, loadPage]);

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
