"use client";

import {
  Container,
  Heading,
  Text,
  Box,
  VStack,
  HStack,
  Link as ChakraLink,
  Button,
  Card,
  CardBody,
  SimpleGrid,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Icon,
} from "@chakra-ui/react";
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
    }/images/ps-favicon.svg`,
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
        <Container maxW="6xl" py={8}>
          <VStack align="stretch" gap={8}>
            {/* Breadcrumb */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <HStack fontSize="sm" color="gray.500">
                <ChakraLink
                  as={Link}
                  href="/"
                  _hover={{ color: "prachatham.600" }}
                >
                  หน้าแรก
                </ChakraLink>
                <Text>/</Text>
                <Text color="gray.700" fontWeight="medium">
                  ช่องทางติดต่อเรา
                </Text>
              </HStack>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box textAlign="center">
                <Heading as="h1" size="xl" color="prachatham.700" mb={4}>
                  ช่องทางติดต่อเรา
                </Heading>
                <Text
                  fontSize="xl"
                  color="gray.600"
                  maxW="3xl"
                  mx="auto"
                  lineHeight="tall"
                >
                  เรายินดีรับฟังความคิดเห็น คำแนะนำ และข้อเสนอแนะจากทุกท่าน
                </Text>
              </Box>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
                {/* Contact Information */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card h="full">
                    <CardBody>
                      <Heading as="h2" size="lg" color="prachatham.700" mb={6}>
                        ข้อมูลการติดต่อ
                      </Heading>

                      <VStack align="stretch" gap={6}>
                        <Box>
                          <HStack mb={2}>
                            <Icon as={FaMapMarkerAlt} color="prachatham.600" />
                            <Text fontWeight="semibold" color="gray.700">
                              ที่อยู่
                            </Text>
                          </HStack>
                          <Text color="gray.600" lineHeight="tall">
                            77/1 หมู่ 5 ต.สุเทพ อ.เมืองจ.เชียงใหม่ 50200
                          </Text>
                        </Box>

                        <Box>
                          <HStack mb={2}>
                            <Icon as={FaEnvelope} color="prachatham.600" />
                            <Text fontWeight="semibold" color="gray.700">
                              อีเมล
                            </Text>
                          </HStack>
                          <VStack align="start" gap={1}>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <ChakraLink
                                href="mailto:pnn.thailand@gmail.com"
                                color="prachatham.600"
                                _hover={{
                                  color: "prachatham.700",
                                  textDecoration: "underline",
                                }}
                              >
                                pnn.thailand@gmail.com
                              </ChakraLink>
                            </motion.div>
                          </VStack>
                        </Box>

                        <Box>
                          <HStack mb={3}>
                            <Icon as={FaGlobe} color="prachatham.600" />
                            <Text fontWeight="semibold" color="gray.700">
                              ติดตามเราได้ที่
                            </Text>
                          </HStack>
                          <SimpleGrid columns={2} gap={3}>
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <ChakraLink
                                href="https://www.facebook.com/prachatham"
                                isExternal
                                display="flex"
                                alignItems="center"
                                gap={2}
                                color="prachatham.600"
                                fontWeight="medium"
                                _hover={{
                                  color: "prachatham.700",
                                  textDecoration: "underline",
                                }}
                              >
                                <Icon as={FaFacebook} />
                                Facebook
                              </ChakraLink>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <ChakraLink
                                href="https://twitter.com/PrachathamF"
                                isExternal
                                display="flex"
                                alignItems="center"
                                gap={2}
                                color="prachatham.600"
                                fontWeight="medium"
                                _hover={{
                                  color: "prachatham.700",
                                  textDecoration: "underline",
                                }}
                              >
                                <Icon as={FaTwitter} />
                                Twitter
                              </ChakraLink>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <ChakraLink
                                href="https://www.instagram.com/prachathammedia/"
                                isExternal
                                display="flex"
                                alignItems="center"
                                gap={2}
                                color="prachatham.600"
                                fontWeight="medium"
                                _hover={{
                                  color: "prachatham.700",
                                  textDecoration: "underline",
                                }}
                              >
                                <Icon as={FaInstagram} />
                                Instagram
                              </ChakraLink>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <ChakraLink
                                href="https://www.tiktok.com/@prachathammedia"
                                isExternal
                                display="flex"
                                alignItems="center"
                                gap={2}
                                color="prachatham.600"
                                fontWeight="medium"
                                _hover={{
                                  color: "prachatham.700",
                                  textDecoration: "underline",
                                }}
                              >
                                <Icon as={FaTiktok} />
                                TikTok
                              </ChakraLink>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <ChakraLink
                                href="https://www.youtube.com/@pnnontv"
                                isExternal
                                display="flex"
                                alignItems="center"
                                gap={2}
                                color="prachatham.600"
                                fontWeight="medium"
                                _hover={{
                                  color: "prachatham.700",
                                  textDecoration: "underline",
                                }}
                              >
                                <Icon as={FaYoutube} />
                                YouTube
                              </ChakraLink>
                            </motion.div>
                          </SimpleGrid>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card h="full">
                    <CardBody>
                      <Heading as="h2" size="lg" color="prachatham.700" mb={6}>
                        ส่งข้อความถึงเรา
                      </Heading>

                      <VStack as="form" gap={4}>
                        <FormControl>
                          <FormLabel color="gray.700">ชื่อ-นามสกุล</FormLabel>
                          <Input
                            placeholder="กรุณากรอกชื่อ-นามสกุล"
                            focusBorderColor="prachatham.500"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel color="gray.700">อีเมล</FormLabel>
                          <Input
                            type="email"
                            placeholder="กรุณากรอกอีเมล"
                            focusBorderColor="prachatham.500"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel color="gray.700">หัวข้อ</FormLabel>
                          <Input
                            placeholder="กรุณากรอกหัวข้อ"
                            focusBorderColor="prachatham.500"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel color="gray.700">ข้อความ</FormLabel>
                          <Textarea
                            placeholder="กรุณากรอกข้อความที่ต้องการสื่อสาร"
                            rows={6}
                            focusBorderColor="prachatham.500"
                          />
                        </FormControl>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{ width: "100%" }}
                        >
                          <Button
                            colorScheme="green"
                            size="lg"
                            width="full"
                            onClick={() =>
                              alert(
                                "ขณะนี้ฟอร์มยังไม่เชื่อมต่อกับระบบ กรุณาติดต่อผ่านอีเมลแทน"
                              )
                            }
                          >
                            ส่งข้อความ
                          </Button>
                        </motion.div>

                        <Text fontSize="sm" color="gray.500" textAlign="center">
                          หรือติดต่อเราผ่านอีเมล pnn.thailand@gmail.com
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>
                </motion.div>
              </SimpleGrid>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardBody>
                    <Heading
                      as="h2"
                      size="lg"
                      color="prachatham.700"
                      mb={6}
                      textAlign="center"
                    >
                      ลิงก์ด่วน
                    </Heading>

                    <SimpleGrid
                      columns={{ base: 1, md: 3 }}
                      gap={4}
                      maxW="4xl"
                      mx="auto"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          as={Link}
                          href="/about"
                          variant="outline"
                          colorScheme="green"
                          size="lg"
                          height="auto"
                          py={4}
                          whiteSpace="normal"
                          textAlign="center"
                          width="full"
                        >
                          เกี่ยวกับเรา
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          as={Link}
                          href="/causes"
                          variant="outline"
                          colorScheme="green"
                          size="lg"
                          height="auto"
                          py={4}
                          whiteSpace="normal"
                          textAlign="center"
                          width="full"
                        >
                          โครงการของเรา
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          as={Link}
                          href="/posts"
                          variant="outline"
                          colorScheme="green"
                          size="lg"
                          height="auto"
                          py={4}
                          whiteSpace="normal"
                          textAlign="center"
                          width="full"
                        >
                          บทความทั้งหมด
                        </Button>
                      </motion.div>
                    </SimpleGrid>
                  </CardBody>
                </Card>
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
                <Box
                  bg="prachatham.50"
                  borderRadius="lg"
                  p={8}
                  textAlign="center"
                  border="1px solid"
                  borderColor="prachatham.200"
                >
                  <Heading as="h3" size="lg" mb={4} color="prachatham.700">
                    เราสนับสนุนให้ผู้คนบอกเล่าเรื่องด้วยตัวเอง
                  </Heading>
                  <Text color="gray.600" maxW="2xl" mx="auto" lineHeight="tall">
                    หากคุณมีเรื่องราว ปัญหา
                    หรือแนวทางแก้ไขปัญหาท้องถิ่นที่ต้องการเผยแพร่ <br />
                    เราพร้อมรับฟังและช่วยเหลือในการสื่อสาร
                  </Text>
                </Box>
              </motion.div>
            </motion.div>
          </VStack>
        </Container>
      </motion.div>
    </>
  );
}
