"use client";

import { VStack, Text, Box } from "@chakra-ui/react";

interface StatCardProps {
  value: string;
  label: string;
  /** Icon element to display above the value */
  icon?: React.ReactNode;
}

/**
 * Stat display used in statistics / impact sections.
 */
export default function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <VStack
      spacing={2}
      textAlign="center"
      p={6}
      borderRadius="xl"
      bg="whiteAlpha.100"
      backdropFilter="blur(8px)"
      transition="all 0.3s ease"
      _hover={{
        bg: "whiteAlpha.200",
        transform: "translateY(-2px)",
      }}
    >
      {icon && (
        <Box color="whiteAlpha.800" mb={1}>
          {icon}
        </Box>
      )}
      <Text
        fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
        fontWeight="bold"
        lineHeight={1}
      >
        {value}
      </Text>
      <Text
        fontSize={{ base: "sm", md: "md" }}
        color="whiteAlpha.900"
        fontWeight="medium"
      >
        {label}
      </Text>
    </VStack>
  );
}
