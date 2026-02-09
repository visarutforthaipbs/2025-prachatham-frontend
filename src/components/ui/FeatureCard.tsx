"use client";

import { Box, VStack, Heading, Text, Icon } from "@chakra-ui/react";
import type { IconType } from "react-icons";

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
}

/**
 * Icon + title + description card for feature / mission sections.
 */
export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <VStack
      align="start"
      spacing={4}
      p={6}
      borderRadius="xl"
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      transition="all 0.3s ease"
      _hover={{
        borderColor: "prachatham.200",
        boxShadow: "0 8px 30px -8px rgba(5, 150, 105, 0.15)",
        transform: "translateY(-2px)",
      }}
    >
      <Box
        p={3}
        borderRadius="lg"
        bg="prachatham.50"
        color="prachatham.600"
      >
        <Icon as={icon} boxSize={6} />
      </Box>
      <Heading as="h3" size="md" color="gray.800">
        {title}
      </Heading>
      <Text color="gray.500" fontSize="sm" lineHeight="tall">
        {description}
      </Text>
    </VStack>
  );
}
