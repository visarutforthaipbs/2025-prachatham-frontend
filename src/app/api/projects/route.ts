import { NextRequest, NextResponse } from "next/server";

// Try projects endpoint first, fallback to posts with project category
const WORDPRESS_API_URL = "https://cms.prachatham.com/?rest_route=/wp/v2";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  try {
    // Projects are posts in the "CALM Project" category (ID: 160)
    // Create new search params and ensure we always use the project category
    const projectSearchParams = new URLSearchParams();

    // Always set the project category
    projectSearchParams.set("categories", "160"); // CALM Project category

    // Copy other parameters from the request
    for (const [key, value] of searchParams.entries()) {
      if (key !== "categories") {
        // Don't override our project category
        projectSearchParams.set(key, value);
      }
    }

    // Build the correct URL - parameters should go after the rest_route
    const url = `${WORDPRESS_API_URL}/posts&${projectSearchParams.toString()}`;

    console.log("Fetching projects from:", url);

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
