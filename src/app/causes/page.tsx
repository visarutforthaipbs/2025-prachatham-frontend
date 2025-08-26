import { Metadata } from "next";
import { wordpressApi } from "@/lib/wordpress";
import CausesPageClient from "./CausesPageClient";

export const metadata: Metadata = {
  title: "โครงการของเรา | มูลนิิธิสื่อประชาธรรม",
  description:
    "ค้นพบโครงการและกิจกรรมต่างๆ ของมูลนิธิสื่อประชาธรรม ที่มุ่งเน้นการพัฒนาสังคมและชุมชนอย่างยั่งยืน",
  keywords: ["โครงการ", "กิจกรรม", "มูลนิธิ", "ประชาธรรม", "พัฒนาชุมชน"],
  openGraph: {
    title: "โครงการของเรา | มูลนิธิประชาธรรม",
    description:
      "ค้นพบโครงการและกิจกรรมต่างๆ ของมูลนิธิประชาธรรม ที่มุ่งเน้นการพัฒนาสังคมและชุมชนอย่างยั่งยืน",
    type: "website",
  },
};

export default async function CausesPage() {
  try {
    const { projects } = await wordpressApi.getProjects();
    return <CausesPageClient projects={projects} />;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return <CausesPageClient projects={[]} />;
  }
}
