import { wordpressApi, WordPressPost } from "@/lib/wordpress";
import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ประชาธรรม | สื่อสิ่งแวดล้อมไทย - หน้าแรก",
  description:
    "ศูนย์กลางข่าวสารและบทความด้านสิ่งแวดล้อม การอนุรักษ์ธรรมชาติ และการพัฒนาที่ยั่งยืนในประเทศไทย",
  openGraph: {
    title: "ประชาธรรม | สื่อสิ่งแวดล้อมไทย",
    description:
      "ศูนย์กลางข่าวสารและบทความด้านสิ่งแวดล้อม การอนุรักษ์ธรรมชาติ และการพัฒนาที่ยั่งยืนในประเทศไทย",
  },
};

export const revalidate = 60;

async function getHomePageData() {
  try {
    const [postsData, categories] = await Promise.all([
      wordpressApi.getPosts({ per_page: 12 }),
      wordpressApi.getCategories(),
    ]);

    return {
      posts: postsData.posts,
      categories,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return {
      posts: [],
      categories: [],
      error: "ไม่สามารถโหลดข้อมูลได้",
    };
  }
}

export default async function HomePage() {
  const { posts, categories, error } = await getHomePageData();

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
        {/* Hero Section */}
        <div className="text-center py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-700 mb-4">
            ยินดีต้อนรับสู่ประชาธรรม
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            ศูนย์กลางข่าวสารและบทความด้านสิ่งแวดล้อม การอนุรักษ์ธรรมชาติ
            และการพัฒนาที่ยั่งยืนในประเทศไทย
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && <CategoryFilter categories={categories} />}

        {/* Featured Posts Section */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-6">
            บทความล่าสุด
          </h2>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: WordPressPost) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-md">
              <p className="text-gray-500 text-lg">ยังไม่มีบทความ</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-brand-50 rounded-lg p-8 text-center border border-brand-200">
          <h3 className="text-xl md:text-2xl font-bold text-brand-700 mb-4">
            ร่วมเป็นส่วนหนึ่งในการอนุรักษ์สิ่งแวดล้อม
          </h3>
          <p className="text-gray-600 max-w-xl mx-auto">
            ติดตามข่าวสารและความรู้ด้านสิ่งแวดล้อมเพื่อสร้างสรรค์อนาคตที่ยั่งยืน
            สำหรับคนรุ่นต่อไป
          </p>
        </div>
      </div>
    </div>
  );
}
