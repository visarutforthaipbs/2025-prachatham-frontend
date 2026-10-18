"use client";

import { FaUser, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import NextImage from "next/image";
import {
  WordPressPost,
  decodeHtmlEntities,
  formatThaiDate,
  getExcerpt,
} from "@/lib/wordpress";
import { PostViewCount } from "@/components/PostViewCount";
import { Highlight } from "@/components/Highlight";

// Tiny gray SVG to prevent layout shift while images load
const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+";

interface PostCardProps {
  post: WordPressPost;
  highlightQuery?: string;
  variant?: "default" | "featured";
}

interface Category {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

export default function PostCard({
  post,
  highlightQuery,
  variant = "default",
}: PostCardProps) {
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const categories = (post._embedded?.["wp:term"]?.[0] || []) as Category[];
  const isFeatured = variant === "featured";
  const hasSplitLayout = isFeatured && Boolean(featuredImage);
  const title = decodeHtmlEntities(post.title.rendered);
  const excerpt = getExcerpt(post.excerpt.rendered, 120);

  const href = `/posts/${post.slug}`;

  // HIG: the whole card is one target (title link stretched over the card
  // via .card-link), category badges stay independently clickable above it.
  return (
    <article
      className={`card card-link group h-full ${
        hasSplitLayout ? "flex flex-col md:grid md:grid-cols-[1.15fr_0.85fr]" : "flex flex-col"
      }`}
    >
      {/* Featured Image (decorative duplicate of the title link) */}
      {featuredImage && (
        <div className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${isFeatured ? "h-48 sm:h-56 md:h-full md:min-h-[320px]" : "aspect-[16/10]"}`}>
          <NextImage
            src={featuredImage.source_url}
            alt={decodeHtmlEntities(featuredImage.alt_text || title)}
            fill
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            style={{
              objectFit: "cover",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="motion-safe:group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className={`flex-1 flex flex-col ${isFeatured ? "p-5 md:p-8" : "p-5"}`}>
        {/* Categories */}
        {categories.length > 0 && (
          <div className="card-link-above flex items-center -my-2 mb-1 flex-wrap gap-x-1.5">
            {categories.slice(0, 2).map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group/badge inline-flex items-center min-h-[44px] hover:no-underline"
              >
                <span className="badge-brand group-hover/badge:bg-brand-100 dark:group-hover/badge:bg-brand-800 transition-colors duration-150">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Title — the card's link */}
        <h3 className={`${isFeatured ? "text-[1.75rem] md:text-4xl" : "text-[1.75rem] md:text-[1.85rem]"} font-bold text-gray-950 dark:text-gray-50 mb-2 line-clamp-3 leading-[1.2]`}>
          <Link
            href={href}
            className="card-link-target hover:no-underline group-hover:text-brand-700 dark:group-hover:text-brand-200 transition-colors duration-200"
          >
            <Highlight text={title} query={highlightQuery || ""} />
          </Link>
        </h3>

        {/* Excerpt */}
        <p className={`${isFeatured ? "line-clamp-2 md:line-clamp-3" : "line-clamp-2"} text-base text-gray-600 dark:text-gray-300 mb-4 flex-1`}>
          <Highlight text={excerpt} query={highlightQuery || ""} />
        </p>

        {/* Meta row: date · author · views — tertiary label, ≥ 4.5:1 */}
        <div className="flex justify-between items-end gap-4 mt-auto pt-3 border-t border-black/5 dark:border-white/10">
          <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400 gap-0.5 min-w-0">
            <time dateTime={post.date}>{formatThaiDate(post.date)}</time>
            <div className="flex items-center gap-3 min-w-0">
              {post.acf?.authornamepost && (
                <span className="flex items-center gap-1.5 min-w-0">
                  <FaUser size={11} aria-hidden="true" />
                  <span className="truncate">{post.acf.authornamepost}</span>
                </span>
              )}
              <PostViewCount postId={post.id} />
            </div>
          </div>
          <span
            className="shrink-0 flex items-center gap-1.5 text-brand-700 dark:text-brand-200 text-base font-bold"
            aria-hidden="true"
          >
            อ่านต่อ
            <FaArrowRight className="w-3 h-3 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
