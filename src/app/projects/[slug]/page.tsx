import { Metadata } from "next";
import { notFound } from "next/navigation";
import { wordpressApi, formatThaiDate } from "@/lib/wordpress";
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

  return {
    title: `${project.title.rendered} | ประชาธรรม`,
    description: project.excerpt.rendered || "โครงการของมูลนิธิประชาธรรม",
    openGraph: {
      title: `${project.title.rendered} | ประชาธรรม`,
      description: project.excerpt.rendered || "โครงการของมูลนิธิประชาธรรม",
      type: "article",
      images: project._embedded?.["wp:featuredmedia"]?.[0]?.source_url
        ? [
            {
              url: project._embedded["wp:featuredmedia"][0].source_url,
              alt:
                project._embedded["wp:featuredmedia"][0].alt_text ||
                project.title.rendered,
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

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-brand-600 transition-colors">
            หน้าแรก
          </Link>
          <span className="text-gray-300">/</span>
          <Link href="/causes" className="hover:text-brand-600 transition-colors">
            โครงการของเรา
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium line-clamp-1">
            {project.title.rendered}
          </span>
        </div>

        {/* Project Header */}
        <div>
          <span className="badge-brand text-sm mb-4 inline-block">
            โครงการ
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-brand-700 mb-4">
            {project.title.rendered}
          </h1>
          <p className="text-gray-500 text-sm">
            {formatThaiDate(project.date)}
          </p>
        </div>

        {/* Featured Image */}
        {project._embedded?.["wp:featuredmedia"]?.[0] && (
          <div className="rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project._embedded["wp:featuredmedia"][0].source_url}
              alt={
                project._embedded["wp:featuredmedia"][0].alt_text ||
                project.title.rendered
              }
              className="w-full h-[400px] object-cover"
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
