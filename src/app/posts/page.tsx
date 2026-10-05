import Link from "next/link";
import { FaRss } from "react-icons/fa";
import { Metadata } from "next";
import { wordpressApi } from "@/lib/wordpress";
import CategoryFilter from "@/components/CategoryFilter";
import PaginatedPostGrid from "@/components/PaginatedPostGrid";

export const metadata: Metadata = {
  title: "บทความทั้งหมด | ประชาธรรม",
  description: "ข่าวสารและบทความจากมูลนิธิสื่อประชาธรรม",
  openGraph: {
    title: "บทความทั้งหมด | ประชาธรรม",
    description: "ข่าวสารและบทความจากมูลนิธิสื่อประชาธรรม",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "บทความทั้งหมด | ประชาธรรม",
    description: "ข่าวสารและบทความจากมูลนิธิสื่อประชาธรรม",
    images: ["/images/hero-1-page-1.jpg"],
  },
};

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  let posts: Awaited<ReturnType<typeof wordpressApi.getPostsExcludingCategories>>["posts"] = [];
  let totalPages = 1;
  let categories: Awaited<ReturnType<typeof wordpressApi.getCategories>> = [];
  let error: string | null = null;

  try {
    const [postsData, catsData] = await Promise.all([
      wordpressApi.getPostsExcludingCategories(["publication"], {
        page: 1,
        per_page: 12,
      }),
      wordpressApi.getCategories(),
    ]);
    posts = postsData.posts;
    totalPages = postsData.totalPages;
    categories = catsData;
  } catch (err) {
    console.error("Failed to fetch posts or categories:", err);
    error = "ไม่สามารถโหลดบทความได้ในขณะนี้";
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col gap-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
            <Link href="/" className="hover:text-brand-600 transition-colors duration-150">
              หน้าแรก
            </Link>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-700 dark:text-gray-200 font-medium">บทความ</span>
          </div>
        </nav>

        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-brand-700 dark:text-brand-300 mb-3">
              คลังบทความ
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-950 dark:text-gray-50 leading-tight">
              บทความทั้งหมด
            </h1>
            <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
              ข่าวสาร บทความ และเรื่องเล่าจากชุมชนที่ชวนมองการเปลี่ยนแปลงผ่านสายตาของคนในพื้นที่
            </p>
          </div>
          <a
            href="/feed.xml"
            className="inline-flex items-center gap-2 self-start md:self-auto shrink-0 rounded-full border border-brand-600 bg-white dark:bg-transparent px-5 py-2.5 text-sm font-semibold text-brand-700 dark:text-brand-300 dark:border-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/40 hover:shadow-[0_8px_30px_-4px_rgba(3,139,113,0.35)] hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            <FaRss className="w-4 h-4" aria-hidden="true" />
            ติดตามผ่าน RSS
          </a>
        </div>

        {error ? (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md p-6 text-red-800 dark:text-red-300 text-center">
            <p className="text-lg">{error}</p>
          </div>
        ) : (
          <>
            {/* Category Filter */}
            {categories.length > 0 && <CategoryFilter categories={categories} />}

            {/* Posts Grid */}
            <PaginatedPostGrid
              initialPosts={posts}
              initialTotalPages={totalPages}
              excludeCategories={["publication"]}
            />
          </>
        )}
      </div>
    </div>
  );
}
