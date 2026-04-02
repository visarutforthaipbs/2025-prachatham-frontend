"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import PostCard from "@/components/PostCard";
import ProjectCard from "@/components/ProjectCard";
import { SectionWrapper, PageHeader, StatCard } from "@/components/ui";
import dynamic from "next/dynamic";
const AdSense = dynamic(() => import("@/components/AdSense"), { ssr: false });
import type { WordPressPost, WordPressProject } from "@/lib/wordpress";

interface HomePageClientProps {
  featuredPosts: WordPressPost[];
  latestProjects: WordPressProject[];
}

export default function HomePageClient({
  featuredPosts,
  latestProjects,
}: HomePageClientProps) {
  const stats = [
    { label: "โครงการที่ดำเนินการ", value: "30+" },
    { label: "ชุมชนที่ร่วมงาน", value: "20+" },
    { label: "บทความที่เผยแพร่", value: "300+" },
    { label: "ปีที่ดำเนินงาน", value: "15+" },
  ];

  return (
    <div>
      {/* ═══ Hero Section ═══ */}
      <div className="min-h-[85vh] md:min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-1-page-1.jpg"
            alt="ประชาธรรม — สื่อชุมชน"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(4,75,65,0.82), rgba(3,61,53,0.88))",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-[2] text-center">
          <div className="flex flex-col gap-8 max-w-4xl mx-auto text-white">
            {/* Overline */}
            <span className="inline-block self-center bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-semibold tracking-widest">
              มูลนิธิสื่อประชาธรรม
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              เราสนับสนุนการเปลี่ยนแปลง
              <br />
              ผ่านสื่อชุมชน
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              มูลนิธิประชาธรรม เป็นองค์กรที่มุ่งหวังสร้างการเปลี่ยนแปลงเชิงบวก
              ผ่านการเสริมสร้างพลังของชุมชนในการสื่อสารและเล่าเรื่องราวของตัวเอง
            </p>

            <div className="flex items-center gap-4 flex-wrap justify-center pt-2">
              <Link
                href="/about"
                className="btn-secondary bg-white border-none hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-xl transition-all text-lg px-8 py-3 rounded-full"
              >
                เรียนรู้เพิ่มเติม
              </Link>
              <Link
                href="/causes"
                className="text-white border border-white/50 rounded-full px-8 py-3 text-lg hover:bg-white/20 hover:border-white hover:-translate-y-0.5 transition-all"
              >
                ดูโครงการ
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]"
          aria-hidden="true"
        >
          <div className="w-7 h-11 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-[3px] h-2.5 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* ═══ Featured News ═══ */}
      <SectionWrapper bg="white">
        <PageHeader
          overline="ข่าวสาร"
          title="ข่าวเด่นประจำสัปดาห์"
          subtitle="ติดตามข่าวสารและเรื่องราวล่าสุดจากชุมชนทั่วประเทศ"
        />

        {featuredPosts && featuredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">ไม่พบข่าวเด่นในขณะนี้</p>
          </div>
        )}

        <div className="flex justify-center">
          <Link
            href="/posts"
            className="btn-secondary rounded-full px-8 py-3 text-lg inline-flex items-center gap-2"
          >
            ดูข่าวทั้งหมด
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </SectionWrapper>

      {/* Small non-intrusive ad between sections */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <AdSense
          slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME || ""}
          format="horizontal"
          maxHeight="90px"
        />
      </div>

      {/* ═══ Mission Section ═══ */}
      <SectionWrapper bg="gray.50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="flex flex-col items-start gap-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-600">ABOUT US</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-700">
              ภารกิจของเรา
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              เราเชื่อว่าการเปลี่ยนแปลงที่ยั่งยืนเกิดขึ้นได้เมื่อชุมชนมีเสียง
              มีพื้นที่ในการเล่าเรื่องราวของตัวเอง
              และมีเครื่องมือในการสื่อสารกับสังคมที่กว้างขึ้น
            </p>
            <Link href="/about" className="btn-primary">
              เรียนรู้เพิ่มเติม
            </Link>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/about-1.jpg"
              alt="ภารกิจของมูลนิธิประชาธรรม"
              width={600}
              height={400}
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>
      </SectionWrapper>

      {/* ═══ Latest Projects ═══ */}
      <SectionWrapper bg="white">
        <PageHeader
          overline="ผลงาน"
          title="โครงการล่าสุด"
          subtitle="ดูโครงการและกิจกรรมล่าสุดที่เราได้ดำเนินการอยู่"
        />

        {latestProjects && latestProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {latestProjects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">ไม่พบโครงการในขณะนี้</p>
          </div>
        )}

        <div className="flex justify-center">
          <Link
            href="/causes"
            className="btn-secondary rounded-full px-8 py-3 text-lg inline-flex items-center gap-2"
          >
            ดูโครงการทั้งหมด
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </SectionWrapper>

      {/* ═══ Statistics Section ═══ */}
      <div
        className="py-16 md:py-20 text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-600), var(--color-brand-700), var(--color-gray-900))",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-white/5" />
        <div className="absolute -bottom-15 -left-15 w-[200px] h-[200px] rounded-full bg-white/5" />

        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 relative z-[1]">
          <div className="flex flex-col gap-4 text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              ผลงานของเรา
            </h2>
            <p className="text-base md:text-lg text-white/80 max-w-lg mx-auto">
              ตัวเลขที่สะท้อนถึงผลกระทบเชิงบวกที่เราสร้างให้กับชุมชน
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Call to Action ═══ */}
      <SectionWrapper bg="white" narrow>
        <div className="flex flex-col gap-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-700">
            ร่วมเป็นส่วนหนึ่งกับเรา
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-lg mx-auto">
            หากคุณมีเรื่องราวที่ต้องการเล่า หรือต้องการสนับสนุนงานของเรา
            เรายินดีต้อนรับทุกคน
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="/contact" className="btn-primary">
              ติดต่อเรา
            </Link>
            <Link href="/donate" className="btn-secondary">
              สนับสนุนเรา
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
