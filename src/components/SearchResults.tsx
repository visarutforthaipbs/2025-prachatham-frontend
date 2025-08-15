"use client";

import { VStack, Text, SimpleGrid, Box, Button } from "@chakra-ui/react";
import { WordPressPost } from "@/lib/wordpress";
import PostCard from "./PostCard";
import LoadingSkeleton from "./LoadingSkeleton";

interface SearchResultsProps {
  posts: WordPressPost[];
  loading: boolean;
  error: string | null;
  query: string;
  totalPages: number;
  currentPage: number;
  onLoadMore: () => void;
}

export default function SearchResults({
  posts,
  loading,
  error,
  query,
  totalPages,
  currentPage,
  onLoadMore,
}: SearchResultsProps) {
  if (error) {
    return (
      <Box
        bg="red.50"
        borderColor="red.200"
        borderWidth="1px"
        borderRadius="md"
        p={4}
        color="red.800"
      >
        เกิดข้อผิดพลาด: {error}
      </Box>
    );
  }

  if (!loading && posts.length === 0 && query) {
    return (
      <Box
        bg="blue.50"
        borderColor="blue.200"
        borderWidth="1px"
        borderRadius="md"
        p={4}
        color="blue.800"
      >
        ไม่พบผลการค้นหาสำหรับ &ldquo;{query}&rdquo;
      </Box>
    );
  }

  return (
    <VStack align="stretch" gap={6}>
      {/* Results header */}
      {query && posts.length > 0 && (
        <Box>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700">
            ผลการค้นหาสำหรับ &ldquo;{query}&rdquo; ({posts.length} รายการ)
          </Text>
        </Box>
      )}

      {/* Results grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {loading && <LoadingSkeleton count={6} />}
      </SimpleGrid>

      {/* Load more button */}
      {!loading && currentPage < totalPages && (
        <Box textAlign="center">
          <Button
            onClick={onLoadMore}
            colorScheme="green"
            size="md"
            variant="outline"
            _hover={{
              bg: "prachatham.50",
            }}
          >
            โหลดเพิ่มเติม
          </Button>
        </Box>
      )}
    </VStack>
  );
}
