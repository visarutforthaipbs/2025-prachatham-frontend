"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import {
  wordpressApi,
  WordPressPost,
  WordPressCategory,
} from "@/lib/wordpress";
import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function PostsPage() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [categories, setCategories] = useState<WordPressCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPosts = useCallback(async (page: number = 1) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const [postsData, categoriesData] = await Promise.all([
        wordpressApi.getPostsExcludingCategories(["publication"], {
          page,
          per_page: 12,
        }),
        page === 1 ? wordpressApi.getCategories() : Promise.resolve([]),
      ]);

      if (page === 1) {
        setPosts(postsData.posts);
        if (categoriesData.length > 0) {
          setCategories(categoriesData);
        }
      } else {
        setPosts((prev) => [...prev, ...postsData.posts]);
      }

      setCurrentPage(page);
      setTotalPages(postsData.totalPages);
      setError(null);
    } catch (err) {
      setError("ไม่สามารถโหลดบทความได้");
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadPosts(1);
  }, [loadPosts]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      loadPosts(currentPage + 1);
    }
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-6 text-red-800 text-center">
          <p className="text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col gap-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-brand-600 transition-colors duration-150">
            หน้าแรก
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium">
            บทความ
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-700 mb-3 tracking-tight">
            บทความทั้งหมด
          </h1>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
            ข่าวสารและบทความ
          </p>
          <div className="w-[60px] h-[3px] bg-brand-500 rounded-full mx-auto mt-4" />
        </div>

        {/* Category Filter */}
        {categories.length > 0 && <CategoryFilter categories={categories} />}

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Load More Button */}
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
        ) : !loading ? (
          <div className="text-center py-12 bg-gray-50 rounded-md">
            <p className="text-gray-500 text-lg">
              ยังไม่มีบทความ
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LoadingSkeleton count={12} />
          </div>
        )}
      </div>
    </div>
  );
}
