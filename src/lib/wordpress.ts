import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "https://prachatham.com/wp-json/wp/v2";

export interface WordPressPost {
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
  categories: number[];
  featured_media: number;
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

class WordPressAPI {
  private client = axios.create({
    baseURL: BASE_URL,
    timeout: 30000, // Increased timeout to 30 seconds
    headers: {
      "User-Agent": "Prachatham-Next-App/1.0",
    },
  });

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
      const response = await this.client.get("/posts", {
        params: {
          _embed: true,
          per_page: params.per_page || 12,
          page: params.page || 1,
          categories: params.categories,
          search: params.search,
        },
      });

      return {
        posts: response.data,
        totalPages: parseInt(response.headers["x-wp-totalpages"] || "1"),
        total: parseInt(response.headers["x-wp-total"] || "0"),
      };
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Failed to fetch posts");
    }
  }

  // Get a single post by slug
  async getPostBySlug(slug: string): Promise<WordPressPost | null> {
    try {
      const response = await this.client.get("/posts", {
        params: {
          slug,
          _embed: true,
        },
      });

      return response.data[0] || null;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw new Error("Failed to fetch post");
    }
  }

  // Get categories
  async getCategories(): Promise<WordPressCategory[]> {
    try {
      const response = await this.client.get("/categories", {
        params: {
          per_page: 100,
          hide_empty: true,
        },
      });

      return response.data;
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
      const response = await this.client.get("/posts", {
        params: {
          search: query,
          _embed: true,
          per_page: 12,
          page,
        },
      });

      return {
        posts: response.data,
        totalPages: parseInt(response.headers["x-wp-totalpages"] || "1"),
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
      const categoriesResponse = await this.client.get("/categories", {
        params: { slug: categorySlug },
      });

      if (!categoriesResponse.data.length) {
        throw new Error("Category not found");
      }

      const categoryId = categoriesResponse.data[0].id;

      const response = await this.client.get("/posts", {
        params: {
          categories: categoryId,
          _embed: true,
          per_page: 12,
          page,
        },
      });

      return {
        posts: response.data,
        totalPages: parseInt(response.headers["x-wp-totalpages"] || "1"),
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
      // First get the category IDs for the excluded categories
      const excludeCategoryIds: number[] = [];

      for (const slug of excludeCategorySlugs) {
        try {
          const categoriesResponse = await this.client.get("/categories", {
            params: { slug: slug },
          });

          if (categoriesResponse.data.length > 0) {
            excludeCategoryIds.push(categoriesResponse.data[0].id);
          }
        } catch {
          console.warn(`Category ${slug} not found, skipping...`);
        }
      }

      const response = await this.client.get("/posts", {
        params: {
          _embed: true,
          per_page: params.per_page || 12,
          page: params.page || 1,
          categories_exclude: excludeCategoryIds.join(","),
          search: params.search,
        },
      });

      return {
        posts: response.data,
        totalPages: parseInt(response.headers["x-wp-totalpages"] || "1"),
        total: parseInt(response.headers["x-wp-total"] || "0"),
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
      const response = await axios.get(`${BASE_URL}/projects`, {
        params: {
          per_page: params.perPage || 12,
          page: params.page || 1,
          _embed: true,
          status: "publish",
        },
      });

      const totalPages = parseInt(response.headers["x-wp-totalpages"] || "1");

      return {
        projects: response.data,
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
      const response = await axios.get(`${BASE_URL}/projects`, {
        params: {
          slug: slug,
          _embed: true,
          status: "publish",
        },
      });

      return response.data[0] || null;
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

export const stripHtml = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&[^;]+;/g, " ")
    .trim();
};

export const getExcerpt = (content: string, length = 150): string => {
  const plainText = stripHtml(content);
  return plainText.length > length
    ? plainText.substring(0, length) + "..."
    : plainText;
};
