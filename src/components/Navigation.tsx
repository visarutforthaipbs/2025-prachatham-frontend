"use client";

import {
  Box,
  Flex,
  Text,
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
        boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.05)"
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
                aria-label="Toggle Navigation"
                variant="ghost"
                size="sm"
                borderRadius="lg"
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
                <Text
                  fontFamily="heading"
                  fontWeight="bold"
                  fontSize="xl"
                  color="prachatham.700"
                  letterSpacing="-0.02em"
                >
                  ประชาธรรม
                </Text>
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
                      borderRadius="lg"
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
                borderRadius="lg"
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
                colorScheme="prachatham"
                variant="solid"
                size="sm"
                px={5}
                fontWeight="medium"
                borderRadius="full"
                display={{ base: "none", md: "flex" }}
                _hover={{
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 14px -2px rgba(5, 150, 105, 0.4)",
                }}
                transition="all 0.2s"
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="lg"
                  borderRadius="xl"
                  bg="gray.50"
                  border="2px solid"
                  borderColor="gray.200"
                  _focus={{
                    borderColor: "prachatham.400",
                    bg: "white",
                    boxShadow: "0 0 0 3px rgba(5, 150, 105, 0.1)",
                  }}
                />
              </InputGroup>
              <Flex justify="flex-end" mt={3} gap={2}>
                <Button
                  variant="ghost"
                  onClick={onSearchToggle}
                  size="md"
                  borderRadius="lg"
                >
                  ยกเลิก
                </Button>
                <Button
                  colorScheme="prachatham"
                  type="submit"
                  size="md"
                  borderRadius="lg"
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
