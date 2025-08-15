import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ทดสอบฟอนต์ DB Helvethaica X | ประชาธรรม",
  description: "หน้าทดสอบการแสดงผลฟอนต์ DB Helvethaica X ในน้ำหนักต่างๆ",
};

export default function FontTest() {
  return (
    <>
      {/* Hero Section with Background Image and Green Overlay */}
      <Box
        position="relative"
        h="60vh"
        minH="400px"
        bgImage="url('/images/hero-1-page-1.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* Green Overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="prachatham.600"
          opacity={0.7}
          zIndex={1}
        />

        {/* Hero Content */}
        <Container maxW="7xl" position="relative" zIndex={2}>
          <VStack spacing={6} textAlign="center" color="white">
            <Heading
              as="h1"
              size="3xl"
              fontWeight="bold"
              textShadow="2px 2px 4px rgba(0,0,0,0.3)"
            >
              ทดสอบฟอนต์ DB Helvethaica X
            </Heading>
            <Text
              fontSize="xl"
              maxW="3xl"
              lineHeight="tall"
              textShadow="1px 1px 2px rgba(0,0,0,0.3)"
            >
              หน้าทดสอบการแสดงผลฟอนต์ DB Helvethaica X ในน้ำหนักต่างๆ
              เพื่อให้เห็นความสวยงามและความอ่านง่ายของตัวอักษรไทย
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Font Testing Content */}
      <Container maxW="7xl" py={16}>
        <VStack spacing={8} align="start">
          <Box>
            <Heading as="h1" size="2xl" color="prachatham.700" mb={6}>
              ทดสอบฟอนต์ DB Helvethaica X
            </Heading>

            <VStack spacing={6} align="start">
              <Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={2}>
                  Font Weight 400 (Regular):
                </Text>
                <Text fontSize="xl" fontWeight="400">
                  เราคือกลุ่มคนที่ต้องการสนับสนุนให้เกิดการเปลี่ยนแปลงผ่านการสื่อสารจากคนในท้องถิ่นเอง
                </Text>
              </Box>

              <Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={2}>
                  Font Weight 500 (Medium):
                </Text>
                <Text fontSize="xl" fontWeight="500">
                  มูลนิธิประชาธรรม
                  เป็นองค์กรที่มุ่งหวังสร้างการเปลี่ยนแปลงเชิงบวก
                </Text>
              </Box>

              <Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={2}>
                  Font Weight 700 (Bold):
                </Text>
                <Text fontSize="xl" fontWeight="700">
                  สนับสนุนให้ผู้คนบอกเล่าเรื่องราวด้วยตัวเอง
                </Text>
              </Box>

              <Box mt={8}>
                <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={2}>
                  Heading Examples:
                </Text>
                <VStack spacing={3} align="start">
                  <Heading as="h1" size="2xl">
                    Heading Size 2XL
                  </Heading>
                  <Heading as="h2" size="xl">
                    Heading Size XL
                  </Heading>
                  <Heading as="h3" size="lg">
                    Heading Size LG
                  </Heading>
                  <Heading as="h4" size="md">
                    Heading Size MD
                  </Heading>
                </VStack>
              </Box>

              <Box mt={8}>
                <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={2}>
                  Mixed Thai and English Text:
                </Text>
                <Text fontSize="lg" lineHeight="tall">
                  The DB Helvethaica X font supports both Thai (ไทย) and English
                  text seamlessly. ฟอนต์ DB Helvethaica X
                  รองรับทั้งข้อความไทยและอังกฤษได้อย่างลงตัว สำหรับการใช้งานใน
                  website ของมูลนิธิประชาธรรม.
                </Text>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
}
