import { Metadata } from "next";
import { wordpressApi, decodeHtmlEntities } from "@/lib/wordpress";
import { normalizeWordPressMediaUrl } from "@/lib/image-urls";
import { pickHeroSlides } from "@/lib/hero-slides";
import type { HeroSlideView } from "@/components/HeroSlideshow";
import HomePageClient from "./HomePageClient";

// First hero slide is always the house photo: static, preloaded (fast LCP),
// and the hero still works when the CMS is unreachable.
const HOUSE_HERO: HeroSlideView = { src: "/images/hero-1-page-1.jpg", alt: "" };
const FEATURED_NEWS_COUNT = 6;
const HERO_PHOTO_SOURCE_POSTS = 20; // scan recent featured posts for usable photos
const MAX_HERO_PHOTOS = 5;

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
      (cat) =>
        cat.name === "ข่าวเด่น" ||
        cat.slug === "featured-news" ||
        cat.slug === "featured"
    );

    if (featuredCategory) {
      // One request feeds both the news grid (first 6) and the hero photos.
      const postsData = await wordpressApi.getPosts({
        categories: featuredCategory.id.toString(),
        per_page: HERO_PHOTO_SOURCE_POSTS,
      });
      const heroPhotos: HeroSlideView[] = pickHeroSlides(
        postsData.posts,
        MAX_HERO_PHOTOS
      ).map((s) => ({
        ...s,
        src: normalizeWordPressMediaUrl(s.src),
        title: decodeHtmlEntities(s.title),
      }));
      return {
        posts: postsData.posts.slice(0, FEATURED_NEWS_COUNT),
        heroSlides: [HOUSE_HERO, ...heroPhotos],
      };
    } else {
      return {
        posts: [],
        heroSlides: [HOUSE_HERO],
      };
    }
  } catch (error) {
    console.error("Error fetching featured news:", error);
    return {
      posts: [],
      heroSlides: [HOUSE_HERO],
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

async function getTopCategories() {
  try {
    const categories = await wordpressApi.getCategories();
    // Hide the "featured news" bucket — it's already the home hero feed.
    return categories.filter(
      (cat) =>
        cat.name !== "ข่าวเด่น" &&
        cat.slug !== "featured-news" &&
        cat.slug !== "featured"
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function HomePage() {
  // Fetch featured posts, latest projects, and categories in parallel
  const [{ posts: featuredPosts, heroSlides }, { projects: latestProjects }, categories] =
    await Promise.all([
      getFeaturedNews(),
      getLatestProjects(),
      getTopCategories(),
    ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://www.prachatham.com/",
    "name": "ประชาธรรม | มูลนิธิสนับสนุนสื่อภาคประชาชน",
    "description": "เราคือกลุ่มคนที่ต้องการสนับสนุนให้เกิดการเปลี่ยนแปลงผ่านการสื่อสารจากคนในท้องถิ่นเอง สนับสนุนให้ผู้คนบอกเล่าเรื่องราวด้วยตัวเอง",
    "publisher": {
      "@type": "Organization",
      "name": "มูลนิธิประชาธรรม (Prachatham Foundation)",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.prachatham.com/new-favicon.svg"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePageClient
        heroSlides={heroSlides}
        featuredPosts={featuredPosts}
        latestProjects={latestProjects}
        categories={categories}
      />
    </>
  );
}
