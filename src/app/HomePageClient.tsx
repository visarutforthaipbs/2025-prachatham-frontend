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
import { motion } from "framer-motion";

interface HomePageClientProps {
  featuredPosts: WordPressPost[];
  latestProjects: WordPressProject[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

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
      <div className="min-h-[78vh] md:min-h-[86vh] relative flex items-center overflow-hidden">
        {/* Background image container with Ken Burns effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/hero-1-page-1.jpg"
            alt="ประชาธรรม — สื่อชุมชน"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
            className="animate-ken-burns"
          />
        </div>
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(90deg, rgba(1,33,29,0.92) 0%, rgba(4,75,65,0.76) 48%, rgba(4,75,65,0.3) 100%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-[2] w-full">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8 max-w-3xl text-white"
          >
            {/* Overline */}
            <motion.span 
              variants={fadeInUp}
              className="inline-block self-start border-l-2 border-accent-300 pl-4 text-white/90 text-sm font-semibold tracking-normal"
            >
              มูลนิธิสื่อประชาธรรม
            </motion.span>

            <motion.h1 
              variants={fadeInUp}
              className="text-[clamp(1.5rem,7.4vw,4.5rem)] font-bold leading-[1.22] overflow-visible"
            >
              <span className="block whitespace-nowrap">เราสนับสนุนการเปลี่ยนแปลง</span>
              <span className="block whitespace-nowrap">ผ่านสื่อชุมชน</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/88 max-w-2xl font-light"
            >
              มูลนิธิประชาธรรม เป็นองค์กรที่มุ่งหวังสร้างการเปลี่ยนแปลงเชิงบวก
              ผ่านการเสริมสร้างพลังของชุมชนในการสื่อสารและเล่าเรื่องราวของตัวเอง
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex items-center gap-4 flex-wrap pt-2"
            >
              <Link
                href="/about"
                className="btn-secondary bg-white border-none hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-xl transition-all text-lg px-8 py-3"
              >
                เรียนรู้เพิ่มเติม
              </Link>
              <Link
                href="/causes"
                className="text-white border border-white/50 rounded-md px-8 py-3 text-lg hover:bg-white/15 hover:border-white hover:-translate-y-0.5 transition-all"
              >
                ดูโครงการ
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bouncing scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-1.5 opacity-70 animate-bounce-indicator pointer-events-none">
          <span className="text-white/60 text-xs tracking-wider uppercase font-semibold">เลื่อนลงเพื่อดูเพิ่มเติม</span>
          <div className="w-5 h-8 border border-white/40 rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" as const }}
              className="w-1.5 h-1.5 bg-white rounded-full" 
            />
          </div>
        </div>
      </div>

      {/* ═══ Featured News ═══ */}
      <SectionWrapper bg="bg-[#fbfcf7] dark:bg-forest-950">
        <PageHeader
          overline="ข่าวสาร"
          title="ข่าวเด่นประจำสัปดาห์"
          subtitle="ติดตามข่าวสารและเรื่องราวล่าสุดจากชุมชนทั่วประเทศ"
        />

        {featuredPosts && featuredPosts.length > 0 ? (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12"
          >
            {featuredPosts.map((post) => (
              <motion.div key={post.id} variants={fadeInUp} className="h-full">
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 dark:text-gray-550">ไม่พบข่าวเด่นในขณะนี้</p>
          </div>
        )}

        <div className="flex justify-center">
          <Link
            href="/posts"
            className="btn-secondary px-8 py-3 text-lg inline-flex items-center gap-2"
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
      <SectionWrapper bg="bg-white dark:bg-forest-900">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        >
          <motion.div variants={fadeInUp} className="flex flex-col items-start gap-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-600">ABOUT US</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-700">
              ภารกิจของเรา
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              เราเชื่อว่าการเปลี่ยนแปลงที่ยั่งยืนเกิดขึ้นได้เมื่อชุมชนมีเสียง
              มีพื้นที่ในการเล่าเรื่องราวของตัวเอง
              และมีเครื่องมือในการสื่อสารกับสังคมที่กว้างขึ้น
            </p>
            <Link href="/about" className="btn-primary">
              เรียนรู้เพิ่มเติม
            </Link>
          </motion.div>

          <motion.div 
            variants={fadeInUp} 
            className="rounded-lg overflow-hidden shadow-xl border border-black/5 dark:border-white/5"
          >
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
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* ═══ Latest Projects ═══ */}
      <SectionWrapper bg="bg-[#fbfcf7] dark:bg-forest-950">
        <PageHeader
          overline="ผลงาน"
          title="โครงการล่าสุด"
          subtitle="ดูโครงการและกิจกรรมล่าสุดที่เราได้ดำเนินการอยู่"
        />

        {latestProjects && latestProjects.length > 0 ? (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12"
          >
            {latestProjects.slice(0, 3).map((project) => (
              <motion.div key={project.id} variants={fadeInUp}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 dark:text-gray-500">ไม่พบโครงการในขณะนี้</p>
          </div>
        )}

        <div className="flex justify-center">
          <Link
            href="/causes"
            className="btn-secondary px-8 py-3 text-lg inline-flex items-center gap-2"
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
            "linear-gradient(135deg, var(--color-brand-600), var(--color-brand-700), var(--color-forest-950))",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 relative z-[1]">
          <div className="flex flex-col gap-4 text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              ผลงานของเรา
            </h2>
            <p className="text-base md:text-lg text-white/80 max-w-lg mx-auto">
              ตัวเลขที่สะท้อนถึงผลกระทบเชิงบวกที่เราสร้างให้กับชุมชน
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp}>
                <StatCard value={stat.value} label={stat.label} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ═══ Call to Action ═══ */}
      <SectionWrapper bg="bg-white dark:bg-forest-950" narrow>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col gap-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-700">
            ร่วมเป็นส่วนหนึ่งกับเรา
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-lg mx-auto">
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
        </motion.div>
      </SectionWrapper>
    </div>
  );
}
