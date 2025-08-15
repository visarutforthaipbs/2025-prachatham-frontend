import {
  Container,
  Heading,
  Text,
  SimpleGrid,
  Box,
  VStack,
} from "@chakra-ui/react";
import { wordpressApi, WordPressPost } from "@/lib/wordpress";
import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ประชาธรรม | สื่อสิ่งแวดล้อมไทย - หน้าแรก",
  description:
    "ศูนย์กลางข่าวสารและบทความด้านสิ่งแวดล้อม การอนุรักษ์ธรรมชาติ และการพัฒนาที่ยั่งยืนในประเทศไทย",
  openGraph: {
    title: "ประชาธรรม | สื่อสิ่งแวดล้อมไทย",
    description:
      "ศูนย์กลางข่าวสารและบทความด้านสิ่งแวดล้อม การอนุรักษ์ธรรมชาติ และการพัฒนาที่ยั่งยืนในประเทศไทย",
  },
};

// Revalidate every 60 seconds
export const revalidate = 60;

async function getHomePageData() {
  try {
    const [postsData, categories] = await Promise.all([
      wordpressApi.getPosts({ per_page: 12 }),
      wordpressApi.getCategories(),
    ]);

    return {
      posts: postsData.posts,
      categories,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return {
      posts: [],
      categories: [],
      error: "ไม่สามารถโหลดข้อมูลได้",
    };
  }
}

export default async function HomePage() {
  const { posts, categories, error } = await getHomePageData();

  if (error) {
    return (
      <Container maxW="7xl" py={8}>
        <Box
          bg="red.50"
          borderColor="red.200"
          borderWidth="1px"
          borderRadius="md"
          p={6}
          color="red.800"
          textAlign="center"
        >
          <Text fontSize="lg">{error}</Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack align="stretch" gap={8}>
        {/* Hero Section */}
        <Box textAlign="center" py={8}>
          <Heading
            as="h1"
            size="2xl"
            color="prachatham.700"
            mb={4}
            fontWeight="bold"
          >
            ยินดีต้อนรับสู่ประชาธรรม
          </Heading>
          <Text
            fontSize="xl"
            color="gray.600"
            maxW="2xl"
            mx="auto"
            lineHeight="tall"
          >
            ศูนย์กลางข่าวสารและบทความด้านสิ่งแวดล้อม การอนุรักษ์ธรรมชาติ
            และการพัฒนาที่ยั่งยืนในประเทศไทย
          </Text>
        </Box>

        {/* Category Filter */}
        {categories.length > 0 && <CategoryFilter categories={categories} />}

        {/* Featured Posts Section */}
        <Box>
          <Heading as="h2" size="lg" mb={6} color="gray.700">
            บทความล่าสุด
          </Heading>

          {posts.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {posts.map((post: WordPressPost) => (
                <PostCard key={post.id} post={post} />
              ))}
            </SimpleGrid>
          ) : (
            <Box textAlign="center" py={8} bg="gray.50" borderRadius="md">
              <Text color="gray.500" fontSize="lg">
                ยังไม่มีบทความ
              </Text>
            </Box>
          )}
        </Box>

        {/* Call to Action */}
        <Box
          bg="prachatham.50"
          borderRadius="lg"
          p={8}
          textAlign="center"
          border="1px solid"
          borderColor="prachatham.200"
        >
          <Heading as="h3" size="lg" mb={4} color="prachatham.700">
            ร่วมเป็นส่วนหนึ่งในการอนุรักษ์สิ่งแวดล้อม
          </Heading>
          <Text color="gray.600" fontSize="md" maxW="xl" mx="auto">
            ติดตามข่าวสารและความรู้ด้านสิ่งแวดล้อมเพื่อสร้างสรรค์อนาคตที่ยั่งยืน
            สำหรับคนรุ่นต่อไป
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}
