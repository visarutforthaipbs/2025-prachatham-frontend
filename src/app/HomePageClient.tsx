"use client";

import Image from "next/image";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import ProjectCard from "@/components/ProjectCard";
import type { WordPressPost, WordPressProject } from "@/lib/wordpress";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

interface HomePageClientProps {
  featuredPosts: WordPressPost[];
  latestProjects: WordPressProject[];
}

export default function HomePageClient({
  featuredPosts,
  latestProjects,
}: HomePageClientProps) {
  return (
    <Box>
      {/* Hero Section */}
      <Flex
        minH="100vh"
        bgImage="url('/images/hero-1-page-1.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        align="center"
        justify="center"
        position="relative"
        color="white"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          backgroundColor="rgba(5, 150, 105, 0.75)"
          zIndex={1}
        />
        <Container maxW="container.xl" position="relative" zIndex={2}>
          <VStack spacing={6} textAlign="center" maxW="3xl" mx="auto">
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="bold"
              lineHeight="1.2"
              textShadow="2px 2px 4px rgba(0,0,0,0.3)"
            >
              เราสนับสนุนการเปลี่ยนแปลงผ่านสื่อชุมชน
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              lineHeight="1.6"
              maxW="2xl"
              mx="auto"
              textShadow="1px 1px 2px rgba(0,0,0,0.3)"
            >
              มูลนิธิประชาธรรม เป็นองค์กรที่มุ่งหวังสร้างการเปลี่ยนแปลงเชิงบวก
              ผ่านการเสริมสร้างพลังของชุมชนในการสื่อสารและเล่าเรื่องราวของตัวเอง
            </Text>
            <Button
              as={Link}
              href="/about"
              size="lg"
              colorScheme="white"
              variant="solid"
              bg="white"
              color="green.700"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              เรียนรู้เพิ่มเติม
            </Button>
          </VStack>
        </Container>
      </Flex>

      {/* Featured News Section */}
      <Box bg="white" py={{ base: 16, md: 20 }}>
        <Container maxW="container.xl">
          <VStack spacing={4} textAlign="center" mb={12}>
            <Heading as="h2" size="xl" color="green.700">
              ข่าวเด่นประจำสัปดาห์
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="md" mx="auto">
              ติดตามข่าวสารและเรื่องราวล่าสุดจากชุมชนทั่วประเทศ
            </Text>
          </VStack>

          {featuredPosts && featuredPosts.length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={8}
              mb={12}
            >
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </SimpleGrid>
          ) : (
            <Text textAlign="center" color="gray.500" py={8}>
              ไม่พบข่าวเด่นในขณะนี้
            </Text>
          )}

          <Flex justify="center">
            <Button
              as={Link}
              href="/posts"
              size="lg"
              variant="outline"
              colorScheme="green"
            >
              ดูข่าวทั้งหมด
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* Mission Section */}
      <Box bg="green.50" py={{ base: 16, md: 20 }}>
        <Container maxW="container.lg">
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap={12}
            alignItems="center"
          >
            <VStack align="start" spacing={6}>
              <Heading as="h2" size="xl" color="green.700">
                ภารกิจของเรา
              </Heading>
              <Text fontSize="lg" color="gray.700" lineHeight="1.7">
                เราเชื่อว่าการเปลี่ยนแปลงที่ยั่งยืนเกิดขึ้นได้เมื่อชุมชนมีเสียง
                มีพื้นที่ในการเล่าเรื่องราวของตัวเอง
                และมีเครื่องมือในการสื่อสารกับสังคมที่กว้างขึ้น
              </Text>
              <Button
                as={Link}
                href="/about"
                size="lg"
                colorScheme="green"
                variant="solid"
              >
                เรียนรู้เพิ่มเติม
              </Button>
            </VStack>
            <Box borderRadius="md" overflow="hidden" boxShadow="lg">
              <Image
                src="/images/about-1.jpg"
                alt="ภารกิจของมูลนิธิประชาธรรม"
                width={600}
                height={400}
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Latest Projects Section */}
      <Box bg="white" py={{ base: 16, md: 20 }}>
        <Container maxW="container.xl">
          <VStack spacing={4} textAlign="center" mb={12}>
            <Heading as="h2" size="xl" color="green.700">
              โครงการล่าสุด
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="md" mx="auto">
              ดูโครงการและกิจกรรมล่าสุดที่เราได้ดำเนินการอยู่
            </Text>
          </VStack>

          {latestProjects && latestProjects.length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={8}
              mb={12}
            >
              {latestProjects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </SimpleGrid>
          ) : (
            <Text textAlign="center" color="gray.500" py={8}>
              ไม่พบโครงการในขณะนี้
            </Text>
          )}

          <Flex justify="center">
            <Button
              as={Link}
              href="/causes"
              size="lg"
              variant="outline"
              colorScheme="green"
            >
              ดูโครงการทั้งหมด
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Box bg="green.700" color="white" py={{ base: 16, md: 20 }}>
        <Container maxW="container.lg">
          <VStack spacing={4} textAlign="center" mb={12}>
            <Heading as="h2" size="xl">
              ผลงานของเรา
            </Heading>
            <Text fontSize="lg" color="green.100" maxW="md" mx="auto">
              ตัวเลขที่สะท้อนถึงผลกระทบเชิงบวกที่เราสร้างให้กับชุมชน
            </Text>
          </VStack>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
            {[
              { label: "โครงการที่ดำเนินการ", value: "30+" },
              { label: "ชุมชนที่ร่วมงาน", value: "20+" },
              { label: "บทความที่เผยแพร่", value: "300+" },
              { label: "ปีที่ดำเนินงาน", value: "15+" },
            ].map((stat) => (
              <VStack key={stat.label}>
                <Heading size="2xl">{stat.value}</Heading>
                <Text fontSize="lg" color="green.100">
                  {stat.label}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box bg="gray.50" py={{ base: 16, md: 20 }}>
        <Container maxW="3xl" textAlign="center">
          <VStack spacing={6}>
            <Heading as="h2" size="xl" color="green.700">
              ร่วมเป็นส่วนหนึ่งกับเรา
            </Heading>
            <Text fontSize="lg" color="gray.600">
              หากคุณมีเรื่องราวที่ต้องการเล่า หรือต้องการสนับสนุนงานของเรา
              เรายินดีต้อนรับทุกคน
            </Text>
            <HStack spacing={4} justify="center">
              <Button as={Link} href="/contact" size="lg" colorScheme="green">
                ติดต่อเรา
              </Button>
              <Button
                as={Link}
                href="/donate"
                size="lg"
                variant="outline"
                colorScheme="green"
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
