"use client";

import Link from "next/link";
import { Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchResults from "@/components/SearchResults";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { usePaginatedPosts } from "@/lib/hooks/usePaginatedPosts";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const {
    posts,
    loading,
    error,
    currentPage,
    totalPages,
    loadMore,
  } = usePaginatedPosts({
    searchQuery: query || undefined,
    perPage: 12,
  });

  // Sync pagination to URL for shareable deep-links
  const handleLoadMore = useCallback(() => {
    loadMore();
    if (query) {
      const nextPage = currentPage + 1;
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(nextPage));
      router.replace(`/search?${params.toString()}`, { scroll: false });
    }
  }, [loadMore, currentPage, query, searchParams, router]);

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
    <Suspense fallback={<LoadingSkeleton type="page" />}>
      <SearchContent />
    </Suspense>
  );
}
