import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  wordpressApi,
  decodeHtmlEntities,
  formatThaiDate,
  stripHtml,
} from "@/lib/wordpress";
import { sanitizeHtml } from "@/lib/sanitize";
import Link from "next/link";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await wordpressApi.getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: "ไม่พบโครงการ | ประชาธรรม",
    };
  }

  const title = decodeHtmlEntities(project.title.rendered);
  const description = stripHtml(project.excerpt.rendered) || "โครงการของมูลนิธิประชาธรรม";

  return {
    title: `${title} | ประชาธรรม`,
    description,
    openGraph: {
      title: `${title} | ประชาธรรม`,
      description,
      type: "article",
      images: project._embedded?.["wp:featuredmedia"]?.[0]?.source_url
        ? [
            {
              url: project._embedded["wp:featuredmedia"][0].source_url,
              alt:
                decodeHtmlEntities(
                  project._embedded["wp:featuredmedia"][0].alt_text || title
                ),
            },
          ]
        : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = await wordpressApi.getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const title = decodeHtmlEntities(project.title.rendered);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 min-w-0">
          <Link href="/" className="hover:text-brand-600 transition-colors">
            หน้าแรก
          </Link>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <Link href="/causes" className="hover:text-brand-600 transition-colors">
            โครงการของเรา
          </Link>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <span className="text-gray-700 dark:text-gray-200 font-medium line-clamp-1 min-w-0">
            {title}
          </span>
        </div>

        {/* Project Header */}
        <div>
          <span className="badge-brand text-sm mb-4 inline-block">
            โครงการ
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-brand-700 dark:text-brand-400 mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {formatThaiDate(project.date)}
          </p>
        </div>

        {/* Featured Image */}
        {project._embedded?.["wp:featuredmedia"]?.[0] && (
          <div className="rounded-lg overflow-hidden relative h-[240px] sm:h-[320px] md:h-[400px]">
            <Image
              src={project._embedded["wp:featuredmedia"][0].source_url}
              alt={
                decodeHtmlEntities(
                  project._embedded["wp:featuredmedia"][0].alt_text || title
                )
              }
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Project Content */}
        <div
          className="wordpress-content"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(project.content.rendered) }}
        />
      </div>
    </div>
  );
}
