"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { decodeHtmlEntities, WordPressProject } from "@/lib/wordpress";

interface CausesPageClientProps {
  projects: WordPressProject[];
}

export default function CausesPageClient({ projects }: CausesPageClientProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
          <Link href="/" className="hover:text-brand-600 transition-colors">
            หน้าแรก
          </Link>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <span className="text-gray-700 dark:text-gray-200 font-medium">
            โครงการของเรา
          </span>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <span className="badge-brand text-base px-4 py-2 mb-4 inline-block">
              โครงการและผลงาน
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-700 dark:text-brand-400 mb-4 leading-tight">
              โครงการของมูลนิธิสื่อประชาธรรม
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              ดูผลงานและโครงการทั้งหมดที่เราได้ดำเนินการมา
              เพื่อสร้างการเปลี่ยนแปลงเชิงบวกในชุมชนและสังคม
            </p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {projects.map((project, index) => {
                const title = decodeHtmlEntities(project.title.rendered);

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="card overflow-hidden bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
                  >
                  {/* Project Image */}
                  {project._embedded?.["wp:featuredmedia"]?.[0] && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={
                          project._embedded["wp:featuredmedia"][0].media_details
                            ?.sizes?.medium?.source_url ||
                          project._embedded["wp:featuredmedia"][0].source_url
                        }
                        alt={
                          decodeHtmlEntities(
                            project._embedded["wp:featuredmedia"][0].alt_text ||
                              title
                          )
                        }
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />

                      {/* Project Status Badge on Image */}
                      {project.acf?.projectStatus && (
                        <span
                          className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-md z-[2] font-medium ${
                            project.acf.projectStatus === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {project.acf.projectStatus === "active"
                            ? "ดำเนินการ"
                            : "เสร็จสิ้น"}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex flex-col gap-4 items-start">
                      {/* Title */}
                      <h3 className="text-lg font-bold text-brand-700 dark:text-brand-300 leading-snug line-clamp-2">
                        {title}
                      </h3>

                      {/* Project Details */}
                      <div className="flex flex-col gap-2 w-full">
                        {project.acf?.project_duration && (
                          <div className="flex flex-col sm:flex-row sm:items-start text-sm gap-0.5 sm:gap-2">
                            <span className="text-gray-700 dark:text-gray-300 font-medium shrink-0">
                              ระยะเวลา:
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 leading-snug">
                              {project.acf.project_duration}
                            </span>
                          </div>
                        )}

                        {project.acf?.project_location && (
                          <div className="flex flex-col sm:flex-row sm:items-start text-sm gap-0.5 sm:gap-2">
                            <span className="text-gray-700 dark:text-gray-300 font-medium shrink-0">
                              สถานที่:
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 leading-snug">
                              {project.acf.project_location}
                            </span>
                          </div>
                        )}

                        {project.acf?.project_partners && (
                          <div className="flex flex-col sm:flex-row sm:items-start text-sm gap-0.5 sm:gap-2">
                            <span className="text-gray-700 dark:text-gray-300 font-medium shrink-0">
                              พันธมิตร:
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 leading-snug line-clamp-2">
                              {project.acf.project_partners}
                            </span>
                          </div>
                        )}

                        {project.acf?.project_beneficiaries && (
                          <div className="flex flex-col sm:flex-row sm:items-start text-sm gap-0.5 sm:gap-2">
                            <span className="text-gray-700 dark:text-gray-300 font-medium shrink-0">
                              ผู้รับผลประโยชน์:
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 leading-snug line-clamp-2">
                              {project.acf.project_beneficiaries}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Read More Button */}
                      <Link
                        href={`/projects/${project.slug}`}
                        className="btn-outline-green text-sm self-start hover:bg-brand-600 hover:text-white hover:-translate-y-px transition-all duration-200"
                      >
                        อ่านเพิ่มเติม
                      </Link>
                    </div>
                  </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <div className="flex justify-center py-16">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-600 border-t-transparent" />
              <p className="text-gray-500 text-lg">
                กำลังโหลดข้อมูลโครงการ...
              </p>
            </div>
          </div>
        )}

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="card bg-brand-50 border border-brand-200">
              <div className="p-5 sm:p-8 text-center">
              <div className="flex flex-col gap-6">
                <h3 className="text-xl md:text-2xl font-bold text-brand-700 dark:text-brand-400 mb-4">
                  สนใจร่วมงานกับเรา?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
                  หากคุณมีไอเดียโครงการที่น่าสนใจ หรือต้องการร่วมมือกับเรา
                  เรายินดีต้อนรับและพร้อมที่จะสนับสนุนการสร้างการเปลี่ยนแปลงที่ดี
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  <Link href="/contact" className="btn-primary text-base sm:text-lg px-8 w-full sm:w-auto">
                    ติดต่อเรา
                  </Link>
                  <Link href="/donate" className="btn-outline-green text-base sm:text-lg px-8 w-full sm:w-auto">
                    ร่วมสนับสนุน
                  </Link>
                  <Link href="/about" className="text-brand-600 hover:text-brand-700 font-medium text-base sm:text-lg px-8 py-2 transition-colors">
                    เรียนรู้เพิ่มเติม
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
