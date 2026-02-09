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
  Icon,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import PostCard from "@/components/PostCard";
import ProjectCard from "@/components/ProjectCard";
import { SectionWrapper, PageHeader, StatCard } from "@/components/ui";
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
      {/* ═══ Hero Section ═══ */}
      <Box
        minH={{ base: "85vh", md: "100vh" }}
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        {/* Background image */}
        <Box position="absolute" inset={0} zIndex={0}>
          <Image
            src="/images/hero-1-page-1.jpg"
            alt="ประชาธรรม — สื่อชุมชน"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </Box>
        {/* Gradient overlay */}
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-b, rgba(4,120,87,0.82), rgba(6,78,59,0.88))"
          zIndex={1}
        />

        <Container maxW="7xl" position="relative" zIndex={2} textAlign="center">
          <VStack maxW="4xl" mx="auto" color="white" spacing={8}>
            {/* Overline */}
            <Text
              fontSize="sm"
              fontWeight="600"
              letterSpacing="0.1em"
              textTransform="uppercase"
              bg="whiteAlpha.200"
              backdropFilter="blur(8px)"
              px={5}
              py={2}
              borderRadius="full"
            >
              มูลนิธิสื่อประชาธรรม
            </Text>

            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
              fontWeight="bold"
              lineHeight={1.1}
              letterSpacing="-0.02em"
            >
              เราสนับสนุนการเปลี่ยนแปลง
              <br />
              ผ่านสื่อชุมชน
            </Heading>

            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              lineHeight="tall"
              maxW="3xl"
              color="whiteAlpha.900"
            >
              มูลนิธิประชาธรรม เป็นองค์กรที่มุ่งหวังสร้างการเปลี่ยนแปลงเชิงบวก
              ผ่านการเสริมสร้างพลังของชุมชนในการสื่อสารและเล่าเรื่องราวของตัวเอง
            </Text>

            <HStack spacing={4} flexWrap="wrap" justify="center" pt={2}>
              <Button
                as={Link}
                href="/about"
                size="lg"
                bg="white"
                color="prachatham.700"
                px={8}
                fontSize="md"
                fontWeight="600"
                borderRadius="full"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
                }}
                transition="all 0.2s"
              >
                เรียนรู้เพิ่มเติม
              </Button>
              <Button
                as={Link}
                href="/causes"
                size="lg"
                variant="outline"
                color="white"
                borderColor="whiteAlpha.500"
                px={8}
                fontSize="md"
                fontWeight="500"
                borderRadius="full"
                _hover={{
                  bg: "whiteAlpha.200",
                  borderColor: "white",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.2s"
              >
                ดูโครงการ
              </Button>
            </HStack>
          </VStack>
        </Container>

        {/* Scroll indicator */}
        <Box
          position="absolute"
          bottom={8}
          left="50%"
          transform="translateX(-50%)"
          zIndex={2}
        >
          <Box
            w="28px"
            h="44px"
            border="2px solid"
            borderColor="whiteAlpha.500"
            borderRadius="full"
            display="flex"
            justifyContent="center"
            pt={2}
          >
            <Box
              w="3px"
              h="10px"
              bg="white"
              borderRadius="full"
              animation="bounce 2s infinite"
            />
          </Box>
        </Box>
      </Box>

      {/* ═══ Featured News ═══ */}
      <SectionWrapper bg="white">
        <PageHeader
          overline="ข่าวสาร"
          title="ข่าวเด่นประจำสัปดาห์"
          subtitle="ติดตามข่าวสารและเรื่องราวล่าสุดจากชุมชนทั่วประเทศ"
        />

        {featuredPosts && featuredPosts.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mb={12}>
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </SimpleGrid>
        ) : (
          <Box textAlign="center" py={8}>
            <Text color="gray.400">ไม่พบข่าวเด่นในขณะนี้</Text>
          </Box>
        )}

        <Flex justify="center">
          <Button
            as={Link}
            href="/posts"
            variant="secondary"
            size="lg"
            borderRadius="full"
            px={8}
            rightIcon={<Icon as={FaArrowRight} boxSize={3} />}
          >
            ดูข่าวทั้งหมด
          </Button>
        </Flex>
      </SectionWrapper>

      {/* ═══ Mission Section ═══ */}
      <SectionWrapper bg="gray.50">
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, lg: 16 }}
          alignItems="center"
        >
          <VStack align="start" spacing={6}>
            <Text variant="overline">ABOUT US</Text>
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              color="prachatham.700"
              letterSpacing="-0.02em"
            >
              ภารกิจของเรา
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.600"
              lineHeight="tall"
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
              borderRadius="full"
              px={8}
              _hover={{
                bg: "prachatham.700",
                transform: "translateY(-1px)",
                boxShadow: "0 8px 25px -4px rgba(5, 150, 105, 0.35)",
              }}
              transition="all 0.2s"
            >
              เรียนรู้เพิ่มเติม
            </Button>
          </VStack>

          <Box borderRadius="2xl" overflow="hidden" boxShadow="xl">
            <Image
              src="/images/about-1.jpg"
              alt="ภารกิจของมูลนิธิประชาธรรม"
              width={600}
              height={400}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Box>
        </SimpleGrid>
      </SectionWrapper>

      {/* ═══ Latest Projects ═══ */}
      <SectionWrapper bg="white">
        <PageHeader
          overline="ผลงาน"
          title="โครงการล่าสุด"
          subtitle="ดูโครงการและกิจกรรมล่าสุดที่เราได้ดำเนินการอยู่"
        />

        {latestProjects && latestProjects.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mb={12}>
            {latestProjects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </SimpleGrid>
        ) : (
          <Box textAlign="center" py={8}>
            <Text color="gray.400">ไม่พบโครงการในขณะนี้</Text>
          </Box>
        )}

        <Flex justify="center">
          <Button
            as={Link}
            href="/causes"
            variant="secondary"
            size="lg"
            borderRadius="full"
            px={8}
            rightIcon={<Icon as={FaArrowRight} boxSize={3} />}
          >
            ดูโครงการทั้งหมด
          </Button>
        </Flex>
      </SectionWrapper>

      {/* ═══ Statistics Section ═══ */}
      <Box
        bgGradient="linear(135deg, prachatham.700, prachatham.800, gray.900)"
        py={{ base: 16, md: 20 }}
        color="white"
        position="relative"
        overflow="hidden"
      >
        {/* Decorative circles */}
        <Box
          position="absolute"
          top="-80px"
          right="-80px"
          w="300px"
          h="300px"
          borderRadius="full"
          bg="whiteAlpha.50"
        />
        <Box
          position="absolute"
          bottom="-60px"
          left="-60px"
          w="200px"
          h="200px"
          borderRadius="full"
          bg="whiteAlpha.50"
        />

        <Container maxW="6xl" position="relative" zIndex={1}>
          <VStack spacing={4} textAlign="center" mb={12}>
            <Heading as="h2" fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}>
              ผลงานของเรา
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="whiteAlpha.800"
              maxW="lg"
            >
              ตัวเลขที่สะท้อนถึงผลกระทบเชิงบวกที่เราสร้างให้กับชุมชน
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
            {stats.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ═══ Call to Action ═══ */}
      <SectionWrapper bg="white" narrow>
        <VStack spacing={8} textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            color="prachatham.700"
            letterSpacing="-0.02em"
          >
            ร่วมเป็นส่วนหนึ่งกับเรา
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.500"
            maxW="lg"
            lineHeight="tall"
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
              borderRadius="full"
              _hover={{
                bg: "prachatham.700",
                transform: "translateY(-1px)",
                boxShadow: "0 8px 25px -4px rgba(5, 150, 105, 0.35)",
              }}
              transition="all 0.2s"
            >
              ติดต่อเรา
            </Button>
            <Button
              as={Link}
              href="/donate"
              variant="secondary"
              size="lg"
              px={8}
              borderRadius="full"
            >
              สนับสนุนเรา
            </Button>
          </HStack>
        </VStack>
      </SectionWrapper>
    </Box>
  );
}
