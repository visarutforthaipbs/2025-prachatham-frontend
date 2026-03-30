"use client";

import { Box, Text, VStack, Link as ChakraLink } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    // Find the first heading that is intersecting
    const visibleEntries = entries.filter((e) => e.isIntersecting);
    if (visibleEntries.length > 0) {
      setActiveId(visibleEntries[0].target.id);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0,
    });

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings, handleObserver]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  if (headings.length === 0) return null;

  const minLevel = Math.min(...headings.map((h) => h.level));

  return (
    <>
      {/* Desktop sidebar */}
      <Box
        display={{ base: "none", xl: "block" }}
        position="fixed"
        top="100px"
        left="max(1rem, calc((100vw - 56rem) / 2 - 280px))"
        width="240px"
        maxH="calc(100vh - 140px)"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": { width: "3px" },
          "&::-webkit-scrollbar-thumb": {
            background: "var(--chakra-colors-gray-300)",
            borderRadius: "3px",
          },
        }}
      >
        <Text
          fontSize="xs"
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing="0.05em"
          color="gray.500"
          mb={3}
        >
          สารบัญ
        </Text>
        <VStack align="stretch" spacing={0}>
          {headings.map((heading) => {
            const indent = (heading.level - minLevel) * 12;
            const isActive = activeId === heading.id;
            return (
              <ChakraLink
                key={heading.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(heading.id);
                }}
                href={`#${heading.id}`}
                pl={`${indent + 12}px`}
                py="6px"
                fontSize="13px"
                lineHeight="1.4"
                color={isActive ? "prachatham.700" : "gray.500"}
                fontWeight={isActive ? "semibold" : "normal"}
                borderLeft="2px solid"
                borderColor={isActive ? "prachatham.500" : "gray.200"}
                bg={isActive ? "prachatham.50" : "transparent"}
                _hover={{
                  color: "prachatham.600",
                  textDecoration: "none",
                  bg: "gray.50",
                }}
                transition="all 0.15s ease"
                display="block"
                noOfLines={2}
              >
                {heading.text}
              </ChakraLink>
            );
          })}
        </VStack>
      </Box>

      {/* Mobile floating TOC button */}
      <Box display={{ base: "block", xl: "none" }}>
        <Box
          as="button"
          position="fixed"
          bottom="80px"
          left="20px"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="full"
          px={4}
          py={2}
          shadow="lg"
          zIndex={999}
          onClick={() => setIsOpen(!isOpen)}
          display="flex"
          alignItems="center"
          gap={2}
          fontSize="sm"
          fontWeight="medium"
          color="gray.700"
          _hover={{ bg: "gray.50" }}
        >
          <Box
            as="span"
            width="16px"
            height="16px"
            display="inline-block"
            css={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23059669' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='3' y1='6' x2='21' y2='6'/%3E%3Cline x1='3' y1='12' x2='15' y2='12'/%3E%3Cline x1='3' y1='18' x2='18' y2='18'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          />
          สารบัญ
        </Box>

        {/* Mobile TOC panel */}
        {isOpen && (
          <>
            <Box
              position="fixed"
              inset={0}
              bg="blackAlpha.300"
              zIndex={1000}
              onClick={() => setIsOpen(false)}
            />
            <Box
              position="fixed"
              bottom={0}
              left={0}
              right={0}
              bg="white"
              borderTopRadius="xl"
              shadow="2xl"
              zIndex={1001}
              maxH="60vh"
              overflowY="auto"
              p={5}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="0.05em"
                  color="gray.500"
                >
                  สารบัญ
                </Text>
                <Box
                  as="button"
                  onClick={() => setIsOpen(false)}
                  p={1}
                  borderRadius="full"
                  _hover={{ bg: "gray.100" }}
                  color="gray.400"
                  fontSize="lg"
                >
                  ✕
                </Box>
              </Box>
              <VStack align="stretch" spacing={0}>
                {headings.map((heading) => {
                  const indent = (heading.level - minLevel) * 12;
                  const isActive = activeId === heading.id;
                  return (
                    <ChakraLink
                      key={heading.id}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(heading.id);
                      }}
                      href={`#${heading.id}`}
                      pl={`${indent + 12}px`}
                      py="8px"
                      fontSize="14px"
                      lineHeight="1.4"
                      color={isActive ? "prachatham.700" : "gray.600"}
                      fontWeight={isActive ? "semibold" : "normal"}
                      borderLeft="2px solid"
                      borderColor={
                        isActive ? "prachatham.500" : "gray.200"
                      }
                      _hover={{
                        color: "prachatham.600",
                        textDecoration: "none",
                      }}
                      display="block"
                    >
                      {heading.text}
                    </ChakraLink>
                  );
                })}
              </VStack>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
