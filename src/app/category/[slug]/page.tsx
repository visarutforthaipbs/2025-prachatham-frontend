"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { wordpressApi, WordPressPost } from "@/lib/wordpress";
import PostCard from "@/components/PostCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryName, setCategoryName] = useState("");

  const loadPosts = useCallback(
    async (page: number) => {
      try {
        if (page === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const data = await wordpressApi.getPostsByCategory(slug, page);

        if (page === 1) {
          setPosts(data.posts);
          if (data.posts.length > 0) {
            const categories = data.posts[0]._embedded?.["wp:term"]?.[0] || [];
            const category = categories.find(
              (cat: Category) => cat.slug === slug
            );
            if (category) {
              setCategoryName(category.name);
            }
          }
        } else {
          setPosts((prev) => [...prev, ...data.posts]);
        }

        setCurrentPage(page);
        setTotalPages(data.totalPages);
        setError(null);
      } catch (err) {
        setError("ไม่สามารถโหลดบทความได้");
        console.error("Error loading posts:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [slug]
  );

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
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-brand-600 transition-colors">
            หน้าแรก
          </Link>
          <span className="text-gray-300">/</span>
          <Link href="/posts" className="hover:text-brand-600 transition-colors">
            บทความ
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium">
            {categoryName || slug}
          </span>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-brand-700 mb-4">
            หมวดหมู่: {categoryName || slug}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            บทความทั้งหมดในหมวดหมู่นี้
          </p>
        </div>

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
                  className="btn-outline-green disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? "กำลังโหลด..." : "โหลดเพิ่มเติม"}
                </button>
              </div>
            )}
          </div>
        ) : !loading ? (
          <div className="text-center py-12 bg-gray-50 rounded-md">
            <p className="text-gray-500 text-lg">
              ไม่มีบทความในหมวดหมู่นี้
            </p>
            <Link href="/posts" className="inline-block mt-4 btn-outline-green">
              ดูบทความทั้งหมด
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LoadingSkeleton count={6} />
          </div>
        )}
      </div>
    </div>
  );
}
