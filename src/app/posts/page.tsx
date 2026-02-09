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
    <Container maxW="7xl" py={{ base: 8, md: 12 }}>
      <VStack align="stretch" gap={8}>
        {/* Breadcrumb */}
        <HStack fontSize="sm" color="gray.400">
          <ChakraLink as={Link} href="/" _hover={{ color: "prachatham.600" }} transition="color 0.15s ease">
            หน้าแรก
          </ChakraLink>
          <Text color="gray.300">/</Text>
          <Text color="gray.700" fontWeight="medium">
            บทความ
          </Text>
        </HStack>

        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Heading as="h1" fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} color="prachatham.700" mb={3} letterSpacing="-0.02em">
            บทความทั้งหมด
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color="gray.500" maxW="2xl" mx="auto">
            ข่าวสารและบทความด้านสิ่งแวดล้อมและการอนุรักษ์ธรรมชาติ
          </Text>
          <Box w="60px" h="3px" bg="prachatham.500" borderRadius="full" mx="auto" mt={4} />
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
                  colorScheme="prachatham"
                  size="md"
                  variant="outline"
                  borderRadius="full"
                  px={8}
                  border="2px solid"
                  _hover={{
                    bg: "prachatham.50",
                    transform: "translateY(-1px)",
                  }}
                  transition="all 0.2s ease"
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
