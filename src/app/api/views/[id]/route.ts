import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const { id } = resolvedParams;
        const response = await fetch(
            `https://cms.prachatham.com/wp-json/post-views-counter/get-post-views/${id}`,
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

        // Increment the view in WordPress
        const response = await fetch(
            `https://cms.prachatham.com/wp-json/post-views-counter/view-post/${id}`,
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
