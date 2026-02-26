"use client";

import {
  Box,
  Heading,
  Text,
  Badge,
  Flex,
  Link as ChakraLink,
  HStack,
  Icon,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { FaUser, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import NextImage from "next/image";
import { WordPressPost, formatThaiDate, getExcerpt } from "@/lib/wordpress";
import { PostViewCount } from "@/components/PostViewCount";

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
    <Card h="full" display="flex" flexDirection="column">
      {/* Featured Image */}
      {featuredImage && (
        <ChakraLink
          as={Link}
          href={`/posts/${post.slug}`}
          _hover={{ textDecoration: "none" }}
        >
          <Box position="relative" height="220px" overflow="hidden">
            <NextImage
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || post.title.rendered}
              fill
              style={{
                objectFit: "cover",
                transition: "transform 0.4s ease",
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Subtle gradient for readability */}
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              h="60px"
              bgGradient="linear(to-t, blackAlpha.200, transparent)"
            />
          </Box>
        </ChakraLink>
      )}

      <CardBody flex={1} display="flex" flexDirection="column" p={5}>
        {/* Categories */}
        {categories.length > 0 && (
          <HStack mb={3} flexWrap="wrap" gap={1.5}>
            {categories.slice(0, 2).map((category) => (
              <ChakraLink
                key={category.id}
                as={Link}
                href={`/category/${category.slug}`}
                _hover={{ textDecoration: "none" }}
              >
                <Badge
                  variant="brand"
                  _hover={{
                    bg: "prachatham.100",
                  }}
                  transition="all 0.15s ease"
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
            variant="card"
            _hover={{ color: "prachatham.600" }}
            transition="color 0.2s ease"
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
          variant="caption"
          color="gray.600"
          fontSize="sm"
          mb={4}
          flex={1}
          css={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {getExcerpt(post.excerpt.rendered, 120)}
        </Text>

        {/* Date, Author & Read More */}
        <Flex
          justify="space-between"
          align="center"
          mt="auto"
          pt={4}
          borderTop="1px solid"
          borderColor="gray.100"
        >
          <Flex direction="column" fontSize="xs" color="gray.400" gap={1}>
            <Text>{formatThaiDate(post.date)}</Text>
            <HStack spacing={3}>
              {post.acf?.authornamepost && (
                <HStack spacing={1}>
                  <FaUser size={9} />
                  <Text>{post.acf.authornamepost}</Text>
                </HStack>
              )}
              <PostViewCount postId={post.id} />
            </HStack>
          </Flex>
          <ChakraLink
            as={Link}
            href={`/posts/${post.slug}`}
            variant="link"
            display="flex"
            alignItems="center"
            gap={1}
            _hover={{
              gap: 2,
            }}
          >
            อ่านต่อ
            <Icon as={FaArrowRight} boxSize={2.5} />
          </ChakraLink>
        </Flex>
      </CardBody>
    </Card>
  );
}
