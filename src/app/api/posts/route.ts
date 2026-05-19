import { NextRequest, NextResponse } from "next/server";
import { wpRestRoute } from "@/lib/wp-config";
import { rateLimit, getClientIP, rateLimitedResponse } from "@/lib/rate-limit";

const WORDPRESS_API_URL = wpRestRoute("posts");

// Only allow safe query parameters to be forwarded to WordPress
const ALLOWED_PARAMS = new Set([
  "page", "per_page", "search", "categories", "tags",
  "slug", "_embed", "_fields", "acf", "orderby", "order",
  "after", "before", "offset", "exclude", "include",
  "categories_exclude",
]);

export async function GET(request: NextRequest) {
  // Rate limit: 60 requests per IP per minute
  const ip = getClientIP(request);
  const { limited, resetAt } = rateLimit(`posts:${ip}`, 60, 60_000);
  if (limited) return rateLimitedResponse(resetAt);

  const { searchParams } = new URL(request.url);

  // Build a safe set of query parameters (whitelist only)
  const safeParams = new URLSearchParams();
  for (const [key, value] of searchParams.entries()) {
    if (ALLOWED_PARAMS.has(key)) {
      safeParams.set(key, value);
    }
  }

  // Add ACF fields to the request by default
  if (!safeParams.has("acf")) {
    safeParams.set("acf", "true");
  }

  // Forward only whitelisted query parameters
  const queryString = safeParams.toString();
  const url = `${WORDPRESS_API_URL}${queryString ? `&${queryString}` : ""}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Forward headers from WordPress API
    const totalPages = response.headers.get("X-WP-TotalPages") || "1";
    const total = response.headers.get("X-WP-Total") || String(data.length);

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "X-WP-TotalPages": totalPages,
        "X-WP-Total": total,
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
