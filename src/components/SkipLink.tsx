"use client";

import { Link as ChakraLink } from "@chakra-ui/react";

export default function SkipLink() {
  return (
    <ChakraLink
      href="#main-content"
      position="absolute"
      top="-100px"
      left="50%"
      transform="translateX(-50%)"
      bg="prachatham.600"
      color="white"
      px={4}
      py={2}
      borderRadius="md"
      fontWeight="medium"
      zIndex={9999}
      _focus={{
        top: "10px",
        outline: "2px solid",
        outlineColor: "prachatham.300",
        outlineOffset: "2px",
      }}
      transition="top 0.2s"
    >
      ข้ามไปยังเนื้อหาหลัก
    </ChakraLink>
  );
}
