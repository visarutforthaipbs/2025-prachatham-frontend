"use client";

import {
  Box,
  Flex,
  IconButton,
  Stack,
  useDisclosure,
  Container,
  Input,
  InputGroup,
  Button,
  VStack,
  Link as ChakraLink,
  Collapse,
  HStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NavItem {
  label: string;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "โครงการที่กำลังทำ",
    href: "/causes",
  },
  {
    label: "สื่อ",
    href: "/posts",
  },
  {
    label: "สิ่งพิมพ์",
    href: "/publications",
  },
];

export default function Navigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isSearchOpen, onToggle: onSearchToggle } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      onSearchToggle();
    }
  };

  return (
    <Box position="sticky" top={0} zIndex={1000}>
      {/* Top accent bar */}
      <Box h="3px" bgGradient="linear(to-r, prachatham.600, prachatham.400, envGreen.400)" />

      <Flex
        bg="white"
        color="gray.600"
        minH="64px"
        py={2}
        px={4}
        borderBottomWidth="1px"
        borderBottomColor="gray.100"
        align="center"
        boxShadow="sm"
        backdropFilter="saturate(180%) blur(12px)"
        backgroundColor="rgba(255, 255, 255, 0.92)"
      >
        <Container maxW="7xl">
          <Flex align="center" justify="space-between">
            {/* Mobile menu button */}
            <Flex
              flex={{ base: 1, md: "auto" }}
              ml={{ base: -2 }}
              display={{ base: "flex", md: "none" }}
            >
              <IconButton
                onClick={onToggle}
                aria-label={isOpen ? "ปิดเมนู" : "เปิดเมนู"}
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
                variant="ghost"
                size="sm"
                borderRadius="md"
              >
                {isOpen ? (
                  <CloseIcon boxSize={3} />
                ) : (
                  <HamburgerIcon boxSize={5} />
                )}
              </IconButton>
            </Flex>

            {/* Logo */}
            <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }} align="center">
              <ChakraLink
                as={Link}
                href="/"
                _hover={{ textDecoration: "none" }}
                display="flex"
                alignItems="center"
              >
                <Image
                  src="/new-logo-2.svg"
                  alt="ประชาธรรม"
                  width={160}
                  height={40}
                  priority
                />
              </ChakraLink>

              {/* Desktop Navigation */}
              <Flex display={{ base: "none", md: "flex" }} ml={10}>
                <HStack spacing={1}>
                  {NAV_ITEMS.map((navItem) => (
                    <ChakraLink
                      key={navItem.label}
                      as={Link}
                      href={navItem.href || "#"}
                      px={4}
                      py={2}
                      fontSize="sm"
                      fontWeight={500}
                      color="gray.600"
                      borderRadius="md"
                      position="relative"
                      _hover={{
                        textDecoration: "none",
                        color: "prachatham.700",
                        bg: "prachatham.50",
                      }}
                      transition="all 0.2s ease"
                    >
                      {navItem.label}
                    </ChakraLink>
                  ))}
                </HStack>
              </Flex>
            </Flex>

            {/* Right side buttons */}
            <Stack
              flex={{ base: 1, md: 0 }}
              justify="flex-end"
              direction="row"
              spacing={2}
              align="center"
            >
              {/* Search button */}
              <IconButton
                aria-label="Search"
                variant="ghost"
                onClick={onSearchToggle}
                color="gray.500"
                size="sm"
                borderRadius="md"
                _hover={{
                  bg: "gray.100",
                  color: "gray.700",
                }}
              >
                <SearchIcon />
              </IconButton>

              {/* Contact Us Button - Desktop */}
              <Button
                as={Link}
                href="/contact"
                variant="primary"
                size="sm"
                display={{ base: "none", md: "flex" }}
              >
                ติดต่อเรา
              </Button>
            </Stack>
          </Flex>
        </Container>
      </Flex>

      {/* Mobile Navigation */}
      <Collapse in={isOpen} animateOpacity>
        <Box
          id="mobile-nav"
          bg="white"
          display={{ md: "none" }}
          p={5}
          borderBottomWidth="1px"
          borderColor="gray.100"
          boxShadow="lg"
        >
          <VStack align="stretch" gap={1}>
            {NAV_ITEMS.map((navItem) => (
              <ChakraLink
                key={navItem.label}
                as={Link}
                href={navItem.href || "#"}
                w="full"
                py={3}
                px={4}
                fontWeight={500}
                color="gray.700"
                borderRadius="lg"
                _hover={{
                  textDecoration: "none",
                  color: "prachatham.700",
                  bg: "prachatham.50",
                }}
                transition="all 0.15s ease"
                onClick={onToggle}
              >
                {navItem.label}
              </ChakraLink>
            ))}

            {/* Contact Us Button - Mobile */}
            <Button
              as={Link}
              href="/contact"
              colorScheme="prachatham"
              variant="solid"
              w="full"
              mt={3}
              borderRadius="lg"
              fontWeight="medium"
              onClick={onToggle}
            >
              ติดต่อเรา
            </Button>
          </VStack>
        </Box>
      </Collapse>

      {/* Search Box */}
      {isSearchOpen && (
        <Box
          bg="white"
          p={5}
          borderBottomWidth="1px"
          borderColor="gray.100"
          boxShadow="lg"
        >
          <Container maxW="7xl">
          <form onSubmit={handleSearch}>
              <InputGroup>
                <Input
                  placeholder="พิมพ์คำที่ต้องการค้นหา..."
                  aria-label="ค้นหาบทความ"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="lg"
                  borderRadius="lg"
                  bg="gray.50"
                  variant="outline"
                  autoFocus
                />
              </InputGroup>
              <Flex justify="flex-end" mt={3} gap={2}>
                <Button
                  variant="ghost"
                  onClick={onSearchToggle}
                  size="md"
                >
                  ยกเลิก
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  size="md"
                >
                  ค้นหา
                </Button>
              </Flex>
            </form>
          </Container>
        </Box>
      )}
    </Box>
  );
}
