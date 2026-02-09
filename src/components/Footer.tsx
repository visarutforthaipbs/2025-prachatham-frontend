"use client";

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Heading,
  Link as ChakraLink,
  HStack,
  VStack,
  Divider,
  Image,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const socialLinks = [
  { label: "Facebook", icon: FaFacebook, href: "https://www.facebook.com/prachatham" },
  { label: "Twitter", icon: FaTwitter, href: "https://twitter.com/PrachathamF" },
  { label: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/prachathammedia/" },
  { label: "TikTok", icon: FaTiktok, href: "https://www.tiktok.com/@prachathammedia" },
  { label: "YouTube", icon: FaYoutube, href: "https://www.youtube.com/@pnnontv" },
];

export default function Footer() {
  return (
    <Box bg="gray.900" color="white">
      {/* Top accent bar */}
      <Box h="3px" bgGradient="linear(to-r, prachatham.600, prachatham.400, envGreen.400)" />

      <Container maxW="7xl" py={{ base: 12, md: 16 }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 10, lg: 8 }}>
          {/* Logo and Description */}
          <VStack align="start" spacing={5}>
            <Text fontSize="xl" fontWeight="bold" letterSpacing="-0.02em">
              ประชาธรรม
            </Text>
            <Text fontSize="sm" color="gray.400" lineHeight="tall">
              สื่อ ประชาธรรม ประชาทำ
            </Text>
            <Text fontSize="sm" color="gray.500" lineHeight="tall">
              77/1 หมู่ 5 ต.สุเทพ อ.เมือง
              <br />
              จ.เชียงใหม่ 50200
            </Text>
          </VStack>

          {/* About Foundation */}
          <VStack align="start" spacing={4}>
            <Heading as="h3" size="sm" color="white" fontWeight="600" letterSpacing="0.02em">
              เกี่ยวกับมูลนิธิ
            </Heading>
            <Stack spacing={3}>
              <ChakraLink
                as={Link}
                href="/about"
                color="gray.400"
                fontSize="sm"
                _hover={{
                  color: "prachatham.300",
                }}
                transition="color 0.15s ease"
              >
                เกี่ยวกับเรา
              </ChakraLink>
              <ChakraLink
                as={Link}
                href="/contact"
                color="gray.400"
                fontSize="sm"
                _hover={{
                  color: "prachatham.300",
                }}
                transition="color 0.15s ease"
              >
                ช่องทางติดต่อเรา
              </ChakraLink>
            </Stack>
          </VStack>

          {/* Our Projects */}
          <VStack align="start" spacing={4}>
            <Heading as="h3" size="sm" color="white" fontWeight="600" letterSpacing="0.02em">
              เมนูหลัก
            </Heading>
            <Stack spacing={3}>
              <ChakraLink
                as={Link}
                href="/causes"
                color="gray.400"
                fontSize="sm"
                _hover={{ color: "prachatham.300" }}
                transition="color 0.15s ease"
              >
                โครงการที่กำลังทำ
              </ChakraLink>
              <ChakraLink
                as={Link}
                href="/posts"
                color="gray.400"
                fontSize="sm"
                _hover={{ color: "prachatham.300" }}
                transition="color 0.15s ease"
              >
                สื่อ
              </ChakraLink>
              <ChakraLink
                as={Link}
                href="/publications"
                color="gray.400"
                fontSize="sm"
                _hover={{ color: "prachatham.300" }}
                transition="color 0.15s ease"
              >
                สิ่งพิมพ์
              </ChakraLink>
            </Stack>
          </VStack>

          {/* Categories */}
          <VStack align="start" spacing={4}>
            <Heading as="h3" size="sm" color="white" fontWeight="600" letterSpacing="0.02em">
              หมวดหมู่
            </Heading>
            <Stack spacing={3}>
              <ChakraLink
                as={Link}
                href="/category/featured"
                color="gray.400"
                fontSize="sm"
                _hover={{ color: "prachatham.300" }}
                transition="color 0.15s ease"
              >
                ข่าวเด่น
              </ChakraLink>
              <ChakraLink
                as={Link}
                href="/category/activist-journalist"
                color="gray.400"
                fontSize="sm"
                _hover={{ color: "prachatham.300" }}
                transition="color 0.15s ease"
              >
                ACTIVIST JOURNALIST
              </ChakraLink>
              <ChakraLink
                as={Link}
                href="/category/envilocaleyes"
                color="gray.400"
                fontSize="sm"
                _hover={{ color: "prachatham.300" }}
                transition="color 0.15s ease"
              >
                ENVILOCALEYES
              </ChakraLink>
              <ChakraLink
                as={Link}
                href="/category/firedustdialogue"
                color="gray.400"
                fontSize="sm"
                _hover={{ color: "prachatham.300" }}
                transition="color 0.15s ease"
              >
                ฝุ่นไฟ DIALOGUE
              </ChakraLink>
              <ChakraLink
                as={Link}
                href="/category/breath-talk"
                color="gray.400"
                fontSize="sm"
                _hover={{ color: "prachatham.300" }}
                transition="color 0.15s ease"
              >
                BREATH TALK
              </ChakraLink>
            </Stack>
          </VStack>
        </SimpleGrid>

        <Divider my={10} borderColor="gray.700" />

        {/* Bottom section */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          justify="space-between"
          align="center"
        >
          <Text fontSize="sm" color="gray.500">
            © {new Date().getFullYear()} ประชาธรรม — สื่อชุมชนเพื่อการเปลี่ยนแปลง
          </Text>

          <HStack spacing={4}>
            {socialLinks.map(({ label, icon, href }) => (
              <ChakraLink
                key={label}
                href={href}
                isExternal
                aria-label={`ติดตามเราบน ${label}`}
                color="gray.500"
                _hover={{ color: "prachatham.300", transform: "translateY(-2px)" }}
                transition="all 0.2s ease"
              >
                <Icon as={icon} boxSize={5} />
              </ChakraLink>
            ))}
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}
