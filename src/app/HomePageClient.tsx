"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  VStack,
  HStack,
  Flex,
  Stat,
  StatNumber,
  StatLabel,
} from "@chakra-ui/react";
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
  const stats = [
    { label: "โครงการที่ดำเนินการ", value: "30+" },
    { label: "ชุมชนที่ร่วมงาน", value: "20+" },
    { label: "บทความที่เผยแพร่", value: "300+" },
    { label: "ปีที่ดำเนินงาน", value: "15+" },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        minH="100vh"
        bgImage="url('/images/hero-1-page-1.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(5, 150, 105, 0.75)"
          zIndex={1}
        />
        <Container maxW="7xl" position="relative" zIndex={2} textAlign="center">
          <VStack maxW="4xl" mx="auto" color="white" spacing={6}>
            <Heading
              as="h1"
              fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              lineHeight="1.2"
              textShadow="2px 2px 4px rgba(0,0,0,0.3)"
            >
              เราสนับสนุนการเปลี่ยนแปลงผ่านสื่อชุมชน
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              lineHeight="1.6"
              maxW="3xl"
              textShadow="1px 1px 2px rgba(0,0,0,0.3)"
            >
              มูลนิธิประชาธรรม เป็นองค์กรที่มุ่งหวังสร้างการเปลี่ยนแปลงเชิงบวก
              ผ่านการเสริมสร้างพลังของชุมชนในการสื่อสารและเล่าเรื่องราวของตัวเอง
            </Text>
            <Button
              as={Link}
              href="/about"
              size="lg"
              bg="white"
              color="prachatham.700"
              px={8}
              py={6}
              fontSize="lg"
              fontWeight="semibold"
              borderRadius="lg"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              }}
              transition="all 0.2s"
            >
              เรียนรู้เพิ่มเติม
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Featured News Section */}
      <Box bg="white" py={{ base: 12, md: 16 }}>
        <Container maxW="7xl">
          <VStack spacing={4} textAlign="center" mb={12}>
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              color="prachatham.700"
            >
              ข่าวเด่นประจำสัปดาห์
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.600"
              maxW="lg"
            >
              ติดตามข่าวสารและเรื่องราวล่าสุดจากชุมชนทั่วประเทศ
            </Text>
          </VStack>

          {featuredPosts && featuredPosts.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mb={12}>
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </SimpleGrid>
          ) : (
            <Box textAlign="center" py={8}>
              <Text color="gray.500">ไม่พบข่าวเด่นในขณะนี้</Text>
            </Box>
          )}

          <Flex justify="center">
            <Button
              as={Link}
              href="/posts"
              variant="outline"
              colorScheme="prachatham"
              size="lg"
              px={8}
              borderWidth="2px"
              _hover={{
                bg: "prachatham.600",
                color: "white",
              }}
            >
              ดูข่าวทั้งหมด
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* Mission Section */}
      <Box bg="green.50" py={{ base: 12, md: 16 }}>
        <Container maxW="6xl">
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, lg: 12 }}
            alignItems="center"
          >
            <VStack align="start" spacing={6}>
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                color="prachatham.700"
              >
                ภารกิจของเรา
              </Heading>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.700"
                lineHeight="1.7"
              >
                เราเชื่อว่าการเปลี่ยนแปลงที่ยั่งยืนเกิดขึ้นได้เมื่อชุมชนมีเสียง
                มีพื้นที่ในการเล่าเรื่องราวของตัวเอง
                และมีเครื่องมือในการสื่อสารกับสังคมที่กว้างขึ้น
              </Text>
              <Button
                as={Link}
                href="/about"
                colorScheme="prachatham"
                size="lg"
                px={8}
                _hover={{
                  bg: "prachatham.700",
                }}
              >
                เรียนรู้เพิ่มเติม
              </Button>
            </VStack>

            <Box borderRadius="lg" overflow="hidden">
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
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Latest Projects Section */}
      <Box bg="white" py={{ base: 12, md: 16 }}>
        <Container maxW="7xl">
          <VStack spacing={4} textAlign="center" mb={12}>
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              color="prachatham.700"
            >
              โครงการล่าสุด
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.600"
              maxW="lg"
            >
              ดูโครงการและกิจกรรมล่าสุดที่เราได้ดำเนินการอยู่
            </Text>
          </VStack>

          {latestProjects && latestProjects.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mb={12}>
              {latestProjects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </SimpleGrid>
          ) : (
            <Box textAlign="center" py={8}>
              <Text color="gray.500">ไม่พบโครงการในขณะนี้</Text>
            </Box>
          )}

          <Flex justify="center">
            <Button
              as={Link}
              href="/causes"
              variant="outline"
              colorScheme="prachatham"
              size="lg"
              px={8}
              borderWidth="2px"
              _hover={{
                bg: "prachatham.600",
                color: "white",
              }}
            >
              ดูโครงการทั้งหมด
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Box bg="prachatham.700" py={{ base: 12, md: 16 }} color="white">
        <Container maxW="6xl">
          <VStack spacing={4} textAlign="center" mb={12}>
            <Heading as="h2" fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}>
              ผลงานของเรา
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="whiteAlpha.900"
              maxW="lg"
            >
              ตัวเลขที่สะท้อนถึงผลกระทบเชิงบวกที่เราสร้างให้กับชุมชน
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
            {stats.map((stat) => (
              <Stat key={stat.label} textAlign="center">
                <StatNumber
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  fontWeight="bold"
                >
                  {stat.value}
                </StatNumber>
                <StatLabel
                  fontSize={{ base: "sm", md: "md", lg: "lg" }}
                  color="whiteAlpha.900"
                  mt={2}
                >
                  {stat.label}
                </StatLabel>
              </Stat>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box bg="gray.50" py={{ base: 12, md: 16 }}>
        <Container maxW="4xl" textAlign="center">
          <VStack spacing={6}>
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              color="prachatham.700"
            >
              ร่วมเป็นส่วนหนึ่งกับเรา
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.600"
              maxW="lg"
            >
              หากคุณมีเรื่องราวที่ต้องการเล่า หรือต้องการสนับสนุนงานของเรา
              เรายินดีต้อนรับทุกคน
            </Text>
            <HStack spacing={4} flexWrap="wrap" justify="center">
              <Button
                as={Link}
                href="/contact"
                colorScheme="prachatham"
                size="lg"
                px={8}
                _hover={{
                  bg: "prachatham.700",
                }}
              >
                ติดต่อเรา
              </Button>
              <Button
                as={Link}
                href="/donate"
                variant="outline"
                colorScheme="prachatham"
                size="lg"
                px={8}
                borderWidth="2px"
                _hover={{
                  bg: "prachatham.600",
                  color: "white",
                }}
              >
                สนับสนุนเรา
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}
