"use client";

import { Box, Container } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  /** Background colour token — defaults to white */
  bg?: string;
  /** Extra vertical padding preset */
  size?: "sm" | "md" | "lg";
  /** Whether to use narrow max-width */
  narrow?: boolean;
  /** HTML id for anchor links */
  id?: string;
}

const paddingMap = {
  sm: { base: 10, md: 12 },
  md: { base: 12, md: 16, lg: 20 },
  lg: { base: 16, md: 20, lg: 24 },
};

/**
 * Consistent section container with responsive padding & max-width.
 */
export default function SectionWrapper({
  children,
  bg = "white",
  size = "md",
  narrow = false,
  id,
}: SectionWrapperProps) {
  return (
    <Box as="section" bg={bg} py={paddingMap[size]} id={id}>
      <Container maxW={narrow ? "4xl" : "7xl"}>{children}</Container>
    </Box>
  );
}
