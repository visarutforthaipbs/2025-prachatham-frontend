"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import type { WordPressProject } from "@/lib/wordpress";

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
    return "/images/placeholder-project.jpg";
  };

  const getImageAlt = () => {
    return (
      project._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
      project.title.rendered ||
      "Project image"
    );
  };

  return (
    <article className="card h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="hover:no-underline h-full flex flex-col group"
      >
        {/* Project Image */}
        <div className="relative h-[220px] overflow-hidden">
          <Image
            src={getImageUrl()}
            alt={getImageAlt()}
            fill
            style={{
              objectFit: "cover",
              transition: "transform 0.4s ease",
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Status Badge */}
          {project.acf?.projectStatus && (
            <span
              className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium ${
                project.acf.projectStatus === "active"
                  ? "badge-brand"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {project.acf.projectStatus === "active" ? "ดำเนินการ" : "เสร็จสิ้น"}
            </span>
          )}
        </div>

        {/* Project Content */}
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-3xl font-bold text-brand-700 mb-3 group-hover:text-brand-600 line-clamp-2 transition-colors duration-200 leading-tight">
            {project.title.rendered}
          </h3>

          {/* Project Details */}
          <div className="flex flex-col gap-2 mb-4 flex-grow">
            {project.acf?.project_duration && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaClock className="w-3 h-3 text-gray-400" />
                <span>{project.acf.project_duration}</span>
              </div>
            )}
            {project.acf?.project_location && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaMapMarkerAlt className="w-3 h-3 text-gray-400" />
                <span>{project.acf.project_location}</span>
              </div>
            )}
          </div>

          {/* Read More */}
          <div className="flex items-center gap-1 mt-auto pt-4 border-t border-gray-100 text-brand-600 text-sm font-medium hover:gap-2 transition-all duration-200">
            อ่านเพิ่มเติม
            <FaArrowRight className="w-2.5 h-2.5" />
          </div>
        </div>
      </Link>
    </article>
  );
}
