import { NextRequest, NextResponse } from "next/server";

const WORDPRESS_API_URL =
  "https://cms.prachatham.com/?rest_route=/wp/v2/categories";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Forward all query parameters
  const queryString = searchParams.toString();
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
