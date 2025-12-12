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
      bottom={{ base: "20px", md: "40px" }}
      right={{ base: "20px", md: "40px" }}
      zIndex={1000}
    >
      <IconButton
        aria-label="กลับขึ้นด้านบน"
        icon={<ChevronUpIcon boxSize={6} />}
        onClick={scrollToTop}
        colorScheme="prachatham"
        size="lg"
        borderRadius="full"
        boxShadow="lg"
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "xl",
        }}
        transition="all 0.2s"
      />
    </Box>
  );
}
