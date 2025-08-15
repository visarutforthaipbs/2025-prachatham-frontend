import Image from "next/image";
import Link from "next/link";
import type { WordPressProject } from "@/lib/wordpress";

interface ProjectCardProps {
  project: WordPressProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Helper function to get image URL
  const getImageUrl = () => {
    if (project._embedded?.["wp:featuredmedia"]?.[0]) {
      return (
        project._embedded["wp:featuredmedia"][0].media_details?.sizes?.medium
          ?.source_url || project._embedded["wp:featuredmedia"][0].source_url
      );
    }
    return "/images/placeholder-project.jpg"; // Fallback image
  };

  const getImageAlt = () => {
    return (
      project._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
      project.title.rendered ||
      "Project image"
    );
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Project Image */}
        <div
          style={{ position: "relative", height: "200px", overflow: "hidden" }}
        >
          <Image
            src={getImageUrl()}
            alt={getImageAlt()}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Status Badge */}
          {project.acf?.projectStatus && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                backgroundColor:
                  project.acf.projectStatus === "active"
                    ? "#10b981"
                    : "#6b7280",
                color: "white",
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              {project.acf.projectStatus === "active"
                ? "ดำเนินการ"
                : "เสร็จสิ้น"}
            </div>
          )}
        </div>

        {/* Project Content */}
        <div
          style={{
            padding: "1.5rem",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#047857",
              marginBottom: "0.75rem",
              lineHeight: "1.4",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.title.rendered}
          </h3>

          {/* Project Details */}
          <div style={{ marginBottom: "1rem", flexGrow: 1 }}>
            {project.acf?.project_duration && (
              <div
                style={{
                  fontSize: "14px",
                  marginBottom: "8px",
                  display: "flex",
                }}
              >
                <span
                  style={{
                    color: "#374151",
                    fontWeight: "500",
                    minWidth: "fit-content",
                    marginRight: "8px",
                  }}
                >
                  ระยะเวลา:
                </span>
                <span style={{ color: "#6b7280", lineHeight: "1.4" }}>
                  {project.acf.project_duration}
                </span>
              </div>
            )}

            {project.acf?.project_location && (
              <div
                style={{
                  fontSize: "14px",
                  marginBottom: "8px",
                  display: "flex",
                }}
              >
                <span
                  style={{
                    color: "#374151",
                    fontWeight: "500",
                    minWidth: "fit-content",
                    marginRight: "8px",
                  }}
                >
                  สถานที่:
                </span>
                <span style={{ color: "#6b7280", lineHeight: "1.4" }}>
                  {project.acf.project_location}
                </span>
              </div>
            )}
          </div>

          <div
            style={{
              marginTop: "auto",
              paddingTop: "1rem",
              borderTop: "1px solid #f3f4f6",
            }}
          >
            <span
              style={{
                color: "#059669",
                fontSize: "14px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
              }}
            >
              อ่านเพิ่มเติม
              <span style={{ marginLeft: "4px" }}>→</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
