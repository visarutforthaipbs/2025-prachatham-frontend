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
  Badge,
  Image,
  Flex,
  Spinner,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { WordPressProject } from "@/lib/wordpress";

interface CausesPageClientProps {
  projects: WordPressProject[];
}

const MotionCard = motion.create(Card);

export default function CausesPageClient({ projects }: CausesPageClientProps) {
  return (
    <Container maxW="7xl" py={8}>
      <VStack align="stretch" spacing={8}>
        {/* Breadcrumb */}
        <HStack fontSize="sm" color="gray.500">
          <ChakraLink as={Link} href="/" _hover={{ color: "prachatham.600" }}>
            หน้าแรก
          </ChakraLink>
          <Text>/</Text>
          <Text color="gray.700" fontWeight="medium">
            โครงการของเรา
          </Text>
        </HStack>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box textAlign="center">
            <Badge colorScheme="green" fontSize="md" px={4} py={2} mb={4}>
              โครงการและผลงาน
            </Badge>
            <Heading as="h1" size="2xl" color="prachatham.700" mb={4}>
              โครงการของมูลนิธิประชาธรรม
            </Heading>
            <Text
              fontSize="xl"
              color="gray.600"
              maxW="4xl"
              mx="auto"
              lineHeight="tall"
            >
              ดูผลงานและโครงการทั้งหมดที่เราได้ดำเนินการมา
              เพื่อสร้างการเปลี่ยนแปลงเชิงบวกในชุมชนและสังคม
            </Text>
          </Box>
        </motion.div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {projects.map((project, index) => (
                <MotionCard
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  overflow="hidden"
                  bg="white"
                  boxShadow="md"
                  _hover={{
                    boxShadow: "xl",
                  }}
                >
                  {/* Project Image */}
                  {project._embedded?.["wp:featuredmedia"]?.[0] && (
                    <Box position="relative" h="200px" overflow="hidden">
                      <Image
                        src={
                          project._embedded["wp:featuredmedia"][0].media_details
                            ?.sizes?.medium?.source_url ||
                          project._embedded["wp:featuredmedia"][0].source_url
                        }
                        alt={
                          project._embedded["wp:featuredmedia"][0].alt_text ||
                          project.title.rendered
                        }
                        objectFit="cover"
                        w="100%"
                        h="100%"
                        transition="transform 0.3s ease"
                        _hover={{ transform: "scale(1.05)" }}
                      />
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg="linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))"
                      />

                      {/* Project Status Badge on Image */}
                      {project.acf?.projectStatus && (
                        <Badge
                          position="absolute"
                          top={3}
                          right={3}
                          colorScheme={
                            project.acf.projectStatus === "active"
                              ? "green"
                              : "gray"
                          }
                          size="sm"
                          fontSize="xs"
                          px={2}
                          py={1}
                          borderRadius="md"
                          zIndex={2}
                        >
                          {project.acf.projectStatus === "active"
                            ? "ดำเนินการ"
                            : "เสร็จสิ้น"}
                        </Badge>
                      )}
                    </Box>
                  )}

                  <CardBody p={6}>
                    <VStack align="start" spacing={4}>
                      {/* Title */}
                      <Heading
                        as="h3"
                        size="md"
                        color="prachatham.700"
                        lineHeight="shorter"
                        noOfLines={2}
                      >
                        {project.title.rendered}
                      </Heading>

                      {/* Project Details */}
                      <VStack align="start" spacing={2} w="100%">
                        {project.acf?.project_duration && (
                          <Flex align="start" fontSize="sm">
                            <Text
                              color="gray.700"
                              fontWeight="medium"
                              minW="fit-content"
                              mr={2}
                            >
                              ระยะเวลา:
                            </Text>
                            <Text color="gray.600" lineHeight="shorter">
                              {project.acf.project_duration}
                            </Text>
                          </Flex>
                        )}

                        {project.acf?.project_location && (
                          <Flex align="start" fontSize="sm">
                            <Text
                              color="gray.700"
                              fontWeight="medium"
                              minW="fit-content"
                              mr={2}
                            >
                              สถานที่:
                            </Text>
                            <Text color="gray.600" lineHeight="shorter">
                              {project.acf.project_location}
                            </Text>
                          </Flex>
                        )}

                        {project.acf?.project_partners && (
                          <Flex align="start" fontSize="sm">
                            <Text
                              color="gray.700"
                              fontWeight="medium"
                              minW="fit-content"
                              mr={2}
                            >
                              พันธมิตร:
                            </Text>
                            <Text
                              color="gray.600"
                              lineHeight="shorter"
                              noOfLines={2}
                            >
                              {project.acf.project_partners}
                            </Text>
                          </Flex>
                        )}

                        {project.acf?.project_beneficiaries && (
                          <Flex align="start" fontSize="sm">
                            <Text
                              color="gray.700"
                              fontWeight="medium"
                              minW="fit-content"
                              mr={2}
                            >
                              ผู้รับผลประโยชน์:
                            </Text>
                            <Text
                              color="gray.600"
                              lineHeight="shorter"
                              noOfLines={2}
                            >
                              {project.acf.project_beneficiaries}
                            </Text>
                          </Flex>
                        )}
                      </VStack>

                      {/* Read More Button */}
                      <Button
                        as={Link}
                        href={`/projects/${project.slug}`}
                        colorScheme="green"
                        variant="outline"
                        size="sm"
                        alignSelf="start"
                        _hover={{
                          bg: "prachatham.600",
                          color: "white",
                          transform: "translateY(-1px)",
                        }}
                        transition="all 0.2s ease"
                      >
                        อ่านเพิ่มเติม
                      </Button>
                    </VStack>
                  </CardBody>
                </MotionCard>
              ))}
            </SimpleGrid>
          </motion.div>
        ) : (
          <Center py={16}>
            <VStack spacing={4}>
              <Spinner size="xl" color="prachatham.600" />
              <Text color="gray.500" fontSize="lg">
                กำลังโหลดข้อมูลโครงการ...
              </Text>
            </VStack>
          </Center>
        )}

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card bg="prachatham.50" borderColor="prachatham.200">
            <CardBody p={8} textAlign="center">
              <VStack spacing={6}>
                <Heading as="h3" size="lg" mb={4} color="prachatham.700">
                  สนใจร่วมงานกับเรา?
                </Heading>
                <Text
                  color="gray.600"
                  mb={6}
                  maxW="2xl"
                  mx="auto"
                  lineHeight="tall"
                >
                  หากคุณมีไอเดียโครงการที่น่าสนใจ หรือต้องการร่วมมือกับเรา
                  เรายินดีต้อนรับและพร้อมที่จะสนับสนุนการสร้างการเปลี่ยนแปลงที่ดี
                </Text>
                <Flex justify="center" gap={4} flexWrap="wrap">
                  <Button
                    as={Link}
                    href="/contact"
                    colorScheme="green"
                    size="lg"
                    px={8}
                  >
                    ติดต่อเรา
                  </Button>
                  <Button
                    as={Link}
                    href="/donate"
                    variant="outline"
                    colorScheme="green"
                    size="lg"
                    px={8}
                  >
                    ร่วมสนับสนุน
                  </Button>
                  <Button
                    as={Link}
                    href="/about"
                    variant="ghost"
                    colorScheme="green"
                    size="lg"
                    px={8}
                  >
                    เรียนรู้เพิ่มเติม
                  </Button>
                </Flex>
              </VStack>
            </CardBody>
          </Card>
        </motion.div>
      </VStack>
    </Container>
  );
}
