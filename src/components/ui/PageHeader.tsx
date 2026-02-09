"use client";

import { VStack, Heading, Text, Badge, Box } from "@chakra-ui/react";

interface PageHeaderProps {
  /** Overline / badge text — e.g. "WHO WE ARE" */
  overline?: string;
  title: string;
  subtitle?: string;
  /** Centred by default */
  align?: "center" | "start";
  /** Title colour — defaults to brand */
  titleColor?: string;
}

/**
 * Re-usable page/section header with optional overline badge.
 */
export default function PageHeader({
  overline,
  title,
  subtitle,
  align = "center",
  titleColor = "prachatham.700",
}: PageHeaderProps) {
  return (
    <VStack
      spacing={3}
      textAlign={align}
      align={align}
      mb={{ base: 8, md: 12 }}
    >
      {overline && (
        <Badge
          variant="brand"
          fontSize="sm"
          px={4}
          py={1.5}
          borderRadius="full"
        >
          {overline}
        </Badge>
      )}
      <Heading
        as="h1"
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        fontWeight="bold"
        color={titleColor}
        letterSpacing="-0.02em"
      >
        {title}
      </Heading>
      {subtitle && (
        <Text
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          color="gray.500"
          maxW="3xl"
          lineHeight="tall"
        >
          {subtitle}
        </Text>
      )}
      <Box
        w="60px"
        h="3px"
        bg="prachatham.500"
        borderRadius="full"
        mt={2}
      />
    </VStack>
  );
}
