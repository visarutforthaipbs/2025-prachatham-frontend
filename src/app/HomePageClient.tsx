"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import PostCard from "@/components/PostCard";
import ProjectCard from "@/components/ProjectCard";
import CategoryChips from "@/components/CategoryChips";
import { SectionWrapper, PageHeader, StatCard } from "@/components/ui";
import dynamic from "next/dynamic";
const AdSense = dynamic(() => import("@/components/AdSense"), { ssr: false });
import type { WordPressPost, WordPressProject, WordPressCategory } from "@/lib/wordpress";
import { motion, useReducedMotion } from "framer-motion";
import HeroSlideshow, { type HeroSlideView } from "@/components/HeroSlideshow";

interface HomePageClientProps {
  heroSlides: HeroSlideView[];
  featuredPosts: WordPressPost[];
  latestProjects: WordPressProject[];
  categories: WordPressCategory[];
}

/* HIG motion: one brief entrance on the hero only (purposeful, < 400 ms,
   natural deceleration). Content below the fold is never hidden behind a
   scroll-reveal — readers scan news, and a scroll-triggered fade on every
   visit is motion on a frequent interaction. */
const EASE = [0.16, 1, 0.3, 1] as const;
const fadeInUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};
const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export default function HomePageClient({
  heroSlides,
  featuredPosts,
  latestProjects,
  categories,
}: HomePageClientProps) {
  const reduceMotion = useReducedMotion();
  const stats = [
    { label: "โครงการที่ดำเนินการ", value: "30+" },
    { label: "ชุมชนที่ร่วมงาน", value: "20+" },
    { label: "บทความที่เผยแพร่", value: "300+" },
    { label: "ปีที่ดำเนินงาน", value: "15+" },
  ];

  return (
    <div>
      {/* ═══ Hero ═══ */}
      <div className="min-h-[72vh] md:min-h-[78vh] relative flex items-center overflow-hidden">
        <HeroSlideshow slides={heroSlides} />
        {/* Scrim — keeps white type ≥ 4.5:1 over the photo */}
        <div
          className="absolute inset-0 z-[1]"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(90deg, rgba(1,33,29,0.92) 0%, rgba(4,75,65,0.8) 50%, rgba(4,75,65,0.4) 100%)",
          }}
        />

        <div
          className={`max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-16 relative z-[2] w-full ${
            heroSlides.length > 1 ? "pb-32 md:pb-28" : "pb-16"
          }`}
        >
          <motion.div
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            className="flex flex-col gap-6 max-w-3xl text-white"
          >
            <motion.p variants={fadeInUp} className="text-base md:text-lg font-bold text-accent-200">
              มูลนิธิสื่อประชาธรรม
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="text-[clamp(1.75rem,7.4vw,4.5rem)] font-bold leading-[1.2]"
            >
              <span className="block whitespace-nowrap">เราสนับสนุนการเปลี่ยนแปลง</span>
              <span className="block whitespace-nowrap">ผ่านสื่อชุมชน</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-white/90 max-w-2xl">
              มูลนิธิประชาธรรม เป็นองค์กรที่มุ่งหวังสร้างการเปลี่ยนแปลงเชิงบวก
              ผ่านการเสริมสร้างพลังของชุมชนในการสื่อสารและเล่าเรื่องราวของตัวเอง
            </motion.p>

            <motion.div variants={fadeInUp} className="flex items-center gap-3 flex-wrap pt-2">
              {/* One prominent action (filled), one secondary (outline) */}
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-2 rounded-full bg-white dark:bg-white text-brand-700 dark:text-brand-700 text-lg font-bold hover:bg-brand-50 transition-colors"
              >
                รู้จักประชาธรรม
                <FaArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/causes"
                className="inline-flex items-center justify-center min-h-[48px] px-7 py-2 rounded-full border border-white/60 text-white text-lg font-bold hover:bg-white/15 transition-colors"
              >
                ดูโครงการ
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ═══ Browse by topic ═══ */}
      {categories && categories.length > 0 && (
        <div className="bg-[#fbfcf7] dark:bg-forest-950 border-b border-black/5 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-5 flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <h2 className="shrink-0 text-sm font-bold text-gray-700 dark:text-gray-300">
              เลือกอ่านตามหัวข้อ
            </h2>
            <CategoryChips categories={categories} />
          </div>
        </div>
      )}

      {/* ═══ Featured News ═══ */}
      <SectionWrapper bg="bg-[#fbfcf7] dark:bg-forest-950">
        <PageHeader
          overline="ข่าวสาร"
          title="ข่าวเด่นประจำสัปดาห์"
          subtitle="ติดตามข่าวสารและเรื่องราวล่าสุดจากชุมชนทั่วประเทศ"
        />

        {featuredPosts && featuredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-10">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState text="ยังไม่มีข่าวเด่นในขณะนี้" href="/posts" cta="ดูบทความทั้งหมด" />
        )}

        <div className="flex justify-center">
          <Link href="/posts" className="btn-secondary">
            ดูข่าวทั้งหมด
            <FaArrowRight className="w-3 h-3" aria-hidden="true" />
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

      {/* ═══ Mission ═══ */}
      <SectionWrapper bg="bg-white dark:bg-forest-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="flex flex-col items-start gap-4">
            <p className="text-sm font-bold text-brand-700 dark:text-brand-200">เกี่ยวกับเรา</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-950 dark:text-gray-50 leading-[1.2]">
              ภารกิจของเรา
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl">
              เราเชื่อว่าการเปลี่ยนแปลงที่ยั่งยืนเกิดขึ้นได้เมื่อชุมชนมีเสียง
              มีพื้นที่ในการเล่าเรื่องราวของตัวเอง
              และมีเครื่องมือในการสื่อสารกับสังคมที่กว้างขึ้น
            </p>
            <Link href="/about" className="btn-secondary mt-2">
              อ่านเรื่องราวของเรา
              <FaArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>

          <div className="rounded-xl overflow-hidden">
            <Image
              src="/images/about-1.jpg"
              alt="ภารกิจของมูลนิธิประชาธรรม"
              width={600}
              height={400}
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </SectionWrapper>

      {/* ═══ Latest Projects ═══ */}
      <SectionWrapper bg="bg-[#fbfcf7] dark:bg-forest-950">
        <PageHeader
          overline="ผลงาน"
          title="โครงการล่าสุด"
          subtitle="ดูโครงการและกิจกรรมล่าสุดที่เราได้ดำเนินการอยู่"
        />

        {latestProjects && latestProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-10">
            {latestProjects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState text="ยังไม่มีโครงการในขณะนี้" href="/about" cta="รู้จักประชาธรรม" />
        )}

        <div className="flex justify-center">
          <Link href="/causes" className="btn-secondary">
            ดูโครงการทั้งหมด
            <FaArrowRight className="w-3 h-3" aria-hidden="true" />
          </Link>
        </div>
      </SectionWrapper>

      {/* ═══ Impact ═══ */}
      <section className="py-14 md:py-20 text-white bg-brand-600">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col gap-2 text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2]">ผลงานของเรา</h2>
            <p className="text-lg md:text-xl text-white/85 max-w-lg mx-auto">
              ตัวเลขที่สะท้อนถึงผลกระทบเชิงบวกที่เราสร้างให้กับชุมชน
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:divide-x md:divide-white/20">
            {stats.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Call to Action ═══ */}
      <SectionWrapper bg="bg-white dark:bg-forest-950" narrow>
        <div className="flex flex-col gap-6 text-center items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-950 dark:text-gray-50 leading-[1.2]">
            ร่วมเป็นส่วนหนึ่งกับเรา
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg">
            หากคุณมีเรื่องราวที่ต้องการเล่า หรือต้องการสนับสนุนงานของเรา
            เรายินดีต้อนรับทุกคน
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
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

/** Empty state: say what the section is for and offer the next step. */
function EmptyState({ text, href, cta }: { text: string; href: string; cta: string }) {
  return (
    <div className="text-center py-10 flex flex-col items-center gap-3">
      <p className="text-gray-600 dark:text-gray-300">{text}</p>
      <Link href={href} className="text-brand-700 dark:text-brand-200 font-bold underline underline-offset-4">
        {cta}
      </Link>
    </div>
  );
}
