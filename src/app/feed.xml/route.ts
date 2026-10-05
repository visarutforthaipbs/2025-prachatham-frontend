import { decodeHtmlEntities, getExcerpt, wordpressApi } from "@/lib/wordpress";
import { sanitizeHtml } from "@/lib/sanitize";

export const revalidate = 3600;

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.prachatham.com"
).replace(/\/$/, "");

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// "]]>" would terminate the CDATA section early
const cdata = (value: string) =>
  `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;

// Feed readers have no base URL, so site-relative links must be absolute
const absolutizeUrls = (html: string) =>
  html.replace(/(\s(?:src|href)=")\/(?!\/)/g, `$1${SITE_URL}/`);

export async function GET() {
  try {
    const { posts } = await wordpressApi.getPosts({
      per_page: 20,
      includeContent: true,
    });

    const lastBuild = posts[0]
      ? new Date(posts[0].modified || posts[0].date)
      : new Date();

    const items = posts.map((post) => {
      const link = `${SITE_URL}/posts/${post.slug}`;
      const title = decodeHtmlEntities(post.title.rendered);
      const author = post.acf?.authornamepost;
      const media = post._embedded?.["wp:featuredmedia"]?.[0];
      const categories = (post._embedded?.["wp:term"] ?? [])
        .flat()
        .filter((term) => term.taxonomy === "category");

      const image = media?.source_url
        ? `<img src="${escapeXml(media.source_url)}" alt="${escapeXml(
            media.alt_text || title
          )}" /><br />`
        : "";
      const body = absolutizeUrls(sanitizeHtml(post.content?.rendered ?? ""));

      return [
        "<item>",
        `<title>${cdata(title)}</title>`,
        `<link>${link}</link>`,
        `<guid isPermaLink="true">${link}</guid>`,
        `<pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        author ? `<dc:creator>${cdata(String(author))}</dc:creator>` : "",
        ...categories.map((c) => `<category>${cdata(decodeHtmlEntities(c.name))}</category>`),
        `<description>${cdata(getExcerpt(post.excerpt?.rendered ?? "", 300))}</description>`,
        `<content:encoded>${cdata(image + body)}</content:encoded>`,
        media?.source_url
          ? `<media:content url="${escapeXml(media.source_url)}" medium="image" />`
          : "",
        "</item>",
      ]
        .filter(Boolean)
        .join("\n");
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
<title>ประชาธรรม</title>
<link>${SITE_URL}</link>
<atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
<description>องค์กรสื่อสิ่งแวดล้อมไทย เพื่อการอนุรักษ์และพัฒนาที่ยั่งยืน</description>
<language>th</language>
<lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
${items.join("\n")}
</channel>
</rss>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new Response("Feed temporarily unavailable", {
      status: 503,
      headers: { "Retry-After": "300" },
    });
  }
}
