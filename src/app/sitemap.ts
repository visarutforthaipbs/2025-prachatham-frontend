import { MetadataRoute } from "next";
import { wordpressApi } from "@/lib/wordpress";
import { SITE_URL } from "@/lib/site-url";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  try {
    // Every published post (272+) — Google can only rank www URLs it has
    // been told about; the old 50-post cap left ~80% of the archive on cms.
    const posts = await wordpressApi.getAllPostSlugs();

    // Projects (small custom post type)
    const { projects } = await wordpressApi.getProjects({ perPage: 100 });

    // Fetch categories for dynamic sitemap routing
    const categories = await wordpressApi.getCategories();

    const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.modified || post.date),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.date),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    const categoryUrls: MetadataRoute.Sitemap = categories
      .filter((cat) => cat.count > 0)
      .map((cat) => ({
        url: `${baseUrl}/category/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      }));

    const staticUrls: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/posts`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/causes`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/donate`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      },
      {
        url: `${baseUrl}/publications`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      },
    ];

    return [...staticUrls, ...postUrls, ...projectUrls, ...categoryUrls];
  } catch (error) {
    console.error("Failed to generate dynamic sitemap, returning static nodes only:", error);
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${baseUrl}/posts`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      }
    ];
  }
}
