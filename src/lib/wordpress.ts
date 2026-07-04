import { wpRestRoute } from "./wp-config";

// Types for WordPress API responses

// Helper function to build API URLs based on environment.
// Browser requests go through local proxy routes; server requests can hit
// WordPress directly, which keeps builds from depending on a running Next app.
function buildApiUrl(resource: string, params?: URLSearchParams) {
  const queryString = params?.toString();

  if (typeof window !== "undefined") {
    return `/api/${resource}${queryString ? `?${queryString}` : ""}`;
  }

  const url = new URL(wpRestRoute(resource));
  params?.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
}
export interface WordPressPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  categories: number[];
  featured_media: number;
  acf?: {
    authornamepost?: string;
    [key: string]: string | number | boolean | null | undefined;
  };
  views?: number; // Optional views count from the Post Views plugin
  post_views?: number; // Some plugins use this key instead
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
      mime_type: string;
      media_details: {
        width: number;
        height: number;
        sizes: {
          [key: string]: {
            source_url: string;
            width: number;
            height: number;
          };
        };
      };
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
      }>
    >;
  };
}

export interface WordPressProject {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  acf?: {
    project_duration?: string;
    project_location?: string;
    project_partners?: string;
    project_beneficiaries?: string;
    featured_project?: boolean;
    "related-project-news"?: string;
    projectStatus?: string;
    [key: string]: string | number | boolean | null | undefined;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
      media_details: {
        width: number;
        height: number;
        sizes: {
          [key: string]: {
            source_url: string;
            width: number;
            height: number;
          };
        };
      };
    }>;
  };
}

export interface WordPressCategory {
  id: number;
  count: number;
  name: string;
  slug: string;
  description: string;
}

export interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      [key: string]: {
        source_url: string;
        width: number;
        height: number;
      };
    };
  };
}

export class WordPressAPI {
  constructor() {
    // No need for axios client anymore - using fetch with proxy routes
  }

  // Get posts with pagination and embedding
  async getPosts(
    params: {
      page?: number;
      per_page?: number;
      categories?: string;
      search?: string;
    } = {}
  ): Promise<{ posts: WordPressPost[]; totalPages: number; total: number }> {
    try {
      const searchParams = new URLSearchParams({
        _embed: "true",
        per_page: (params.per_page || 12).toString(),
        page: (params.page || 1).toString(),
        _fields: "id,date,slug,title,excerpt,featured_media,categories,acf,_links,_embedded",
        ...(params.categories && { categories: params.categories }),
        ...(params.search && { search: params.search }),
      });

      const url = buildApiUrl("posts", searchParams);

      const response = await fetch(url, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const posts = await response.json();
      const totalPages = parseInt(
        response.headers.get("X-WP-TotalPages") || "1"
      );
      const total = parseInt(response.headers.get("X-WP-Total") || "0");

      return {
        posts,
        totalPages,
        total,
      };
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Failed to fetch posts");
    }
  }

  // Get a single post by slug
  async getPostBySlug(slug: string): Promise<WordPressPost | null> {
    try {
      const searchParams = new URLSearchParams({
        slug,
        _embed: "true",
        acf: "true",
      });

      const response = await fetch(buildApiUrl("posts", searchParams), {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return Array.isArray(data) ? data[0] || null : data;
    } catch (error) {
      console.error("Error fetching post by slug:", error);
      return null;
    }
  }

  // Get categories
  async getCategories(): Promise<WordPressCategory[]> {
    try {
      const searchParams = new URLSearchParams({
        per_page: "100",
        hide_empty: "true",
      });

      const url = buildApiUrl("categories", searchParams);

      const response = await fetch(url, {
        next: { revalidate: 300 },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Failed to fetch categories");
    }
  }

  // Search posts
  async searchPosts(
    query: string,
    page = 1
  ): Promise<{ posts: WordPressPost[]; totalPages: number }> {
    try {
      const searchParams = new URLSearchParams({
        search: query,
        _embed: "true",
        per_page: "12",
        page: page.toString(),
        _fields: "id,date,slug,title,excerpt,featured_media,categories,acf,_links,_embedded",
      });

      const url = buildApiUrl("posts", searchParams);

      const response = await fetch(url, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const posts = await response.json();
      const totalPages = parseInt(
        response.headers.get("X-WP-TotalPages") || "1"
      );

      return {
        posts,
        totalPages,
      };
    } catch (error) {
      console.error("Error searching posts:", error);
      throw new Error("Failed to search posts");
    }
  }

  // Get posts by category
  async getPostsByCategory(
    categorySlug: string,
    page = 1
  ): Promise<{ posts: WordPressPost[]; totalPages: number }> {
    try {
      // First get the category ID
      const categoriesParams = new URLSearchParams({ slug: categorySlug });
      const categoriesResponse = await fetch(
        buildApiUrl("categories", categoriesParams),
        {
          next: { revalidate: 300 },
        }
      );

      if (!categoriesResponse.ok) {
        throw new Error("Failed to fetch categories");
      }

      const categories = await categoriesResponse.json();
      if (!categories.length) {
        throw new Error("Category not found");
      }

      const categoryId = categories[0].id;

      const postsParams = new URLSearchParams({
        categories: categoryId.toString(),
        _embed: "true",
        per_page: "12",
        page: page.toString(),
        _fields: "id,date,slug,title,excerpt,featured_media,categories,acf,_links,_embedded",
      });

      const response = await fetch(
        buildApiUrl("posts", postsParams),
        {
          next: { revalidate: 60 },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const posts = await response.json();
      const totalPages = parseInt(
        response.headers.get("X-WP-TotalPages") || "1"
      );

      return {
        posts,
        totalPages,
      };
    } catch (error) {
      console.error("Error fetching posts by category:", error);
      throw new Error("Failed to fetch posts by category");
    }
  }

  // Get posts excluding certain categories
  async getPostsExcludingCategories(
    excludeCategorySlugs: string[],
    params: {
      page?: number;
      per_page?: number;
      search?: string;
    } = {}
  ): Promise<{ posts: WordPressPost[]; totalPages: number; total: number }> {
    try {
      // First get the category IDs for the excluded categories (in parallel)
      const resolvedIds = await Promise.all(
        excludeCategorySlugs.map(async (slug) => {
          try {
            const categoriesParams = new URLSearchParams({ slug: slug });
            const categoriesResponse = await fetch(
              buildApiUrl("categories", categoriesParams),
              {
                next: { revalidate: 300 },
              }
            );

            if (categoriesResponse.ok) {
              const categories = await categoriesResponse.json();
              if (categories.length > 0) {
                return categories[0].id as number;
              }
            }
          } catch {
            console.warn(`Category ${slug} not found, skipping...`);
          }
          return null;
        })
      );
      const excludeCategoryIds = resolvedIds.filter(
        (id): id is number => id !== null
      );

      const searchParams = new URLSearchParams({
        _embed: "true",
        per_page: (params.per_page || 12).toString(),
        page: (params.page || 1).toString(),
        ...(excludeCategoryIds.length > 0 && {
          categories_exclude: excludeCategoryIds.join(","),
        }),
        ...(params.search && { search: params.search }),
      });

      const response = await fetch(
        buildApiUrl("posts", searchParams),
        {
          next: { revalidate: 60 },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const posts = await response.json();
      const totalPages = parseInt(
        response.headers.get("X-WP-TotalPages") || "1"
      );
      const total = parseInt(response.headers.get("X-WP-Total") || "0");

      return {
        posts,
        totalPages,
        total,
      };
    } catch (error) {
      console.error("Error fetching posts excluding categories:", error);
      throw new Error("Failed to fetch posts excluding categories");
    }
  }

  // Fetch projects
  async getProjects(
    params: {
      perPage?: number;
      page?: number;
    } = {}
  ): Promise<{ projects: WordPressProject[]; totalPages: number }> {
    try {
      const searchParams = new URLSearchParams({
        per_page: (params.perPage || 12).toString(),
        page: (params.page || 1).toString(),
        _embed: "true",
        _fields: "id,date,slug,title,excerpt,featured_media,acf,_links,_embedded",
        status: "publish",
      });

      const url = buildApiUrl("projects", searchParams);

      const response = await fetch(url, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const projects = await response.json();
      const totalPages = parseInt(
        response.headers.get("X-WP-TotalPages") || "1"
      );

      return {
        projects,
        totalPages,
      };
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw new Error("Failed to fetch projects");
    }
  }

  // Get a single project by slug
  async getProjectBySlug(slug: string): Promise<WordPressProject | null> {
    try {
      const searchParams = new URLSearchParams({
        slug,
        _embed: "true",
        acf: "true",
      });

      const response = await fetch(buildApiUrl("projects", searchParams), {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return Array.isArray(data) ? data[0] || null : data;
    } catch (error) {
      console.error("Error fetching project by slug:", error);
      return null;
    }
  }
}

export const wordpressApi = new WordPressAPI();

// Utility functions
export const formatThaiDate = (dateString: string): string => {
  const date = new Date(dateString);
  const thaiMonths = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543; // Convert to Buddhist year

  return `${day} ${month} ${year}`;
};

const HTML_ENTITIES: Record<string, string> = {
  amp: "&",
  gt: ">",
  lt: "<",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "-",
  mdash: "-",
  hellip: "...",
  laquo: "«",
  raquo: "»",
  lsquo: "'",
  rsquo: "'",
  ldquo: '"',
  rdquo: '"',
};

export const decodeHtmlEntities = (text: string): string => {
  return text.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    const normalized = entity.toLowerCase();

    if (normalized.startsWith("#x")) {
      const codePoint = parseInt(normalized.slice(2), 16);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
    }

    if (normalized.startsWith("#")) {
      const codePoint = parseInt(normalized.slice(1), 10);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
    }

    return HTML_ENTITIES[normalized] ?? match;
  });
};

export const stripHtml = (html: string): string => {
  // Strip tags before decoding entities, so encoded angle brackets in the
  // text itself (e.g. "ค่าฝุ่น &lt; 50") aren't mistaken for tags and deleted.
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
};

export const getExcerpt = (content: string, length = 150): string => {
  const plainText = stripHtml(content);
  return plainText.length > length
    ? plainText.substring(0, length) + "..."
    : plainText;
};
