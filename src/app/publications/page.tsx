"use client";

import {
  Container,
  Heading,
  Text,
  Box,
  VStack,
  HStack,
  Link as ChakraLink,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { wordpressApi, WordPressPost } from "@/lib/wordpress";
import PostCard from "@/components/PostCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function PublicationsPage() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPosts = useCallback(async (page: number) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const data = await wordpressApi.getPostsByCategory("publication", page);

      if (page === 1) {
        setPosts(data.posts);
      } else {
        setPosts((prev) => [...prev, ...data.posts]);
      }

      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (err) {
      setError("ไม่สามารถโหลดข้อมูลสิ่งพิมพ์ได้");
      console.error("Error loading publications:", err);
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
      <Container maxW="6xl" py={8}>
        <VStack align="stretch" gap={8}>
          <Box textAlign="center">
            <Text color="red.500" fontSize="lg">
              {error}
            </Text>
            <Button mt={4} onClick={() => loadPosts(1)}>
              ลองใหม่อีกครั้ง
            </Button>
          </Box>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="6xl" py={8}>
      <VStack align="stretch" gap={8}>
        {/* Breadcrumb */}
        <HStack fontSize="sm" color="gray.500">
          <ChakraLink as={Link} href="/" _hover={{ color: "prachatham.600" }}>
            หน้าแรก
          </ChakraLink>
          <Text>/</Text>
          <Text color="gray.700" fontWeight="medium">
            สิ่งพิมพ์
          </Text>
        </HStack>

        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="xl" color="prachatham.700" mb={4}>
            สิ่งพิมพ์
          </Heading>
          <Text
            fontSize="xl"
            color="gray.600"
            maxW="3xl"
            mx="auto"
            lineHeight="tall"
          >
            รวบรวมสิ่งพิมพ์ คู่มือ และเอกสารต่างๆ ของประชาธรรม
          </Text>
        </Box>

        {/* Loading State */}
        {loading ? (
          <LoadingSkeleton />
        ) : posts.length === 0 ? (
          <Box textAlign="center" py={12}>
            <Heading as="h3" size="md" color="gray.500" mb={4}>
              ไม่พบสิ่งพิมพ์
            </Heading>
            <Text color="gray.500">ขณะนี้ยังไม่มีสิ่งพิมพ์ในหมวดหมู่นี้</Text>
          </Box>
        ) : (
          <>
            {/* Publications Grid */}
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
                  loadingText="กำลังโหลด..."
                  colorScheme="green"
                  variant="outline"
                  size="lg"
                >
                  โหลดเพิ่มเติม
                </Button>
              </Box>
            )}
          </>
        )}

        {/* Notice */}
        <Box
          bg="gray.50"
          borderRadius="lg"
          p={6}
          textAlign="center"
          border="1px solid"
          borderColor="gray.200"
        >
          <Heading as="h3" size="md" mb={3} color="gray.700">
            ต้องการสิ่งพิมพ์เพิ่มเติม?
          </Heading>
          <Text color="gray.600" mb={4}>
            หากคุณต้องการสิ่งพิมพ์หรือเอกสารเพิ่มเติม
            กรุณาติดต่อเราผ่านช่องทางต่างๆ
          </Text>
          <HStack justify="center" gap={4}>
            <Button as={Link} href="/contact" colorScheme="green">
              ติดต่อเรา
            </Button>
            <Button
              as={Link}
              href="/posts"
              variant="outline"
              colorScheme="green"
            >
              ดูข่าวสารทั้งหมด
            </Button>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
}
