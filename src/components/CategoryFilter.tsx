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
      <Text fontSize="sm" fontWeight="600" mb={3} color="gray.500" letterSpacing="0.02em" textTransform="uppercase">
        หมวดหมู่
      </Text>
      <HStack flexWrap="wrap" gap={2}>
        {/* All Categories Button */}
        <ChakraLink as={Link} href="/posts" _hover={{ textDecoration: "none" }}>
          <Box
            fontSize="sm"
            fontWeight="medium"
            bg={allCategoriesActive ? "prachatham.600" : "white"}
            color={allCategoriesActive ? "white" : "gray.600"}
            borderRadius="full"
            px={4}
            py={2}
            cursor="pointer"
            border="1px solid"
            borderColor={allCategoriesActive ? "prachatham.600" : "gray.200"}
            _hover={{
              transform: "translateY(-1px)",
              bg: allCategoriesActive ? "prachatham.700" : "prachatham.50",
              borderColor: "prachatham.300",
              boxShadow: "sm",
            }}
            transition="all 0.2s ease"
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
                bg={isActive ? "prachatham.600" : "white"}
                color={isActive ? "white" : "gray.600"}
                borderRadius="full"
                px={4}
                py={2}
                cursor="pointer"
                border="1px solid"
                borderColor={isActive ? "prachatham.600" : "gray.200"}
                _hover={{
                  transform: "translateY(-1px)",
                  bg: isActive ? "prachatham.700" : "prachatham.50",
                  borderColor: "prachatham.300",
                  boxShadow: "sm",
                }}
                transition="all 0.2s ease"
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
