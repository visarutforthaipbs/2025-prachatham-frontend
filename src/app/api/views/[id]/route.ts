import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { wpJsonUrl } from "@/lib/wp-config";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const { id } = resolvedParams;

        // Validate that ID is a positive integer
        const numericId = parseInt(id, 10);
        if (isNaN(numericId) || numericId <= 0 || String(numericId) !== id) {
            return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
        }

        const response = await fetch(
            wpJsonUrl(`post-views-counter/get-post-views/${numericId}`),
            {
                next: { revalidate: 60 }, // Cache views for 60 seconds
            }
        );

        if (!response.ok) {
            throw new Error(`WordPress API returned status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data, {
            status: 200,
            headers: {
                "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
            },
        });
    } catch (error) {
        console.error(`Error fetching views for post:`, error);
        return NextResponse.json({ error: "Failed to fetch views" }, { status: 500 });
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const { id } = resolvedParams;

        // Validate that ID is a positive integer
        const numericId = parseInt(id, 10);
        if (isNaN(numericId) || numericId <= 0 || String(numericId) !== id) {
            return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
        }

        // Rate limit: max 5 view increments per IP per minute
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
            || request.headers.get("x-real-ip")
            || "unknown";
        const { limited, resetAt } = rateLimit(`view:${ip}:${numericId}`, 5, 60_000);
        if (limited) {
            return NextResponse.json(
                { error: "Too many requests" },
                {
                    status: 429,
                    headers: {
                        "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
                    },
                }
            );
        }

        // Increment the view in WordPress
        const response = await fetch(
            wpJsonUrl(`post-views-counter/view-post/${numericId}`),
            {
                method: "POST",
            }
        );

        if (!response.ok) {
            throw new Error(`WordPress API returned status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(`Error incrementing views for post:`, error);
        return NextResponse.json({ error: "Failed to increment views" }, { status: 500 });
    }
}
