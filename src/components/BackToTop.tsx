"use client";

import { useState, useEffect } from "react";
import { IconButton, Box } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Box
      position="fixed"
      bottom={{ base: "20px", md: "32px" }}
      right={{ base: "20px", md: "32px" }}
      zIndex={1000}
    >
      <IconButton
        aria-label="กลับขึ้นด้านบน"
        icon={<ChevronUpIcon boxSize={5} />}
        onClick={scrollToTop}
        bg="white"
        color="prachatham.600"
        size="md"
        borderRadius="full"
        border="1px solid"
        borderColor="gray.200"
        boxShadow="0 4px 14px rgba(0,0,0,0.1)"
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          bg: "prachatham.50",
          borderColor: "prachatham.200",
        }}
        transition="all 0.2s ease"
      />
    </Box>
  );
}
