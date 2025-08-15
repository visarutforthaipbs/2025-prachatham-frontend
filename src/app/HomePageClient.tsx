"use client";

import Image from "next/image";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import ProjectCard from "@/components/ProjectCard";
import type { WordPressPost, WordPressProject } from "@/lib/wordpress";

interface HomePageClientProps {
  featuredPosts: WordPressPost[];
  latestProjects: WordPressProject[];
}

export default function HomePageClient({
  featuredPosts,
  latestProjects,
}: HomePageClientProps) {
  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: "url('/images/hero-1-page-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(5, 150, 105, 0.75)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1rem",
            position: "relative",
            zIndex: 2,
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "896px", margin: "0 auto", color: "white" }}>
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                lineHeight: "1.2",
                color: "white",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                marginBottom: "1.5rem",
              }}
            >
              เราสนับสนุนการเปลี่ยนแปลงผ่านสื่อชุมชน
            </h1>
            <p
              style={{
                fontSize: "1.25rem",
                lineHeight: "1.6",
                maxWidth: "768px",
                margin: "0 auto 2rem auto",
                color: "white",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              มูลนิธิประชาธรรม เป็นองค์กรที่มุ่งหวังสร้างการเปลี่ยนแปลงเชิงบวก
              ผ่านการเสริมสร้างพลังของชุมชนในการสื่อสารและเล่าเรื่องราวของตัวเอง
            </p>
            <Link
              href="/about"
              style={{
                display: "inline-block",
                padding: "1rem 2rem",
                fontSize: "1.125rem",
                backgroundColor: "white",
                color: "#047857",
                textDecoration: "none",
                borderRadius: "0.5rem",
                fontWeight: "600",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              เรียนรู้เพิ่มเติม
            </Link>
          </div>
        </div>
      </div>

      {/* Featured News Section */}
      <div style={{ backgroundColor: "white", padding: "4rem 0" }}>
        <div
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}
        >
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "2.25rem",
                color: "#047857",
                marginBottom: "1rem",
                fontWeight: "bold",
              }}
            >
              ข่าวเด่นประจำสัปดาห์
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#6b7280",
                maxWidth: "512px",
                margin: "0 auto",
              }}
            >
              ติดตามข่าวสารและเรื่องราวล่าสุดจากชุมชนทั่วประเทศ
            </p>
          </div>

          {featuredPosts && featuredPosts.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
                marginBottom: "3rem",
              }}
            >
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <p style={{ color: "#6b7280" }}>ไม่พบข่าวเด่นในขณะนี้</p>
            </div>
          )}

          <div style={{ textAlign: "center" }}>
            <Link
              href="/posts"
              style={{
                display: "inline-block",
                padding: "0.75rem 2rem",
                fontSize: "1.125rem",
                border: "2px solid #059669",
                color: "#059669",
                textDecoration: "none",
                borderRadius: "0.5rem",
                fontWeight: "600",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#059669";
                e.currentTarget.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#059669";
              }}
            >
              ดูข่าวทั้งหมด
            </Link>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div style={{ backgroundColor: "#f0fdf4", padding: "4rem 0" }}>
        <div
          style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 1rem" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "2.25rem",
                  color: "#047857",
                  marginBottom: "1.5rem",
                }}
              >
                ภารกิจของเรา
              </h2>
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "#374151",
                  lineHeight: "1.6",
                  marginBottom: "1.5rem",
                }}
              >
                เราเชื่อว่าการเปลี่ยนแปลงที่ยั่งยืนเกิดขึ้นได้เมื่อชุมชนมีเสียง
                มีพื้นที่ในการเล่าเรื่องราวของตัวเอง
                และมีเครื่องมือในการสื่อสารกับสังคมที่กว้างขึ้น
              </p>
              <Link
                href="/about"
                style={{
                  display: "inline-block",
                  padding: "0.75rem 2rem",
                  fontSize: "1.125rem",
                  backgroundColor: "#059669",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "0.5rem",
                  fontWeight: "600",
                  transition: "all 0.2s ease-in-out",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#047857";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#059669";
                }}
              >
                เรียนรู้เพิ่มเติม
              </Link>
            </div>

            <div
              style={{
                position: "relative",
                borderRadius: "0.5rem",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/about-1.jpg"
                alt="ภารกิจของมูลนิธิประชาธรรม"
                width={600}
                height={400}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "0.5rem",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Latest News Section */}
      <div style={{ backgroundColor: "white", padding: "4rem 0" }}>
        <div
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}
        >
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "2.25rem",
                color: "#047857",
                marginBottom: "1rem",
                fontWeight: "bold",
              }}
            >
              โครงการล่าสุด
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#6b7280",
                maxWidth: "512px",
                margin: "0 auto",
              }}
            >
              ดูโครงการและกิจกรรมล่าสุดที่เราได้ดำเนินการอยู่
            </p>
          </div>

          {latestProjects && latestProjects.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
                marginBottom: "3rem",
              }}
            >
              {latestProjects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <p style={{ color: "#6b7280" }}>ไม่พบโครงการในขณะนี้</p>
            </div>
          )}

          <div style={{ textAlign: "center" }}>
            <Link
              href="/causes"
              style={{
                display: "inline-block",
                padding: "0.75rem 2rem",
                fontSize: "1.125rem",
                border: "2px solid #059669",
                color: "#059669",
                textDecoration: "none",
                borderRadius: "0.5rem",
                fontWeight: "600",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#059669";
                e.currentTarget.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#059669";
              }}
            >
              ดูโครงการทั้งหมด
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div
        style={{
          backgroundColor: "#047857",
          padding: "4rem 0",
          color: "white",
        }}
      >
        <div
          style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 1rem" }}
        >
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "2.25rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              ผลงานของเรา
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "rgba(255,255,255,0.9)",
                maxWidth: "512px",
                margin: "0 auto",
              }}
            >
              ตัวเลขที่สะท้อนถึงผลกระทบเชิงบวกที่เราสร้างให้กับชุมชน
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              { label: "โครงการที่ดำเนินการ", value: "30+" },
              { label: "ชุมชนที่ร่วมงาน", value: "20+" },
              { label: "บทความที่เผยแพร่", value: "300+" },
              { label: "ปีที่ดำเนินงาน", value: "15+" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: "0.5rem",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "1.125rem",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div style={{ backgroundColor: "#f9fafb", padding: "4rem 0" }}>
        <div
          style={{
            maxWidth: "896px",
            margin: "0 auto",
            padding: "0 1rem",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "2.25rem",
              color: "#047857",
              marginBottom: "1rem",
            }}
          >
            ร่วมเป็นส่วนหนึ่งกับเรา
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              maxWidth: "512px",
              margin: "0 auto 2rem auto",
            }}
          >
            หากคุณมีเรื่องราวที่ต้องการเล่า หรือต้องการสนับสนุนงานของเรา
            เรายินดีต้อนรับทุกคน
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link
              href="/contact"
              style={{
                display: "inline-block",
                padding: "0.75rem 2rem",
                fontSize: "1.125rem",
                backgroundColor: "#059669",
                color: "white",
                textDecoration: "none",
                borderRadius: "0.5rem",
                fontWeight: "600",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#047857";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#059669";
              }}
            >
              ติดต่อเรา
            </Link>
            <Link
              href="/donate"
              style={{
                display: "inline-block",
                padding: "0.75rem 2rem",
                fontSize: "1.125rem",
                border: "2px solid #059669",
                color: "#059669",
                textDecoration: "none",
                borderRadius: "0.5rem",
                fontWeight: "600",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#059669";
                e.currentTarget.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#059669";
              }}
            >
              สนับสนุนเรา
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
