import Link from "next/link";
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
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-700 dark:text-brand-400 mb-3 tracking-tight">
            บทความทั้งหมด
          </h1>
          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            ข่าวสารและบทความ
          </p>
          <div className="w-[60px] h-[3px] bg-brand-500 rounded-full mx-auto mt-4" />
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
