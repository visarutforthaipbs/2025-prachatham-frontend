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
} from "@chakra-ui/react";
import Link from "next/link";

export default function Footer() {
  return (
    <Box bg="gray.800" color="white">
      <Container maxW="6xl" py={12}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {/* Logo and Description */}
          <VStack align="start" spacing={4}>
            <Image
              src="https://prachatham.com/wp-content/uploads/2022/03/cropped-cropped-logo-prachatham-green.png"
              alt="ประชาธรรม"
              maxW="120px"
              filter="brightness(0) invert(1)"
            />
            <Text fontSize="lg" fontWeight="semibold">
              สื่อ สิ่งแวดล้อม ประชาทำ
            </Text>
            <Text fontSize="sm" color="gray.300" lineHeight="tall">
              77/1 หมู่ 5 ต.สุเทพ อ.เมืองจ.เชียงใหม่ 50200
            </Text>
          </VStack>

          {/* About Foundation */}
          <VStack align="start" spacing={4}>
            <Heading as="h3" size="md" color="prachatham.300">
              เกี่ยวกับมูลนิธิ
            </Heading>
            <Stack spacing={2}>
              <ChakraLink
                as={Link}
                href="/about"
                color="gray.300"
                _hover={{
                  color: "prachatham.300",
                  textDecoration: "underline",
                }}
              >
                เกี่ยวกับเรา
              </ChakraLink>
              <ChakraLink
                as={Link}
                href="/contact"
                color="gray.300"
                _hover={{
                  color: "prachatham.300",
                  textDecoration: "underline",
                }}
              >
                ช่องทางติดต่อเรา
              </ChakraLink>
            </Stack>
          </VStack>

          {/* Our Projects */}
          <VStack align="start" spacing={4}>
            <Heading as="h3" size="md" color="prachatham.300">
              เมนูหลัก
            </Heading>
            <Stack spacing={2}>
              <ChakraLink
                as={Link}
                href="/causes"
                color="gray.300"
                _hover={{
                  color: "prachatham.300",
                  textDecoration: "underline",
                }}
              >
                โครงการที่กำลังทำ
              </ChakraLink>
              <ChakraLink
                as={Link}
                href="/posts"
                color="gray.300"
                _hover={{
                  color: "prachatham.300",
                  textDecoration: "underline",
                }}
              >
                สื่อ
              </ChakraLink>
              <ChakraLink
                as={Link}
                href="/publications"
                color="gray.300"
                _hover={{
                  color: "prachatham.300",
                  textDecoration: "underline",
                }}
              >
                สิ่งพิมพ์
              </ChakraLink>
            </Stack>
            <Text fontSize="sm" color="gray.400" lineHeight="tall">
              เราสนับสนุนให้ผู้คนบอกเล่า เรื่องสิ่งแวดล้อมด้วยตัวเอง
            </Text>
          </VStack>

          {/* Categories */}
          <VStack align="start" spacing={4}>
            <Heading as="h3" size="md" color="prachatham.300">
              หมวดหมู่
            </Heading>
            <Stack spacing={2}>
              <ChakraLink
                as={Link}
                href="/category/featured"
                color="gray.300"
                _hover={{
                  color: "prachatham.300",
                  textDecoration: "underline",
                }}
              >
                ข่าวเด่น
              </ChakraLink>
              <ChakraLink
                as={Link}
                href="/category/activist-journalist"
                color="gray.300"
                _hover={{
                  color: "prachatham.300",
                  textDecoration: "underline",
                }}
              >
                ACTIVIST JOURNALIST
              </ChakraLink>
              <ChakraLink
                as={Link}
                href="/category/envilocaleyes"
                color="gray.300"
                _hover={{
                  color: "prachatham.300",
                  textDecoration: "underline",
                }}
              >
                ENVILOCALEYES
              </ChakraLink>
              <ChakraLink
                as={Link}
                href="/category/firedustdialogue"
                color="gray.300"
                _hover={{
                  color: "prachatham.300",
                  textDecoration: "underline",
                }}
              >
                ฝุ่นไฟ DIALOGUE
              </ChakraLink>
              <ChakraLink
                as={Link}
                href="/category/breath-talk"
                color="gray.300"
                _hover={{
                  color: "prachatham.300",
                  textDecoration: "underline",
                }}
              >
                BREATH TALK
              </ChakraLink>
            </Stack>
          </VStack>
        </SimpleGrid>

        <Divider my={8} borderColor="gray.600" />

        {/* Bottom section */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify="space-between"
          align="center"
        >
          <Text fontSize="sm" color="gray.400">
            © 2025 ประชาธรรม
          </Text>

          <HStack spacing={6}>
            <ChakraLink
              href="https://www.facebook.com/prachatham"
              isExternal
              color="gray.300"
              _hover={{ color: "prachatham.300" }}
            >
              Facebook
            </ChakraLink>
            <ChakraLink
              href="https://twitter.com/PrachathamF"
              isExternal
              color="gray.300"
              _hover={{ color: "prachatham.300" }}
            >
              Twitter
            </ChakraLink>
            <ChakraLink
              href="https://www.instagram.com/prachathammedia/"
              isExternal
              color="gray.300"
              _hover={{ color: "prachatham.300" }}
            >
              Instagram
            </ChakraLink>
            <ChakraLink
              href="https://www.tiktok.com/@prachathammedia"
              isExternal
              color="gray.300"
              _hover={{ color: "prachatham.300" }}
            >
              TikTok
            </ChakraLink>
            <ChakraLink
              href="https://www.youtube.com/@pnnontv"
              isExternal
              color="gray.300"
              _hover={{ color: "prachatham.300" }}
            >
              YouTube
            </ChakraLink>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}
