"use client";

import { WordPressPost } from "@/lib/wordpress";
import PostCard from "./PostCard";
import LoadingSkeleton from "./LoadingSkeleton";

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
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
        เกิดข้อผิดพลาด: {error}
      </div>
    );
  }

  if (!loading && posts.length === 0 && query) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-blue-800">
        ไม่พบผลการค้นหาสำหรับ &ldquo;{query}&rdquo;
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Results header */}
      {query && posts.length > 0 && (
        <div>
          <p className="text-lg font-semibold text-gray-700">
            ผลการค้นหาสำหรับ &ldquo;{query}&rdquo; ({posts.length} รายการ)
          </p>
        </div>
      )}

      {/* Results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {loading && <LoadingSkeleton count={6} />}
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
