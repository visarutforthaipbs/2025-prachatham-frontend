import { NextRequest } from "next/server";
import { wpRestRoute } from "@/lib/wp-config";
import { rateLimit, getClientIP, rateLimitedResponse } from "@/lib/rate-limit";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Rate limit: 60 requests per IP per minute
  const ip = getClientIP(request as unknown as NextRequest);
  const { limited, resetAt } = rateLimit(`post-slug:${ip}`, 60, 60_000);
  if (limited) return rateLimitedResponse(resetAt);

  try {
    const { slug } = await params;

    // Build the WordPress API URL with slug parameter
    const url = new URL(wpRestRoute("posts"));
    url.searchParams.set("slug", slug);
    url.searchParams.set("_embed", "true");
    url.searchParams.set("acf", "true"); // Include ACF fields

    const response = await fetch(url.toString(), {
      headers: {
        "User-Agent": "NextJS-App",
        Accept: "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(
        "WordPress API error:",
        response.status,
        response.statusText
      );
      return new Response(JSON.stringify({ error: "Failed to fetch post" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const posts = await response.json();

    // Return the first post or null if no posts found
    const post = posts.length > 0 ? posts[0] : null;

    return Response.json(post, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Error in posts/[slug] API route:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
