"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import type { WordPressProject } from "@/lib/wordpress";

// Tiny gray SVG to prevent layout shift while images load
const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+";

interface ProjectCardProps {
  project: WordPressProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getImageUrl = () => {
    if (project._embedded?.["wp:featuredmedia"]?.[0]) {
      return (
        project._embedded["wp:featuredmedia"][0].media_details?.sizes?.medium
          ?.source_url || project._embedded["wp:featuredmedia"][0].source_url
      );
    }
    return "/images/prachathamweb-3.jpg";
  };

  const getImageAlt = () => {
    return (
      project._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
      project.title.rendered ||
      "Project image"
    );
  };

  return (
    <article className="card h-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 group">
      <Link
        href={`/projects/${project.slug}`}
        className="hover:no-underline h-full flex flex-col group"
      >
        {/* Project Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={getImageUrl()}
            alt={getImageAlt()}
            fill
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            style={{
              objectFit: "cover",
              transition: "transform 0.4s ease",
            }}
            className="group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Status Badge */}
          {project.acf?.projectStatus && (
            <span
              className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-md font-medium ${
                project.acf.projectStatus === "active"
                  ? "badge-brand"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {project.acf.projectStatus === "active" ? "ดำเนินการ" : "เสร็จสิ้น"}
            </span>
          )}
        </div>

        {/* Project Content */}
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-[1.7rem] md:text-[1.85rem] font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-brand-700 dark:group-hover:text-brand-300 line-clamp-2 transition-colors duration-200 leading-tight">
            {project.title.rendered}
          </h3>

          {/* Project Details */}
          <div className="flex flex-col gap-2 mb-4 flex-grow">
            {project.acf?.project_duration && (
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FaClock className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                <span>{project.acf.project_duration}</span>
              </div>
            )}
            {project.acf?.project_location && (
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FaMapMarkerAlt className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                <span>{project.acf.project_location}</span>
              </div>
            )}
          </div>

          {/* Read More */}
          <div className="flex items-center gap-1 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 text-brand-700 dark:text-brand-300 text-sm font-medium hover:gap-2 transition-all duration-200">
            อ่านเพิ่มเติม
            <FaArrowRight className="w-2.5 h-2.5" />
          </div>
        </div>
      </Link>
    </article>
  );
}
