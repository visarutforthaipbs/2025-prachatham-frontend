"use client";

import { WordPressPost } from "@/lib/wordpress";
import PostCard from "./PostCard";
import { PostCardSkeleton } from "./LoadingSkeleton";

interface SearchResultsProps {
  posts: WordPressPost[];
  loading: boolean;
  error: string | null;
  query: string;
  totalPages: number;
  currentPage: number;
  onLoadMore: () => void;
}

export default function SearchResults({
  posts,
  loading,
  error,
  query,
  totalPages,
  currentPage,
  onLoadMore,
}: SearchResultsProps) {
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md p-4 text-red-800 dark:text-red-300">
        เกิดข้อผิดพลาด: {error}
      </div>
    );
  }

  if (!loading && posts.length === 0 && query) {
    return (
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-md p-4 text-blue-800 dark:text-blue-300">
        ไม่พบผลการค้นหาสำหรับ &ldquo;{query}&rdquo;
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Results header */}
      {query && posts.length > 0 && (
        <div>
          <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 break-words">
            ผลการค้นหาสำหรับ &ldquo;{query}&rdquo; ({posts.length} รายการ)
          </p>
        </div>
      )}

      {/* Results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} highlightQuery={query} />
        ))}
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <PostCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {/* Load more button */}
      {!loading && currentPage < totalPages && (
        <div className="text-center">
          <button
            onClick={onLoadMore}
            className="btn-outline-green"
          >
            โหลดเพิ่มเติม
          </button>
        </div>
      )}
    </div>
  );
}
