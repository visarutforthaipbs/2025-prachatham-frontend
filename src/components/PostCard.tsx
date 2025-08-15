"use client";

import {
  Box,
  Heading,
  Text,
  Badge,
  Flex,
  Link as ChakraLink,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import NextImage from "next/image";
import { WordPressPost, formatThaiDate, getExcerpt } from "@/lib/wordpress";

interface PostCardProps {
  post: WordPressPost;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const categories = (post._embedded?.["wp:term"]?.[0] || []) as Category[];

  return (
    <Box
      maxW="sm"
      overflow="hidden"
      borderRadius="lg"
      boxShadow="sm"
      bg="white"
      _hover={{
        boxShadow: "md",
        transform: "translateY(-2px)",
        transition: "all 0.2s ease-in-out",
      }}
      h="full"
      display="flex"
      flexDirection="column"
    >
      {/* Featured Image */}
      {featuredImage && (
        <Box position="relative" height="200px" overflow="hidden">
          <NextImage
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || post.title.rendered}
            fill
            style={{
              objectFit: "cover",
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Box>
      )}

      <Box flex={1} display="flex" flexDirection="column" p={6}>
        {/* Categories */}
        {categories.length > 0 && (
          <HStack mb={2} flexWrap="wrap" gap={1}>
            {categories.slice(0, 2).map((category) => (
              <ChakraLink
                key={category.id}
                as={Link}
                href={`/category/${category.slug}`}
                _hover={{ textDecoration: "none" }}
              >
                <Badge
                  colorScheme="green"
                  variant="subtle"
                  fontSize="xs"
                  borderRadius="full"
                  px={2}
                  py={1}
                  _hover={{
                    bg: "prachatham.200",
                    transform: "scale(1.05)",
                  }}
                  transition="all 0.2s"
                >
                  {category.name}
                </Badge>
              </ChakraLink>
            ))}
          </HStack>
        )}

        {/* Title */}
        <ChakraLink
          as={Link}
          href={`/posts/${post.slug}`}
          _hover={{ textDecoration: "none" }}
          flex={1}
        >
          <Heading
            size="md"
            lineHeight="short"
            color="gray.800"
            _hover={{ color: "prachatham.600" }}
            transition="color 0.2s"
            mb={3}
            css={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.title.rendered}
          </Heading>
        </ChakraLink>

        {/* Excerpt */}
        <Text
          color="gray.600"
          fontSize="sm"
          lineHeight="base"
          mb={4}
          flex={1}
          css={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {getExcerpt(post.excerpt.rendered, 120)}
        </Text>

        {/* Date */}
        <Flex justify="space-between" align="center" mt="auto">
          <Text fontSize="xs" color="gray.500">
            {formatThaiDate(post.date)}
          </Text>
          <ChakraLink
            as={Link}
            href={`/posts/${post.slug}`}
            color="prachatham.600"
            fontSize="sm"
            fontWeight="medium"
            _hover={{
              color: "prachatham.700",
              textDecoration: "underline",
            }}
          >
            อ่านต่อ
          </ChakraLink>
        </Flex>
      </Box>
    </Box>
  );
}
