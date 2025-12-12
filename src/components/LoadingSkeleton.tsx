"use client";

import {
  Box,
  Skeleton,
  SkeletonText,
  VStack,
  HStack,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";

interface LoadingSkeletonProps {
  count?: number;
  type?: "post" | "project" | "page";
}

export default function LoadingSkeleton({
  count = 6,
  type = "post",
}: LoadingSkeletonProps) {
  if (type === "page") {
    return <PageSkeleton />;
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
      {Array.from({ length: count }).map((_, index) =>
        type === "project" ? (
          <ProjectCardSkeleton key={index} />
        ) : (
          <PostCardSkeleton key={index} />
        )
      )}
    </SimpleGrid>
  );
}

function PostCardSkeleton() {
  return (
    <Box
      maxW="sm"
      overflow="hidden"
      borderRadius="lg"
      boxShadow="sm"
      bg="white"
      h="full"
      display="flex"
      flexDirection="column"
    >
      {/* Image Skeleton */}
      <Skeleton height="200px" />

      <Box flex={1} display="flex" flexDirection="column" p={6}>
        {/* Category Skeleton */}
        <HStack mb={2}>
          <Skeleton height="20px" width="60px" borderRadius="full" />
          <Skeleton height="20px" width="80px" borderRadius="full" />
        </HStack>

        {/* Title Skeleton */}
        <VStack align="start" mb={3} gap={1}>
          <Skeleton height="20px" width="100%" />
          <Skeleton height="20px" width="80%" />
          <Skeleton height="20px" width="60%" />
        </VStack>

        {/* Excerpt Skeleton */}
        <VStack align="start" mb={4} flex={1} gap={1}>
          <SkeletonText noOfLines={3} width="100%" />
        </VStack>

        {/* Date and Link Skeleton */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Skeleton height="16px" width="100px" />
          <Skeleton height="16px" width="60px" />
        </Box>
      </Box>
    </Box>
  );
}

function ProjectCardSkeleton() {
  return (
    <Box
      overflow="hidden"
      borderRadius="lg"
      boxShadow="sm"
      bg="white"
      h="full"
      display="flex"
      flexDirection="column"
    >
      <Skeleton height="200px" />
      <Box p={6}>
        <Skeleton height="24px" width="80%" mb={3} />
        <VStack align="start" gap={2}>
          <HStack w="full">
            <Skeleton height="14px" width="60px" />
            <Skeleton height="14px" width="100px" />
          </HStack>
          <HStack w="full">
            <Skeleton height="14px" width="50px" />
            <Skeleton height="14px" width="120px" />
          </HStack>
        </VStack>
        <Skeleton height="36px" width="100%" mt={4} borderRadius="md" />
      </Box>
    </Box>
  );
}

function PageSkeleton() {
  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Skeleton height="40px" width="60%" />
        <HStack>
          <Skeleton height="16px" width="100px" />
          <Skeleton height="16px" width="80px" />
        </HStack>
        <Skeleton height="400px" borderRadius="lg" />
        <SkeletonText noOfLines={8} spacing={4} />
        <SkeletonText noOfLines={6} spacing={4} />
        <SkeletonText noOfLines={4} spacing={4} />
      </VStack>
    </Container>
  );
}

export { PostCardSkeleton, ProjectCardSkeleton, PageSkeleton };
