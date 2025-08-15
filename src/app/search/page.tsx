"use client";

import {
  Container,
  Heading,
  Text,
  Box,
  VStack,
  Link as ChakraLink,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { wordpressApi, WordPressPost } from "@/lib/wordpress";
import SearchResults from "@/components/SearchResults";
import LoadingSkeleton from "@/components/LoadingSkeleton";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchPosts = useCallback(
    async (searchQuery: string, page: number = 1) => {
      if (!searchQuery.trim()) {
        setPosts([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await wordpressApi.searchPosts(searchQuery, page);

        if (page === 1) {
          setPosts(data.posts);
        } else {
          setPosts((prev) => [...prev, ...data.posts]);
        }

        setCurrentPage(page);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError("เกิดข้อผิดพลาดในการค้นหา");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (query) {
      setCurrentPage(1);
      searchPosts(query, 1);
    } else {
      setPosts([]);
    }
  }, [query, searchPosts]);

  const handleLoadMore = () => {
    if (currentPage < totalPages && query) {
      searchPosts(query, currentPage + 1);
    }
  };

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
            ผลการค้นหา
          </Text>
        </HStack>

        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="xl" color="prachatham.700" mb={4}>
            ผลการค้นหา
          </Heading>
          {query && (
            <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
              ค้นหาด้วยคำว่า &ldquo;{query}&rdquo;
            </Text>
          )}
        </Box>

        {/* Search Results */}
        {query ? (
          <SearchResults
            posts={posts}
            loading={loading}
            error={error}
            query={query}
            totalPages={totalPages}
            currentPage={currentPage}
            onLoadMore={handleLoadMore}
          />
        ) : (
          <Box textAlign="center" py={12} bg="gray.50" borderRadius="md">
            <Text color="gray.500" fontSize="lg">
              กรุณาพิมพ์คำที่ต้องการค้นหา
            </Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SearchContent />
    </Suspense>
  );
}
