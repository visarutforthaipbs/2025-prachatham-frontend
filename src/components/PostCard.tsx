"use client";

import { FaUser, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import NextImage from "next/image";
import { WordPressPost, formatThaiDate, getExcerpt } from "@/lib/wordpress";
import { PostViewCount } from "@/components/PostViewCount";

interface PostCardProps {
  post: WordPressPost;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const categories = (post._embedded?.["wp:term"]?.[0] || []) as Category[];

  return (
    <article className="card h-full flex flex-col">
      {/* Featured Image */}
      {featuredImage && (
        <Link href={`/posts/${post.slug}`} className="hover:no-underline" tabIndex={-1} aria-hidden="true">
          <div className="relative h-[220px] overflow-hidden">
            <NextImage
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || post.title.rendered}
              fill
              style={{
                objectFit: "cover",
                transition: "transform 0.4s ease",
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Subtle gradient for readability */}
            <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </Link>
      )}

      <div className="flex-1 flex flex-col p-5">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex items-center mb-3 flex-wrap gap-1.5">
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
          <h3 className="text-3xl font-bold text-gray-800 hover:text-brand-600 transition-colors duration-200 mb-3 line-clamp-3 leading-tight">
            {post.title.rendered}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-2">
          {getExcerpt(post.excerpt.rendered, 120)}
        </p>

        {/* Date, Author & Read More */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
          <div className="flex flex-col text-xs text-gray-400 gap-1">
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
