"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { wordpressApi, WordPressPost } from "@/lib/wordpress";
import SearchResults from "@/components/SearchResults";
import LoadingSkeleton from "@/components/LoadingSkeleton";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchPosts = useCallback(
    async (searchQuery: string, page: number = 1) => {
      if (!searchQuery.trim()) {
        setPosts([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await wordpressApi.searchPosts(searchQuery, page);

        if (page === 1) {
          setPosts(data.posts);
        } else {
          setPosts((prev) => [...prev, ...data.posts]);
        }

        setCurrentPage(page);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError("เกิดข้อผิดพลาดในการค้นหา");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (query) {
      setCurrentPage(1);
      searchPosts(query, 1);
    } else {
      setPosts([]);
    }
  }, [query, searchPosts]);

  const handleLoadMore = () => {
    if (currentPage < totalPages && query) {
      searchPosts(query, currentPage + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-brand-600 transition-colors">
            หน้าแรก
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium">
            ผลการค้นหา
          </span>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-brand-700 mb-4">
            ผลการค้นหา
          </h1>
          {query && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ค้นหาด้วยคำว่า &ldquo;{query}&rdquo;
            </p>
          )}
        </div>

        {/* Search Results */}
        {query ? (
          <SearchResults
            posts={posts}
            loading={loading}
            error={error}
            query={query}
            totalPages={totalPages}
            currentPage={currentPage}
            onLoadMore={handleLoadMore}
          />
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-md">
            <p className="text-gray-500 text-lg">
              กรุณาพิมพ์คำที่ต้องการค้นหา
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SearchContent />
    </Suspense>
  );
}
