import { FaClock, FaCalendarAlt, FaTags, FaUser } from "react-icons/fa";
import Link from "next/link";
import { notFound } from "next/navigation";
import { wordpressApi, formatThaiDate, stripHtml } from "@/lib/wordpress";
import { sanitizeHtml } from "@/lib/sanitize";
import { Metadata } from "next";
import { SocialShare } from "@/components/SocialShare";
import { PostViewTracker } from "@/components/PostViewTracker";
import { PostViewCount } from "@/components/PostViewCount";
import { TableOfContents } from "@/components/TableOfContents";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import dynamic from "next/dynamic";
const AdSense = dynamic(() => import("@/components/AdSense"));
const ReaderThaiFree = dynamic(() => import("@/components/ReaderThaiFree"));
import ReaderFloatingOverlay from "@/components/ReaderFloatingOverlay";
import QuoteCardManager from "@/components/QuoteCardManager";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

// Calculate reading time using character-based approach for Thai accuracy
// Thai text doesn't use spaces between words, so character count is more reliable
// Thai reading speed for formal/news content: ~1,400 chars/min
// Non-Thai (English etc.): standard 200 words/min
function calculateReadingTime(content: string): number {
  const text = stripHtml(content).trim();
  if (!text) return 1;

  const thaiChars = (text.match(/[\u0E00-\u0E7F]/g) || []).length;
  const nonThaiText = text.replace(/[\u0E00-\u0E7F]/g, "");
  const nonThaiWords = nonThaiText.split(/\s+/).filter(Boolean).length;

  const thaiMinutes = thaiChars / 1400;
  const nonThaiMinutes = nonThaiWords / 200;

  return Math.max(1, Math.ceil(thaiMinutes + nonThaiMinutes));
}

// Extract headings from WordPress HTML and ensure they have IDs
interface TocHeading {
  id: string;
  text: string;
  level: number;
}

function extractAndInjectHeadingIds(html: string): { html: string; headings: TocHeading[] } {
  const headings: TocHeading[] = [];
  let counter = 0;

  const processed = html.replace(
    /<(h[1-6])\b([^>]*)>([\s\S]*?)<\/\1>/gi,
    (match, tag: string, attrs: string, inner: string) => {
      const level = parseInt(tag[1]);

      // Extract text content (strip HTML tags)
      const text = inner.replace(/<[^>]+>/g, "").trim();
      if (!text) return match;

      // Check if heading already has an id attribute
      const idMatch = attrs.match(/\bid\s*=\s*["']([^"']+)["']/i);
      // Check for <a id="..."> inside the heading
      const anchorIdMatch = inner.match(/<a\s+[^>]*id\s*=\s*["']([^"']+)["']/i);

      let headingId: string;

      if (idMatch) {
        headingId = idMatch[1];
        headings.push({ id: headingId, text, level });
        return match; // already has id on the tag
      } else if (anchorIdMatch) {
        headingId = anchorIdMatch[1];
        headings.push({ id: headingId, text, level });
        // Add id to the heading tag itself for IntersectionObserver
        return `<${tag}${attrs} id="${headingId}">${inner}</${tag}>`;
      } else {
        counter++;
        headingId = `heading-${counter}`;
        headings.push({ id: headingId, text, level });
        return `<${tag}${attrs} id="${headingId}">${inner}</${tag}>`;
      }
    }
  );

  return { html: processed, headings };
}

// Wrap WordPress footnotes in a collapsible <details> element
function wrapFootnotesInDetails(html: string): string {
  // Match the kadence spacer divider + the final <ol class="wp-block-list"> containing footnote back-references (↑)
  const footnoteRegex = /(<(?:div|style)[^>]*wp-block-kadence-spacer[\s\S]*?<\/div>\s*(?:<\/div>)?\s*(?:\n\n)*)((?:<\s*ol\s+class="wp-block-list"[\s\S]*?<\/ol>\s*)$)/i;
  const replaced = html.replace(footnoteRegex, (_match, spacer, list) => {
    return `${spacer}<details class="wp-footnotes-collapsible"><summary class="wp-footnotes-toggle"><span class="wp-footnotes-toggle-icon"></span>เชิงอรรถและอ้างอิง</summary>${list}</details>`;
  });
  if (replaced !== html) return replaced;

  // Fallback: match any trailing <ol> containing footnote back-ref links (↑)
  const fallbackRegex = /(<ol\s+class="wp-block-list">\s*(?:<li>[\s\S]*?↑[\s\S]*?<\/li>\s*)+<\/ol>\s*)$/i;
  return html.replace(fallbackRegex, (match) => {
    return `<details class="wp-footnotes-collapsible"><summary class="wp-footnotes-toggle"><span class="wp-footnotes-toggle-icon"></span>เชิงอรรถและอ้างอิง</summary>${match}</details>`;
  });
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await wordpressApi.getPostBySlug(slug);

    if (!post) {
      return {
        title: "ไม่พบบทความ | ประชาธรรม",
      };
    }

    const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
    const description =
      stripHtml(post.excerpt.rendered).substring(0, 160) ||
      stripHtml(post.content.rendered).substring(0, 160);

    const authorName = post.acf?.authornamepost || "Prachatham";

    return {
      title: `${post.title.rendered} | ประชาธรรม`,
      description,
      keywords: `${post.title.rendered}, ประชาธรรม, สิ่งแวดล้อม, สื่อชุมชน`,
      authors: [{ name: authorName }],
      alternates: {
        canonical: `/posts/${slug}`,
      },
      openGraph: {
        title: post.title.rendered,
        description,
        type: "article",
        publishedTime: post.date,
        modifiedTime: post.modified,
        authors: [authorName],
        section: "สิ่งแวดล้อม",
        tags:
          post._embedded?.["wp:term"]?.[0]?.map(
            (cat: { name: string }) => cat.name
          ) || [],
        url: `/posts/${slug}`,
        siteName: "ประชาธรรม",
        locale: "th_TH",
        images: featuredImage
          ? [
            {
              url: featuredImage.source_url,
              width: featuredImage.media_details?.width || 1200,
              height: featuredImage.media_details?.height || 630,
              alt: featuredImage.alt_text || post.title.rendered,
              type: featuredImage.mime_type || "image/jpeg",
            },
          ]
          : [
            {
              url: "/images/hero-1-page-1.jpg",
              width: 1200,
              height: 630,
              alt: post.title.rendered,
            },
          ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title.rendered,
        description,
        images: featuredImage?.source_url || "/images/hero-1-page-1.jpg",
        creator: "@prachatham",
      },
    };
  } catch {
    return {
      title: "ไม่พบบทความ | ประชาธรรม",
    };
  }
}

export const revalidate = 60;

export default async function PostPage({ params }: PostPageProps) {
  try {
    const { slug } = await params;
    const post = await wordpressApi.getPostBySlug(slug);

    if (!post) {
      notFound();
    }

    const categories = (post._embedded?.["wp:term"]?.[0] || []) as Category[];
    const readingTime = calculateReadingTime(post.content.rendered);
    const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/posts/${slug}`;

    // Extract headings and inject IDs for TOC navigation
    const { html: contentWithIds, headings: tocHeadings } = extractAndInjectHeadingIds(post.content.rendered);
    const processedContent = sanitizeHtml(wrapFootnotesInDetails(contentWithIds));

    // JSON-LD structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title.rendered,
      description: stripHtml(post.excerpt.rendered).substring(0, 160),
      image:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/images/hero-1-page-1.jpg",
      author: post.acf?.authornamepost
        ? {
          "@type": "Person",
          name: post.acf.authornamepost,
        }
        : {
          "@type": "Organization",
          name: "Prachatham Foundation",
        },
      publisher: {
        "@type": "Organization",
        name: "Prachatham Foundation",
        logo: {
          "@type": "ImageObject",
          url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://cms.prachatham.com"
            }/wp-content/uploads/2024/01/new-favicon.svg`,
        },
      },
      datePublished: post.date,
      dateModified: post.modified,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": currentUrl,
      },
    };

    return (
      <>
        <ReadingProgressBar />
        {/* JSON-LD Structured Data — escaped to prevent XSS */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <PostViewTracker postId={post.id} />

        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col gap-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 max-w-3xl mx-auto w-full">
              <Link
                href="/"
                className="hover:text-brand-600 transition-colors"
              >
                หน้าแรก
              </Link>
              <span>/</span>
              <Link
                href="/posts"
                className="hover:text-brand-600 transition-colors"
              >
                บทความ
              </Link>
              <span>/</span>
              <span className="text-gray-700 dark:text-gray-200 font-medium line-clamp-1">
                {post.title.rendered}
              </span>
            </div>

            {/* Article Header */}
            <header className="max-w-3xl mx-auto w-full border-b border-gray-200 dark:border-gray-800 pb-8">
              {/* Categories */}
              {categories.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <FaTags className="text-gray-400" size={14} />
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                    >
                      <span className="badge-brand text-xs px-2 py-1 hover:bg-brand-200 transition-all duration-200">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-gray-950 dark:text-gray-50 mb-6 font-bold">
                {post.title.rendered}
              </h1>

              {/* Meta Information with TTS */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-5">
                <div className="flex flex-col gap-4">
                  {/* Meta Info Row */}
                  <div className="flex justify-between flex-wrap gap-4">
                    <div className="flex gap-6 flex-wrap">
                      {/* Author */}
                      {post.acf?.authornamepost && (
                        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 text-sm">
                          <FaUser size={14} />
                          <span className="font-medium">
                            {post.acf.authornamepost}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 text-sm">
                        <FaCalendarAlt size={14} />
                        <span>{formatThaiDate(post.date)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 text-sm">
                        <FaClock size={14} />
                        <span>อ่าน {readingTime} นาที</span>
                      </div>
                      <PostViewCount postId={post.id} />
                    </div>
                  </div>
                  {/* TTS Reader */}
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <ReaderThaiFree
                    postKey={post.slug || String(post.id)}
                    articleSelector=".wordpress-content"
                  />
                  <QuoteCardManager
                    attribution={{
                      title: stripHtml(post.title.rendered).trim(),
                      author: post.acf?.authornamepost || "ประชาธรรม",
                      date: formatThaiDate(post.date),
                    }}
                  />
                </div>
              </div>
            </header>

            {/* Content */}
            <article className="max-w-3xl mx-auto w-full">
              <div
                className="wordpress-content"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              <hr className="border-gray-200 dark:border-gray-700" />

              {/* Small ad after article — non-intrusive */}
              <AdSense
                slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE || ""}
                format="fluid"
                layout="in-article"
                maxHeight="250px"
              />

              {/* Social Share */}
              <SocialShare url={currentUrl} title={post.title.rendered} />
            </article>
          </div>

        </div>

        {/* Table of Contents */}
        {tocHeadings.length > 0 && <TableOfContents headings={tocHeadings} />}
        <ReaderFloatingOverlay currentPostKey={post.slug || String(post.id)} />
      </>
    );
  } catch (error) {
    console.error("Error loading post:", error);
    notFound();
  }
}
