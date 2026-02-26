"use client";

import { Box, VStack, Heading, Text, Icon, Card, CardBody } from "@chakra-ui/react";
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
    <Card>
      <CardBody p={6}>
        <VStack align="start" spacing={4}>
          <Box
            p={3}
            borderRadius="lg"
            bg="prachatham.50"
            color="prachatham.600"
          >
            <Icon as={icon} boxSize={6} />
          </Box>
          <Heading as="h3" variant="card" color="gray.800">
            {title}
          </Heading>
          <Text variant="caption" color="gray.500" fontSize="sm" lineHeight="tall">
            {description}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
}
