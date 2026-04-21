import Link from "next/link";
import { Metadata } from "next";
import { wordpressApi } from "@/lib/wordpress";
import PaginatedPostGrid from "@/components/PaginatedPostGrid";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `หมวดหมู่: ${slug} | ประชาธรรม`,
    description: `บทความทั้งหมดในหมวดหมู่ ${slug}`,
  };
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  let posts: Awaited<ReturnType<typeof wordpressApi.getPostsByCategory>>["posts"] = [];
  let totalPages = 1;
  let categoryName = slug;
  let error: string | null = null;

  try {
    const data = await wordpressApi.getPostsByCategory(slug, 1);
    posts = data.posts;
    totalPages = data.totalPages;

    const found = posts[0]?._embedded?.["wp:term"]?.[0]?.find(
      (cat) => cat.slug === slug
    );
    if (found) categoryName = found.name;
  } catch (err) {
    console.error("Failed to fetch category posts:", err);
    error = "ไม่สามารถโหลดบทความได้ในขณะนี้";
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
            <Link href="/" className="hover:text-brand-600 transition-colors">
              หน้าแรก
            </Link>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <Link href="/posts" className="hover:text-brand-600 transition-colors">
              บทความ
            </Link>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-700 dark:text-gray-200 font-medium">{categoryName}</span>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-brand-700 dark:text-brand-400 mb-4">
            หมวดหมู่: {categoryName}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            บทความทั้งหมดในหมวดหมู่นี้
          </p>
        </div>

        {error ? (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md p-6 text-red-800 dark:text-red-300 text-center">
            <p className="text-lg">{error}</p>
          </div>
        ) : (
          <PaginatedPostGrid
            initialPosts={posts}
            initialTotalPages={totalPages}
            categorySlug={slug}
          />
        )}
      </div>
    </div>
  );
}
