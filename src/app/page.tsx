import { Metadata } from "next";
import { wordpressApi } from "@/lib/wordpress";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "ประชาธรรม | มูลนิธิสนับสนุนสื่อภาคประชาชน",
  description:
    "เราคือกลุ่มคนที่ต้องการสนับสนุนให้เกิดการเปลี่ยนแปลงผ่านการสื่อสารจากคนในท้องถิ่นเอง สนับสนุนให้ผู้คนบอกเล่าเรื่องราวด้วยตัวเอง",
  openGraph: {
    title: "ประชาธรรม | มูลนิธิสนับสนุนสื่อภาคประชาชน",
    description:
      "เราคือกลุ่มคนที่ต้องการสนับสนุนให้เกิดการเปลี่ยนแปลงผ่านการสื่อสารจากคนในท้องถิ่นเอง สนับสนุนให้ผู้คนบอกเล่าเรื่องราวด้วยตัวเอง",
    images: [
      // Add this!
      {
        url: "/images/hero-1-page-1.jpg",
        width: 1200,
        height: 630,
        alt: "ประชาธรรม | มูลนิธิสนับสนุนสื่อภาคประชาชน",
      },
    ],
  },
};

// Revalidate every 60 seconds
export const revalidate = 60;

async function getFeaturedNews() {
  try {
    // First, get the "ข่าวเด่น" category
    const categories = await wordpressApi.getCategories();
    const featuredCategory = categories.find(
      (cat) => cat.name === "ข่าวเด่น" || cat.slug === "featured-news"
    );

    if (featuredCategory) {
      // Fetch posts from the featured news category
      const postsData = await wordpressApi.getPosts({
        categories: featuredCategory.id.toString(),
        per_page: 6,
      });
      return {
        posts: postsData.posts,
      };
    } else {
      return {
        posts: [],
      };
    }
  } catch (error) {
    console.error("Error fetching featured news:", error);
    return {
      posts: [],
    };
  }
}

async function getLatestProjects() {
  try {
    const { projects } = await wordpressApi.getProjects({
      perPage: 3,
    });
    return {
      projects: projects,
    };
  } catch (error) {
    console.error("Error fetching latest projects:", error);
    return {
      projects: [],
    };
  }
}

export default async function HomePage() {
  // Fetch featured posts
  const { posts: featuredPosts } = await getFeaturedNews();

  // Fetch latest projects
  const { projects: latestProjects } = await getLatestProjects();

  return (
    <HomePageClient
      featuredPosts={featuredPosts}
      latestProjects={latestProjects}
    />
  );
}
