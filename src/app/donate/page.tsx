import {
  Container,
  Heading,
  Text,
  Box,
  VStack,
  HStack,
  Link as ChakraLink,
  Button,
  Card,
  CardBody,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ร่วมทำงานกับเรา | ประชาธรรม สื่อสิ่งแวดล้อมไทย",
  description:
    "ร่วมสนับสนุนและทำงานกับประชาธรรม เพื่อการสื่อสารสิ่งแวดล้อมที่ยั่งยืน",
  openGraph: {
    title: "ร่วมทำงานกับเรา | ประชาธรรม สื่อสิ่งแวดล้อมไทย",
    description:
      "ร่วมสนับสนุนและทำงานกับประชาธรรม เพื่อการสื่อสารสิ่งแวดล้อมที่ยั่งยืน",
  },
};

export default function DonatePage() {
  return (
    <Container maxW="6xl" py={8}>
      <VStack align="stretch" gap={8}>
        {/* Breadcrumb */}
        <HStack fontSize="sm" color="gray.500">
          <ChakraLink as={Link} href="/" _hover={{ color: "prachatham.600" }}>
            หน้าแรก
          </ChakraLink>
          <Text>/</Text>
          <Text color="gray.700" fontWeight="medium">
            ร่วมทำงานกับเรา
          </Text>
        </HStack>

        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="xl" color="prachatham.700" mb={4}>
            ร่วมทำงานกับเรา
          </Heading>
          <Text
            fontSize="xl"
            color="gray.600"
            maxW="3xl"
            mx="auto"
            lineHeight="tall"
          >
            มาร่วมเป็นส่วนหนึ่งของการสร้างการเปลี่ยนแปลงด้านสิ่งแวดล้อม
          </Text>
        </Box>

        {/* Main Content */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
          {/* Support Our Work */}
          <Card>
            <CardBody>
              <VStack align="stretch" gap={4}>
                <Box textAlign="center">
                  <Heading as="h2" size="lg" color="prachatham.700" mb={2}>
                    สนับสนุนงานของเรา
                  </Heading>
                  <Badge colorScheme="green" fontSize="sm" px={3} py={1}>
                    การสนับสนุนทุกรูปแบบมีค่า
                  </Badge>
                </Box>

                <Text color="gray.600" lineHeight="tall" textAlign="center">
                  เราสนับสนุนให้ผู้คนบอกเล่าเรื่องสิ่งแวดล้อมด้วยตัวเอง
                  การสนับสนุนของคุณจะช่วยให้เราสามารถดำเนินงานต่อไป
                </Text>

                <VStack gap={3}>
                  <Button
                    as="a"
                    href="mailto:info@prachatham.com"
                    colorScheme="green"
                    size="lg"
                    width="full"
                  >
                    ติดต่อเราเพื่อสนับสนุน
                  </Button>

                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    หรือติดต่อผ่านช่องทางโซเชียลมีเดีย
                  </Text>
                </VStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Join Our Team */}
          <Card>
            <CardBody>
              <VStack align="stretch" gap={4}>
                <Box textAlign="center">
                  <Heading as="h2" size="lg" color="prachatham.700" mb={2}>
                    ร่วมทีมกับเรา
                  </Heading>
                  <Badge colorScheme="blue" fontSize="sm" px={3} py={1}>
                    เปิดรับสมัครตลอด
                  </Badge>
                </Box>

                <Text color="gray.600" lineHeight="tall" textAlign="center">
                  หากคุณมีความสนใจในด้านสิ่งแวดล้อมและการสื่อสาร
                  มาร่วมทำงานกับเราเพื่อสร้างการเปลี่ยนแปลงที่ยั่งยืน
                </Text>

                <VStack gap={2}>
                  <Text fontWeight="medium" color="gray.700">
                    ตำแหน่งที่เปิดรับ:
                  </Text>
                  <VStack gap={1} fontSize="sm" color="gray.600">
                    <Text>• นักสื่อสารสิ่งแวดล้อม</Text>
                    <Text>• ช่างภาพและวิดีโอ</Text>
                    <Text>• นักเขียนบทความ</Text>
                    <Text>• ผู้ประสานงานโครงการ</Text>
                    <Text>• อาสาสมัคร</Text>
                  </VStack>
                </VStack>

                <Button
                  as="a"
                  href="mailto:jobs@prachatham.com"
                  variant="outline"
                  colorScheme="green"
                  size="lg"
                  width="full"
                >
                  ส่งใบสมัครงาน
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Our Projects */}
        <Card>
          <CardBody>
            <Heading
              as="h2"
              size="lg"
              color="prachatham.700"
              mb={6}
              textAlign="center"
            >
              โครงการที่คุณจะได้ร่วมสนับสนุน
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
              <Box>
                <Heading as="h3" size="md" color="gray.700" mb={2}>
                  โครงการสร้างนักสื่อสารสิ่งแวดล้อมเชิงรุก
                </Heading>
                <Text color="gray.600" lineHeight="tall" mb={3}>
                  ฝึกอบรมและพัฒนาทักษะการสื่อสารให้กับชุมชน
                  เพื่อให้สามารถนำเสนอปัญหาสิ่งแวดล้อมได้อย่างมีประสิทธิภาพ
                </Text>
                <ChakraLink
                  as={Link}
                  href="/causes"
                  color="prachatham.600"
                  fontWeight="medium"
                  _hover={{
                    color: "prachatham.700",
                    textDecoration: "underline",
                  }}
                >
                  เรียนรู้เพิ่มเติม →
                </ChakraLink>
              </Box>

              <Box>
                <Heading as="h3" size="md" color="gray.700" mb={2}>
                  การผลิตเนื้อหาสื่อสิ่งแวดล้อม
                </Heading>
                <Text color="gray.600" lineHeight="tall" mb={3}>
                  สร้างเนื้อหาคุณภาพเพื่อเผยแพร่ความรู้และสร้างความตระหนัก
                  ด้านสิ่งแวดล้อมให้กับสังคมไทย
                </Text>
                <ChakraLink
                  as={Link}
                  href="/posts"
                  color="prachatham.600"
                  fontWeight="medium"
                  _hover={{
                    color: "prachatham.700",
                    textDecoration: "underline",
                  }}
                >
                  อ่านบทความของเรา →
                </ChakraLink>
              </Box>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Call to Action */}
        <Box
          bg="prachatham.50"
          borderRadius="lg"
          p={8}
          textAlign="center"
          border="1px solid"
          borderColor="prachatham.200"
        >
          <Heading as="h3" size="lg" mb={4} color="prachatham.700">
            พร้อมร่วมทำงานกับเราแล้วหรือยัง?
          </Heading>
          <Text color="gray.600" mb={6} maxW="2xl" mx="auto" lineHeight="tall">
            เราเชื่อว่าการสื่อสารที่ดีสามารถสร้างการเปลี่ยนแปลงได้
            มาร่วมเป็นส่วนหนึ่งของการเปลี่ยนแปลงนี้
          </Text>
          <HStack justify="center" gap={4} flexWrap="wrap">
            <Button
              as="a"
              href="mailto:info@prachatham.com"
              colorScheme="green"
              size="lg"
            >
              ติดต่อเรา
            </Button>
            <Button
              as={Link}
              href="/about"
              variant="outline"
              colorScheme="green"
              size="lg"
            >
              เรียนรู้เพิ่มเติม
            </Button>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
}
