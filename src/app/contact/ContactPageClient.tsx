"use client";

import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaGlobe,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

export default function ContactPageClient() {
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ประชาธรรม",
    alternateName: "Prachatham",
    description: "องค์กรสื่อสิ่งแวดล้อมไทย เพื่อการอนุรักษ์และพัฒนาที่ยั่งยืน",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://prachatham.org",
    logo: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://prachatham.org"
    }/new-favicon.svg`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "",
      contactType: "customer service",
      email: "pnn.thailand@gmail.com",
      availableLanguage: ["th", "Thai"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "77/1 หมู่ 5 ต.สุเทพ",
      addressLocality: "เมืองจ.เชียงใหม่",
      postalCode: "50200",
      addressCountry: "TH",
    },
    sameAs: [
      "https://www.facebook.com/prachatham",
      "https://twitter.com/PrachathamF",
      "https://www.instagram.com/prachathammedia/",
      "https://www.tiktok.com/@prachathammedia",
      "https://www.youtube.com/@pnnontv",
    ],
  };

  const contactPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "ช่องทางติดต่อเรา | ประชาธรรม",
    description:
      "ติดต่อประชาธรรม สื่อสิ่งแวดล้อมไทย - รับฟังความคิดเห็น คำแนะนำ และข้อเสนอแนะจากทุกท่าน",
    url: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://prachatham.org"
    }/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "ประชาธรรม",
    },
  };

  return (
    <>
      {/* Structured Data */}
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <Script
        id="contact-page-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageStructuredData),
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="flex flex-col gap-8">
            {/* Breadcrumb */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 dark:text-gray-400">
                <Link href="/" className="hover:text-brand-600 transition-colors">
                  หน้าแรก
                </Link>
                <span className="text-gray-300 dark:text-gray-600 dark:text-gray-400">/</span>
                <span className="text-gray-700 font-medium">
                  ช่องทางติดต่อเรา
                </span>
              </div>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-brand-700 mb-4">
                  ช่องทางติดต่อเรา
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  เรายินดีรับฟังความคิดเห็น คำแนะนำ และข้อเสนอแนะจากทุกท่าน
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Information */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card h-full">
                    <div className="p-6">
                      <h2 className="text-xl md:text-2xl font-bold text-brand-700 mb-6">
                        ข้อมูลการติดต่อ
                      </h2>

                      <div className="flex flex-col gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <FaMapMarkerAlt className="text-brand-600" />
                            <span className="font-semibold text-gray-700 dark:text-gray-200">
                              ที่อยู่
                            </span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            77/1 หมู่ 5 ต.สุเทพ อ.เมืองจ.เชียงใหม่ 50200
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <FaGlobe className="text-brand-600" />
                            <span className="font-semibold text-gray-700 dark:text-gray-200">
                              ติดตามเราได้ที่
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <a
                                href="https://www.facebook.com/prachatham"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-brand-600 font-medium hover:text-brand-700 hover:underline"
                              >
                                <FaFacebook />
                                Facebook
                              </a>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <a
                                href="https://twitter.com/PrachathamF"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-brand-600 font-medium hover:text-brand-700 hover:underline"
                              >
                                <FaTwitter />
                                Twitter
                              </a>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <a
                                href="https://www.instagram.com/prachathammedia/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-brand-600 font-medium hover:text-brand-700 hover:underline"
                              >
                                <FaInstagram />
                                Instagram
                              </a>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <a
                                href="https://www.tiktok.com/@prachathammedia"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-brand-600 font-medium hover:text-brand-700 hover:underline"
                              >
                                <FaTiktok />
                                TikTok
                              </a>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <a
                                href="https://www.youtube.com/@pnnontv"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-brand-600 font-medium hover:text-brand-700 hover:underline"
                              >
                                <FaYoutube />
                                YouTube
                              </a>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card h-full">
                    <div className="p-6">
                      <h2 className="text-xl md:text-2xl font-bold text-brand-700 mb-6">
                        ส่งข้อความถึงเรา
                      </h2>

                      <div className="flex flex-col gap-6 py-8">
                        <div className="text-center">
                          <FaEnvelope className="text-brand-600 text-5xl mx-auto mb-4" />
                          <p className="text-lg text-gray-700 font-semibold mb-2">
                            ติดต่อเราผ่านอีเมล
                          </p>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <a
                              href="mailto:pnn.thailand@gmail.com"
                              className="text-xl text-brand-600 font-bold hover:text-brand-700 hover:underline"
                            >
                              pnn.thailand@gmail.com
                            </a>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.3 }}>
                <div className="card">
                  <div className="p-6">
                    <h2 className="text-xl md:text-2xl font-bold text-brand-700 mb-6 text-center">
                      ลิงก์ด่วน
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href="/about"
                          className="btn-outline-green w-full text-center block py-4"
                        >
                          เกี่ยวกับเรา
                        </Link>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href="/causes"
                          className="btn-outline-green w-full text-center block py-4"
                        >
                          โครงการของเรา
                        </Link>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href="/posts"
                          className="btn-outline-green w-full text-center block py-4"
                        >
                          บทความทั้งหมด
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Mission Statement */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-brand-50 rounded-lg p-8 text-center border border-brand-200">
                  <h3 className="text-xl md:text-2xl font-bold text-brand-700 mb-4">
                    เราสนับสนุนให้ผู้คนบอกเล่าเรื่องด้วยตัวเอง
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    หากคุณมีเรื่องราว ปัญหา
                    หรือแนวทางแก้ไขปัญหาท้องถิ่นที่ต้องการเผยแพร่ <br />
                    เราพร้อมรับฟังและช่วยเหลือในการสื่อสาร
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
