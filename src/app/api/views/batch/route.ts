import { NextRequest, NextResponse } from "next/server";
import { wpJsonUrl } from "@/lib/wp-config";
import { rateLimit, getClientIP, rateLimitedResponse } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  // Rate limit: 30 batch requests per IP per minute
  const ip = getClientIP(request);
  const { limited, resetAt } = rateLimit(`views-batch:${ip}`, 30, 60_000);
  if (limited) return rateLimitedResponse(resetAt);

  try {
    const idsParam = request.nextUrl.searchParams.get("ids");
    if (!idsParam) {
      return NextResponse.json({ error: "Missing ids parameter" }, { status: 400 });
    }

    const ids = idsParam
      .split(",")
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(id) && id > 0);

    if (ids.length === 0) {
      return NextResponse.json({});
    }

    // Cap at 20 to prevent abuse
    const limitedIds = ids.slice(0, 20);

    // Fetch all view counts in parallel
    const results = await Promise.allSettled(
      limitedIds.map(async (id) => {
        const response = await fetch(
          wpJsonUrl(`post-views-counter/get-post-views/${id}`),
          { next: { revalidate: 60 } }
        );
        if (!response.ok) return { id, views: 0 };
        const data = await response.json();
        return { id, views: typeof data === "number" ? data : parseInt(data, 10) || 0 };
      })
    );

    const viewsMap: Record<number, number> = {};
    for (const result of results) {
      if (result.status === "fulfilled") {
        viewsMap[result.value.id] = result.value.views;
      }
    }

    return NextResponse.json(viewsMap, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Error fetching batch views:", error);
    return NextResponse.json({ error: "Failed to fetch views" }, { status: 500 });
  }
}
