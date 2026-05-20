"use client";

import { FaUser, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import NextImage from "next/image";
import { WordPressPost, formatThaiDate, getExcerpt } from "@/lib/wordpress";
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

  return (
    <article
      className={`card group h-full ${
        hasSplitLayout ? "flex flex-col md:grid md:grid-cols-[1.15fr_0.85fr]" : "flex flex-col"
      }`}
    >
      {/* Featured Image */}
      {featuredImage && (
        <Link
          href={`/posts/${post.slug}`}
          className="block h-full hover:no-underline"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${isFeatured ? "h-40 sm:h-52 md:h-full md:min-h-[320px]" : "h-40 sm:h-auto sm:aspect-[16/10]"}`}>
            <NextImage
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || post.title.rendered}
              fill
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              style={{
                objectFit: "cover",
                transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Subtle gradient for readability */}
            <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </Link>
      )}

      <div className={`flex-1 flex flex-col ${isFeatured ? "p-5 md:p-8" : "p-5"}`}>
        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex items-center mb-4 flex-wrap gap-1.5">
            {categories.slice(0, 2).map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="hover:no-underline"
              >
                <span className="badge-brand hover:bg-brand-100 transition-all duration-150">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <Link
          href={`/posts/${post.slug}`}
          className="hover:no-underline flex-1"
        >
          <h3 className={`${isFeatured ? "text-[1.7rem] md:text-4xl" : "text-[1.7rem] md:text-[1.85rem]"} font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors duration-200 mb-3 line-clamp-3 leading-tight`}>
            <Highlight text={post.title.rendered} query={highlightQuery || ""} />
          </h3>
        </Link>

        {/* Excerpt */}
        <p className={`${isFeatured ? "text-sm line-clamp-2 md:text-base md:line-clamp-3" : "text-sm line-clamp-2"} text-gray-600 dark:text-gray-400 mb-5 flex-1 leading-relaxed`}>
          <Highlight text={getExcerpt(post.excerpt.rendered, 120)} query={highlightQuery || ""} />
        </p>

        {/* Date, Author & Read More */}
        <div className="flex justify-between items-end gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col text-xs text-gray-400 dark:text-gray-500 gap-1">
            <span>{formatThaiDate(post.date)}</span>
            <div className="flex items-center gap-3">
              {post.acf?.authornamepost && (
                <div className="flex items-center gap-1">
                  <FaUser size={9} />
                  <span>{post.acf.authornamepost}</span>
                </div>
              )}
              <PostViewCount postId={post.id} />
            </div>
          </div>
          <Link
            href={`/posts/${post.slug}`}
            className="flex items-center gap-1 text-brand-600 text-sm font-medium hover:gap-2 transition-all duration-200"
          >
            อ่านต่อ
            <FaArrowRight className="w-2.5 h-2.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
