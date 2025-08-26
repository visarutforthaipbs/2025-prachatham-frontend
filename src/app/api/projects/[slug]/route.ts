export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Build the WordPress API URL with slug parameter
    const url = new URL(
      "https://cms.prachatham.com/?rest_route=/wp/v2/projects"
    );
    url.searchParams.set("slug", slug);
    url.searchParams.set("_embed", "true");

    console.log("Fetching from WordPress API:", url.toString());

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
      return new Response(
        JSON.stringify({ error: "Failed to fetch project" }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const projects = await response.json();

    // Return the first project or null if no projects found
    const project = projects.length > 0 ? projects[0] : null;

    return Response.json(project, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Error in projects/[slug] API route:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
