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
import {
  wordpressApi,
  WordPressPost,
  WordPressCategory,
} from "@/lib/wordpress";
import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function PostsPage() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [categories, setCategories] = useState<WordPressCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPosts = useCallback(async (page: number = 1) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const [postsData, categoriesData] = await Promise.all([
        wordpressApi.getPostsExcludingCategories(["publication"], {
          page,
          per_page: 12,
        }),
        page === 1 ? wordpressApi.getCategories() : Promise.resolve([]),
      ]);

      if (page === 1) {
        setPosts(postsData.posts);
        if (categoriesData.length > 0) {
          setCategories(categoriesData);
        }
      } else {
        setPosts((prev) => [...prev, ...postsData.posts]);
      }

      setCurrentPage(page);
      setTotalPages(postsData.totalPages);
      setError(null);
    } catch (err) {
      setError("ไม่สามารถโหลดบทความได้");
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

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
          <Text color="gray.700" fontWeight="medium">
            บทความ
          </Text>
        </HStack>

        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="xl" color="prachatham.700" mb={4}>
            บทความทั้งหมด
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
            ข่าวสารและบทความด้านสิ่งแวดล้อมและการอนุรักษ์ธรรมชาติ
          </Text>
        </Box>

        {/* Category Filter */}
        {categories.length > 0 && <CategoryFilter categories={categories} />}

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
              ยังไม่มีบทความ
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            <LoadingSkeleton count={12} />
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
}
