"use client";

import { useState, useCallback } from "react";
import { wordpressApi, WordPressPost } from "@/lib/wordpress";
import PostCard from "./PostCard";
import { PostCardSkeleton } from "./LoadingSkeleton";

interface PaginatedPostGridProps {
  initialPosts: WordPressPost[];
  initialTotalPages: number;
  categorySlug?: string;
  excludeCategories?: string[];
  searchQuery?: string;
}

export default function PaginatedPostGrid({
  initialPosts,
  initialTotalPages,
  categorySlug,
  excludeCategories,
  searchQuery,
}: PaginatedPostGridProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = useCallback(async () => {
    if (currentPage >= totalPages) return;
    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      let data;

      if (searchQuery) {
        data = await wordpressApi.searchPosts(searchQuery, nextPage);
      } else if (categorySlug) {
        data = await wordpressApi.getPostsByCategory(categorySlug, nextPage);
      } else {
        data = await wordpressApi.getPostsExcludingCategories(
          excludeCategories || [],
          { page: nextPage, per_page: 12 }
        );
      }

      setPosts((prev) => [...prev, ...data.posts]);
      setCurrentPage(nextPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Load more error:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [currentPage, totalPages, categorySlug, excludeCategories, searchQuery]);

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-md">
        <p className="text-gray-500 text-lg">ยังไม่มีบทความ</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {loadingMore &&
          Array.from({ length: 6 }).map((_, i) => (
            <PostCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {currentPage < totalPages && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="btn-outline-green rounded-full px-8 border-2 hover:bg-brand-50 hover:-translate-y-px transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingMore ? "กำลังโหลด..." : "โหลดเพิ่มเติม"}
          </button>
        </div>
      )}
    </div>
  );
}
