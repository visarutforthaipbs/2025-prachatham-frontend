import { NextRequest, NextResponse } from "next/server";

// WordPress API base URL
const WORDPRESS_API_URL = "https://cms.prachatham.com/?rest_route=/wp/v2";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  try {
    // Use the custom post type "projects" instead of posts with category filter
    const projectSearchParams = new URLSearchParams();

    // Copy all parameters from the request
    for (const [key, value] of searchParams.entries()) {
      projectSearchParams.set(key, value);
    }

    // Build the correct URL for the custom post type
    const url = `${WORDPRESS_API_URL}/projects&${projectSearchParams.toString()}`;

    console.log("Fetching projects from custom post type:", url);

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

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "X-WP-TotalPages": totalPages,
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
