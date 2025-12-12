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
    <Box>
      <Flex
        bg="white"
        color="gray.600"
        minH="60px"
        py={2}
        px={4}
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
        align="center"
        position="sticky"
        top={0}
        zIndex={1000}
        boxShadow="sm"
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
              >
                {isOpen ? (
                  <CloseIcon boxSize={3} />
                ) : (
                  <HamburgerIcon boxSize={5} />
                )}
              </IconButton>
            </Flex>

            {/* Logo */}
            <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
              <ChakraLink
                as={Link}
                href="/"
                _hover={{ textDecoration: "none" }}
              >
                <Text
                  fontFamily="heading"
                  fontWeight="bold"
                  fontSize="xl"
                  color="prachatham.600"
                >
                  ประชาธรรม
                </Text>
              </ChakraLink>

              {/* Desktop Navigation */}
              <Flex display={{ base: "none", md: "flex" }} ml={10}>
                <Stack direction="row" gap={4}>
                  {NAV_ITEMS.map((navItem) => (
                    <ChakraLink
                      key={navItem.label}
                      as={Link}
                      href={navItem.href || "#"}
                      px={2}
                      py={1}
                      fontSize="sm"
                      fontWeight={500}
                      color="gray.600"
                      borderRadius="md"
                      _hover={{
                        textDecoration: "none",
                        color: "prachatham.600",
                        bg: "prachatham.50",
                      }}
                    >
                      {navItem.label}
                    </ChakraLink>
                  ))}
                </Stack>
              </Flex>
            </Flex>

            {/* Right side buttons */}
            <Stack
              flex={{ base: 1, md: 0 }}
              justify="flex-end"
              direction="row"
              spacing={3}
              align="center"
            >
              {/* Contact Us Button - Desktop */}
              <Button
                as={Link}
                href="/contact"
                colorScheme="prachatham"
                variant="solid"
                size="sm"
                px={4}
                py={2}
                fontWeight="medium"
                borderRadius="full"
                display={{ base: "none", md: "flex" }}
                _hover={{
                  transform: "translateY(-1px)",
                  boxShadow: "lg",
                }}
                transition="all 0.2s"
              >
                ติดต่อเรา
              </Button>

              {/* Search button */}
              <IconButton
                aria-label="Search"
                variant="ghost"
                onClick={onSearchToggle}
                color="gray.600"
                _hover={{
                  bg: "gray.100",
                }}
              >
                <SearchIcon />
              </IconButton>
            </Stack>
          </Flex>
        </Container>
      </Flex>

      {/* Mobile Navigation */}
      <Collapse in={isOpen} animateOpacity>
        <Box bg="white" display={{ md: "none" }} p={4} borderBottomWidth="1px">
          <VStack align="start" gap={2}>
            {NAV_ITEMS.map((navItem) => (
              <ChakraLink
                key={navItem.label}
                as={Link}
                href={navItem.href || "#"}
                w="full"
                py={2}
                px={2}
                fontWeight={600}
                color="gray.600"
                borderRadius="md"
                _hover={{
                  textDecoration: "none",
                  color: "prachatham.600",
                  bg: "prachatham.50",
                }}
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
              mt={2}
              borderRadius="md"
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
        <Box bg="white" p={4} borderBottomWidth="1px" boxShadow="sm">
          <Container maxW="7xl">
            <form onSubmit={handleSearch}>
              <InputGroup>
                <Input
                  placeholder="พิมพ์คำที่ต้องการค้นหา..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="lg"
                />
              </InputGroup>
              <Flex justify="space-between" mt={4}>
                <Button colorScheme="green" type="submit" size="md">
                  ค้นหา
                </Button>
                <Button variant="ghost" onClick={onSearchToggle} size="md">
                  ยกเลิก
                </Button>
              </Flex>
            </form>
          </Container>
        </Box>
      )}
    </Box>
  );
}
