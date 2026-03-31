import { NextRequest, NextResponse } from "next/server";
import { wpRestRoute } from "@/lib/wp-config";

const WORDPRESS_API_URL = wpRestRoute("categories");

// Only allow safe query parameters to be forwarded to WordPress
const ALLOWED_PARAMS = new Set([
  "page", "per_page", "search", "slug", "parent",
  "hide_empty", "orderby", "order", "exclude", "include",
]);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Build a safe set of query parameters (whitelist only)
  const safeParams = new URLSearchParams();
  for (const [key, value] of searchParams.entries()) {
    if (ALLOWED_PARAMS.has(key)) {
      safeParams.set(key, value);
    }
  }

  // Forward only whitelisted query parameters
  const queryString = safeParams.toString();
  const url = `${WORDPRESS_API_URL}${queryString ? `&${queryString}` : ""}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
