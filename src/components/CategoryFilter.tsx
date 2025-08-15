"use client";

import { Box, HStack, Link as ChakraLink, Text } from "@chakra-ui/react";
import Link from "next/link";
import { WordPressCategory } from "@/lib/wordpress";

interface CategoryFilterProps {
  categories: WordPressCategory[];
  activeCategory?: string;
}

export default function CategoryFilter({
  categories,
  activeCategory,
}: CategoryFilterProps) {
  const allCategoriesActive = !activeCategory;

  return (
    <Box mb={8}>
      <Text fontSize="lg" fontWeight="semibold" mb={4} color="gray.700">
        หมวดหมู่
      </Text>
      <HStack flexWrap="wrap" gap={2}>
        {/* All Categories Button */}
        <ChakraLink as={Link} href="/posts" _hover={{ textDecoration: "none" }}>
          <Box
            fontSize="sm"
            fontWeight="medium"
            bg={allCategoriesActive ? "prachatham.500" : "gray.100"}
            color={allCategoriesActive ? "white" : "gray.700"}
            borderRadius="full"
            px={4}
            py={2}
            cursor="pointer"
            border="1px solid"
            borderColor={allCategoriesActive ? "prachatham.500" : "gray.200"}
            _hover={{
              transform: "scale(1.05)",
              bg: allCategoriesActive ? "prachatham.600" : "prachatham.50",
              borderColor: "prachatham.500",
            }}
            transition="all 0.2s"
          >
            ทั้งหมด
          </Box>
        </ChakraLink>

        {/* Category Tags */}
        {categories.map((category) => {
          const isActive = activeCategory === category.slug;
          return (
            <ChakraLink
              key={category.id}
              as={Link}
              href={`/category/${category.slug}`}
              _hover={{ textDecoration: "none" }}
            >
              <Box
                fontSize="sm"
                fontWeight="medium"
                bg={isActive ? "prachatham.500" : "gray.100"}
                color={isActive ? "white" : "gray.700"}
                borderRadius="full"
                px={4}
                py={2}
                cursor="pointer"
                border="1px solid"
                borderColor={isActive ? "prachatham.500" : "gray.200"}
                _hover={{
                  transform: "scale(1.05)",
                  bg: isActive ? "prachatham.600" : "prachatham.50",
                  borderColor: "prachatham.500",
                }}
                transition="all 0.2s"
              >
                {category.name} ({category.count})
              </Box>
            </ChakraLink>
          );
        })}
      </HStack>
    </Box>
  );
}
