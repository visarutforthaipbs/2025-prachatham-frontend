"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { wordpressApi, WordPressPost } from "@/lib/wordpress";
import PostCard from "@/components/PostCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function PublicationsPage() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPosts = useCallback(async (page: number) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const data = await wordpressApi.getPostsByCategory("publication", page);

      if (page === 1) {
        setPosts(data.posts);
      } else {
        setPosts((prev) => [...prev, ...data.posts]);
      }

      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (err) {
      setError("ไม่สามารถโหลดข้อมูลสิ่งพิมพ์ได้");
      console.error("Error loading publications:", err);
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
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <p className="text-red-500 text-lg">{error}</p>
            <button className="mt-4 btn-primary" onClick={() => loadPosts(1)}>
              ลองใหม่อีกครั้ง
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-brand-600 transition-colors">
            หน้าแรก
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium">สิ่งพิมพ์</span>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-brand-700 mb-4">
            สิ่งพิมพ์
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            รวบรวมสิ่งพิมพ์ คู่มือ และเอกสารต่างๆ ของประชาธรรม
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <LoadingSkeleton />
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">
              ไม่พบสิ่งพิมพ์
            </h3>
            <p className="text-gray-500">ขณะนี้ยังไม่มีสิ่งพิมพ์ในหมวดหมู่นี้</p>
          </div>
        ) : (
          <>
            {/* Publications Grid */}
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
                  className="btn-outline-green rounded-full px-8 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? "กำลังโหลด..." : "โหลดเพิ่มเติม"}
                </button>
              </div>
            )}
          </>
        )}

        {/* Notice */}
        <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            ต้องการสิ่งพิมพ์เพิ่มเติม?
          </h3>
          <p className="text-gray-600 mb-4">
            หากคุณต้องการสิ่งพิมพ์หรือเอกสารเพิ่มเติม
            กรุณาติดต่อเราผ่านช่องทางต่างๆ
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              ติดต่อเรา
            </Link>
            <Link href="/posts" className="btn-outline-green">
              ดูข่าวสารทั้งหมด
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
