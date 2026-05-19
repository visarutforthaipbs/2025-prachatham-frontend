import { NextRequest, NextResponse } from "next/server";
import { wpRestRoute } from "@/lib/wp-config";
import { rateLimit, getClientIP, rateLimitedResponse } from "@/lib/rate-limit";

// WordPress API base URL
const WORDPRESS_API_URL = wpRestRoute("").replace(/\/$/, "");

// Only allow safe query parameters to be forwarded to WordPress
const ALLOWED_PARAMS = new Set([
  "page", "per_page", "search", "slug", "_embed", "_fields",
  "orderby", "order", "exclude", "include", "offset",
]);

export async function GET(request: NextRequest) {
  // Rate limit: 60 requests per IP per minute
  const ip = getClientIP(request);
  const { limited, resetAt } = rateLimit(`projects:${ip}`, 60, 60_000);
  if (limited) return rateLimitedResponse(resetAt);

  const { searchParams } = new URL(request.url);

  try {
    // Use the custom post type "projects" instead of posts with category filter
    const projectSearchParams = new URLSearchParams();

    // Copy only whitelisted parameters from the request
    for (const [key, value] of searchParams.entries()) {
      if (ALLOWED_PARAMS.has(key)) {
        projectSearchParams.set(key, value);
      }
    }

    // Build the correct URL for the custom post type
    const url = `${WORDPRESS_API_URL}/projects&${projectSearchParams.toString()}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      console.error(
        `WordPress API error: ${response.status} - ${response.statusText}`
      );
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
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
