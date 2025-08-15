"use client";

import { Box, Skeleton, SkeletonText, VStack, HStack } from "@chakra-ui/react";

interface LoadingSkeletonProps {
  count?: number;
}

export default function LoadingSkeleton({ count = 6 }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
    </>
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
