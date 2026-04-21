import Link from "next/link";
import { Metadata } from "next";
import { wordpressApi } from "@/lib/wordpress";
import PaginatedPostGrid from "@/components/PaginatedPostGrid";

export const metadata: Metadata = {
  title: "สิ่งพิมพ์ | ประชาธรรม",
  description: "รวบรวมสิ่งพิมพ์ คู่มือ และเอกสารต่างๆ ของประชาธรรม",
  openGraph: {
    title: "สิ่งพิมพ์ | ประชาธรรม",
    description: "รวบรวมสิ่งพิมพ์ คู่มือ และเอกสารต่างๆ ของประชาธรรม",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "สิ่งพิมพ์ | ประชาธรรม",
    description: "รวบรวมสิ่งพิมพ์ คู่มือ และเอกสารต่างๆ ของประชาธรรม",
    images: ["/images/hero-1-page-1.jpg"],
  },
};

export const dynamic = "force-dynamic";

export default async function PublicationsPage() {
  let posts: Awaited<ReturnType<typeof wordpressApi.getPostsByCategory>>["posts"] = [];
  let totalPages = 1;
  let error: string | null = null;

  try {
    const data = await wordpressApi.getPostsByCategory("publication", 1);
    posts = data.posts;
    totalPages = data.totalPages;
  } catch (err) {
    console.error("Failed to fetch publications:", err);
    error = "ไม่สามารถโหลดสิ่งพิมพ์ได้ในขณะนี้";
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
            <Link href="/" className="hover:text-brand-600 transition-colors">
              หน้าแรก
            </Link>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-700 dark:text-gray-200 font-medium">สิ่งพิมพ์</span>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-brand-700 dark:text-brand-400 mb-4">
            สิ่งพิมพ์
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            รวบรวมสิ่งพิมพ์ คู่มือ และเอกสารต่างๆ ของประชาธรรม
          </p>
        </div>

        {error ? (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md p-6 text-red-800 dark:text-red-300 text-center">
            <p className="text-lg">{error}</p>
          </div>
        ) : (
          <>
            {/* Publications Grid */}
            <PaginatedPostGrid
              initialPosts={posts}
              initialTotalPages={totalPages}
              categorySlug="publication"
            />
          </>
        )}

        {/* Notice */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
            ต้องการสิ่งพิมพ์เพิ่มเติม?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
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
