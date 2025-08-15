"use client";

import {
  Container,
  Heading,
  Text,
  SimpleGrid,
  Box,
  VStack,
  Button,
  Link as ChakraLink,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { wordpressApi, WordPressPost } from "@/lib/wordpress";
import PostCard from "@/components/PostCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryName, setCategoryName] = useState("");

  const loadPosts = useCallback(
    async (page: number) => {
      try {
        if (page === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const data = await wordpressApi.getPostsByCategory(slug, page);

        if (page === 1) {
          setPosts(data.posts);
          // Get category name from first post if available
          if (data.posts.length > 0) {
            const categories = data.posts[0]._embedded?.["wp:term"]?.[0] || [];
            const category = categories.find(
              (cat: Category) => cat.slug === slug
            );
            if (category) {
              setCategoryName(category.name);
            }
          }
        } else {
          setPosts((prev) => [...prev, ...data.posts]);
        }

        setCurrentPage(page);
        setTotalPages(data.totalPages);
        setError(null);
      } catch (err) {
        setError("ไม่สามารถโหลดบทความได้");
        console.error("Error loading posts:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [slug]
  );

  useEffect(() => {
    loadPosts(1);
  }, [loadPosts]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      loadPosts(currentPage + 1);
    }
  };

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
        {/* Breadcrumb */}
        <HStack fontSize="sm" color="gray.500">
          <ChakraLink as={Link} href="/" _hover={{ color: "prachatham.600" }}>
            หน้าแรก
          </ChakraLink>
          <Text>/</Text>
          <ChakraLink
            as={Link}
            href="/posts"
            _hover={{ color: "prachatham.600" }}
          >
            บทความ
          </ChakraLink>
          <Text>/</Text>
          <Text color="gray.700" fontWeight="medium">
            {categoryName || slug}
          </Text>
        </HStack>

        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="xl" color="prachatham.700" mb={4}>
            หมวดหมู่: {categoryName || slug}
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
            บทความทั้งหมดในหมวดหมู่นี้
          </Text>
        </Box>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <VStack align="stretch" gap={6}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </SimpleGrid>

            {/* Load More Button */}
            {currentPage < totalPages && (
              <Box textAlign="center">
                <Button
                  onClick={handleLoadMore}
                  isLoading={loadingMore}
                  colorScheme="green"
                  size="md"
                  variant="outline"
                  _hover={{
                    bg: "prachatham.50",
                  }}
                  disabled={loadingMore}
                >
                  {loadingMore ? "กำลังโหลด..." : "โหลดเพิ่มเติม"}
                </Button>
              </Box>
            )}
          </VStack>
        ) : !loading ? (
          <Box textAlign="center" py={12} bg="gray.50" borderRadius="md">
            <Text color="gray.500" fontSize="lg">
              ไม่มีบทความในหมวดหมู่นี้
            </Text>
            <ChakraLink as={Link} href="/posts">
              <Button mt={4} colorScheme="green" variant="outline">
                ดูบทความทั้งหมด
              </Button>
            </ChakraLink>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            <LoadingSkeleton count={6} />
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
}
