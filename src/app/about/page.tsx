import {
  Container,
  Heading,
  Text,
  Box,
  VStack,
  HStack,
  Link as ChakraLink,
  SimpleGrid,
  Card,
  CardBody,
  Divider,
  Badge,
  UnorderedList,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ประชาธรรมคือใคร | มูลนิธิสื่อประชาธรรม",
  description:
    "ประวัติและพันธกิจของมูลนิธิสื่อประชาธรรม องค์กรสื่อทางเลือกเพื่อการพัฒนาที่ยั่งยืน",
  openGraph: {
    title: "ประชาธรรมคือใคร | มูลนิธิสื่อประชาธรรม",
    description:
      "ประวัติและพันธกิจของมูลนิธิสื่อประชาธรรม องค์กรสื่อทางเลือกเพื่อการพัฒนาที่ยั่งยืน",
  },
};

export default function AboutPage() {
  return (
    <Container maxW="6xl" py={8}>
      <VStack align="stretch" gap={12}>
        {/* Breadcrumb */}
        <HStack fontSize="sm" color="gray.500">
          <ChakraLink as={Link} href="/" _hover={{ color: "prachatham.600" }}>
            หน้าแรก
          </ChakraLink>
          <Text>/</Text>
          <Text color="gray.700" fontWeight="medium">
            ประชาธรรมคือใคร
          </Text>
        </HStack>

        {/* Header */}
        <Box textAlign="center">
          <Badge colorScheme="green" fontSize="sm" px={3} py={1} mb={4}>
            WHO WE ARE
          </Badge>
          <Heading as="h1" size="2xl" color="prachatham.700" mb={6}>
            ประชาธรรมคือใคร
          </Heading>
        </Box>

        {/* About Image */}
        <Box
          position="relative"
          width="100%"
          height={{ base: "300px", md: "400px" }}
          borderRadius="xl"
          overflow="hidden"
          shadow="lg"
        >
          <Image
            src="/images/about-1.jpg"
            alt="มูลนิธิสื่อประชาธรรม"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </Box>

        {/* Who We Are Section */}
        <Card>
          <CardBody>
            <Heading as="h2" size="lg" color="prachatham.700" mb={6}>
              เราคือใคร
            </Heading>
            <VStack
              align="stretch"
              gap={6}
              fontSize="md"
              lineHeight="tall"
              color="gray.700"
            >
              <Text>
                มูลนิธิสื่อประชาธรรมจดทะเบียนเมื่อปี 2558 เดิมคือ
                “สำนักข่าวประชาธรรม” อันเป็นองค์กร สื่อทางเลือกที่ก่อตั้งเมื่อปี
                2542 โดยกลุ่มนักวิชาการ
                องค์กรพัฒนาเอกชนและองค์กรชุมชนในเขตภาคเหนือ
                ซึ่งต่อมาได้มีการขยายการระดมหุ้นจากสมาชิกเครือข่ายประชาชนทั่วประเทศ
                เพื่อให้เป็นองค์กรสื่อที่ภาคประชาชนเป็นเจ้าของและมีส่วนร่วม
                มีวัตถุประสงค์เพื่อเสริมศักยภาพของชุมชนท้องถิ่นในการสื่อสารและผลิตข่าวสารในประเด็นต่าง
                ๆ เนื่องจากข้อจำกัดของสื่อมวลชนกระแสหลัก (mainstream media)
                ที่ไม่สามารถเข้ามาติดตามปัญหาในระดับท้องถิ่นได้
                เพราะประสบปัญหาด้านเศรษฐกิจไม่สามารถส่งผู้สื่อข่าวมาติดตามข่าว
                ประกอบกับแนวคิดของบรรณาธิการบางส่วนที่สนใจแต่ประเด็นระดับชาติและยังขึ้นอยู่กับสปอนเซอร์ที่สนับสนุนสื่อมวลชน
                ขณะที่ข้อมูลข่าวสารที่เป็นประโยชน์กับสาธารณะรวมถึงประชาชนที่อยู่ในท้องถิ่นโดยส่วนใหญ่ล้วนเป็นอุบัติการณ์ที่เกิดขึ้นในท้องถิ่น
              </Text>

              <Box>
                <Text fontWeight="semibold" mb={3}>
                  ในการดำเนินงานของสำนักข่าวประชาธรรมในปี 2542-2557
                  ได้มีการดำเนินงาน 3 ด้านคือ
                </Text>
                <OrderedList spacing={3} pl={6}>
                  <ListItem>
                    ผลิตข่าวสารข้อมูลข่าวสารเพื่อขยายพื้นที่ภาคประชาชนในสื่อกระแสหลักอย่างต่อเนื่องเป็นประจำทุกวันในรูปแบบของ
                    ข่าว บทความ รายงานพิเศษ ส่งให้แก่สื่อมวลชนกระแสหลัก
                  </ListItem>
                  <ListItem>
                    ผลิตสื่อเพื่อหนุนเสริมขบวนภาคประชาชน เช่น เว็บไซต์
                    www.prachatham.com หนังสือ เช่น คู่มือการทำข่าว
                    ประสบการณ์การทำข่าวของนักข่าวมืออาชีพ
                  </ListItem>
                  <ListItem>
                    สร้างอาสาสมัครผู้สื่อข่าว ในระดับท้องถิ่นตามจุดต่าง ๆ
                    โดยการฝึกอบรมเช่นการสื่อข่าว เขียนข่าว
                    การทำข่าวสืบสวนสอบสวนและการทำข่าวสิ่งแวดล้อม
                    โดยประสานงานกับสมาคมนักข่าวและชมรมนักข่าวสิ่งแวดล้อมเพื่อช่วยในเรื่องกระบวนการดังกล่าว
                    ภายหลังจากฝึกอบรมก็มีกระบวนการติดตามต่อโดยให้ผู้สื่อข่าวของสำนักข่าวประชาธรรมเป็นพี่เลี้ยงเพื่อช่วยในการทำข่าวจากพื้นที่
                  </ListItem>
                </OrderedList>
              </Box>

              <Text>
                ช่วงปีแรก ๆ เน้นกลุ่มเป้าหมายเป็นองค์กรชุมชน องค์กรพัฒนาเอกชน
                ระหว่างปี 2547-2549
                เริ่มมีการขยายกลุ่มเป้าหมายไปยังนักศึกษาในสถาบันราชภัฎ
                วิทยุชุมชน และองค์กรปกครองส่วนท้องถิ่น
              </Text>
            </VStack>
          </CardBody>
        </Card>

        {/* Network Cooperation */}
        <Card>
          <CardBody>
            <VStack
              align="stretch"
              gap={4}
              fontSize="md"
              lineHeight="tall"
              color="gray.700"
            >
              <Text>
                ในการดำเนินงานของสำนักข่าวประชาธรรมจะมีการประสานความร่วมมือกับเครือข่ายองค์กรชาวบ้านที่อยู่ตามพื้นที่ต่าง
                ๆ เช่น เครือข่ายทรัพยากรธรรมชาติและสิ่งแวดล้อมภาคเหนือ
                เครือข่ายป่าชุมชน เครือข่ายเกษตรกรรมทางเลือก กลุ่มรักษ์เชียงของ
                กลุ่มฮักเมืองน่าน ฯลฯ
                เพื่อที่จะนำข้อมูลข่าวสารในพื้นที่ดังกล่าวออกมาเผยแพร่
                ขณะเดียวกันก็มีการเสริมศักยภาพบุคลากรในพื้นที่ดังกล่าวให้สามารถเป็นผู้สื่อสารเองได้ด้วย
                และเชื่อมต่อกับวิทยุชุมชนเพื่อใช้เป็นช่องทางในการเผยแพร่
              </Text>

              <Text>
                ต่อมาในปี 2547
                จากการสรุปบทเรียนการดำเนินงานของสำนักข่าวประชาธรรม
                พบว่าการดำเนินงานเพื่อสื่อสารแนวดิ่งเพียงอย่างเดียวนั้นไม่เพียงพอ
                เพราะการสื่อสารแนวดิ่งหรือการชิงพื้นที่สื่อกระแสหลักเพื่อผลักดันประเด็นของภาคประชาชนไปสู่นโยบายสาธารณะนั้นยังประสบปัญหา
                เนื่องจากสื่อสารมวลชนเองก็มีการเปลี่ยนแปลง
                มีการควบรวมกิจการและผูกขาดมากขึ้น
                ถูกครอบงำจากภาคทุนและรัฐบาลที่มีผลประโยชน์ทับซ้อนอย่างหนัก
                ดังนั้นจึงมีการขยายโครงการสื่อสารแนวราบ (local talk) ขึ้นมา
                ทั้งนี้เพื่อเป็นการเปิดพื้นที่การสื่อสารของภาคประชาชนในแนวระนาบมากขึ้น
              </Text>
            </VStack>
          </CardBody>
        </Card>

        {/* Local Talk Project */}
        <Card>
          <CardBody>
            <Heading as="h3" size="md" color="prachatham.700" mb={4}>
              โครงการสื่อสารแนวราบ (Local Talk)
            </Heading>
            <VStack
              align="stretch"
              gap={4}
              fontSize="md"
              lineHeight="tall"
              color="gray.700"
            >
              <Text>
                การทำงานของโครงการสื่อสารแนวราบมีภารกิจอยู่ 3 ด้าน คือ
              </Text>
              <OrderedList spacing={3} pl={6}>
                <ListItem>
                  การพัฒนาสื่อทางเลือกเพื่อขยายการสื่อสารในแนวราบที่สอดคล้องกับชุมชนท้องถิ่น
                  เช่น พัฒนาสถานีข่าววิทยุชุมชน การพัฒนาเว็บไซต์สื่อทางเลือก
                  เช่น ผลิตจดหมายข่าว &ldquo;ท้องถิ่นสนทนา&rdquo;
                  และทำรายการวิทยุ &ldquo;ท้องถิ่นสนทนา&rdquo;
                </ListItem>
                <ListItem>
                  การหนุนเสริม
                  เชื่อมโยงเครือข่ายการสื่อสารแนวราบในเครือข่ายภาคประชาชน เช่น
                  การจัดเวทีโต๊ะข่าวสัญจรไปตามพื้นที่ต่าง ๆ
                  เพื่อเสริมทักษะการคิดวิเคราะห์และเชื่อมโยง
                </ListItem>
                <ListItem>
                  การเสริมทักษะเครือข่ายในด้านการสื่อสาร เช่น
                  การฝึกอบรมการใช้อินเทอร์เน็ตค้นข้อมูลให้แก่สถานีวิทยุชุมชน
                </ListItem>
              </OrderedList>
            </VStack>
          </CardBody>
        </Card>

        {/* Board of Directors */}
        <Card>
          <CardBody>
            <Heading as="h2" size="lg" color="prachatham.700" mb={6}>
              กรรมการมูลนิธิ
            </Heading>
            <Badge colorScheme="blue" fontSize="sm" px={3} py={1} mb={6}>
              BOARD OF DIRECTORS
            </Badge>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {[
                {
                  name: "ชยันต์ วรรธนะภูติ",
                  position: "ประธานมูลนิธิ",
                  image: "/images/board-member/ชยันต์-วรรธนะภูติ.webp",
                },
                {
                  name: "ไพสิฐ พาณิชย์กุล",
                  position: "รองประธานมูลนิธิ",
                  image: "/images/board-member/ไพสิฐ พาณิชย์กุล.webp",
                },
                {
                  name: "คำรณ คุณะดิลก",
                  position: "กรรมการ",
                  image: "/images/board-member/คำรณ คุณะดิลก.webp",
                },
                {
                  name: "นรินทร์ นำเจริญ",
                  position: "กรรมการ",
                  image: "/images/board-member/นรินทร์ นำเจริญ.webp",
                },
                {
                  name: "นฤมล วันทนีย์",
                  position: "กรรมการ",
                  image: "/images/board-member/นฤมล วันทนีย์.webp",
                },
                {
                  name: "รจนกร แบ่งทิศ",
                  position: "กรรมการ",
                  image: "/images/board-member/รจนกร แบ่งทิศ.webp",
                },
                {
                  name: "ปัณณพร ไพบูลย์วัฒนกิจ",
                  position: "กรรมการและเหรัญญิก",
                  image: "/images/board-member/ปัณณพร ไพบูลย์วัฒนกิจ.webp",
                },
                {
                  name: "นันทา เบญจศิลารักษ์",
                  position: "กรรมการและเลขานุการ",
                  image: "/images/board-member/นันทา เบญจศิลารักษ์.webp",
                },
              ].map((member, index) => (
                <Box
                  key={index}
                  p={4}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  textAlign="center"
                  bg="white"
                  _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                >
                  <VStack spacing={3}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={120}
                      height={120}
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <VStack spacing={1}>
                      <Heading as="h4" size="sm" color="gray.700">
                        {member.name}
                      </Heading>
                      <Text
                        fontSize="sm"
                        color="prachatham.600"
                        fontWeight="medium"
                      >
                        {member.position}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Our Mission */}
        <Card>
          <CardBody>
            <Heading as="h2" size="lg" color="prachatham.700" mb={6}>
              พันธกิจของเรา
            </Heading>
            <Badge colorScheme="green" fontSize="sm" px={3} py={1} mb={6}>
              OUR MISSION
            </Badge>
            <Text
              fontSize="lg"
              color="gray.600"
              mb={8}
              fontStyle="italic"
              textAlign="center"
            >
              เราคือกลุ่มคนที่ต้องการสนับสนุนให้เกิดการเปลี่ยนแปลงผ่านการสื่อสารจากคนในท้องถิ่นเอง
            </Text>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
              {[
                {
                  title: "ฝึกอบรม",
                  content:
                    "ส่งเสริม จัดการฝึกอบรม ศึกษาวิจัย การพัฒนาระบบการสื่อสารมวลชน ที่เป็นประโยชน์ต่อสาธารณะ ส่งเสริมการมีคุณธรรม จริยธรรม เคารพสิทธิมนุษยชน และความหลากหลายของชาติพันธุ์",
                },
                {
                  title: "การใช้สื่อของชุมชนท้องถิ่น",
                  content:
                    "ส่งเสริม สนับสนุนการศึกษาเรียนรู้ในการใช้สื่อของชุมชนท้องถิ่น ภาคประชาสังคมเพื่อการอนุรักษ์และพัฒนาสื่อ วัฒนธรรม ภูมิปัญญาท้องถิ่น สิ่งแวดล้อมและการมีคุณภาพชีวิตที่ดีของสังคม",
                },
                {
                  title: "สนับสนุนให้เกิดการแลกเปลี่ยน",
                  content:
                    "ส่งเสริม สนับสนุนให้เกิดการแลกเปลี่ยน เรียนรู้ ด้านการสื่อสารมวลชน ระหว่างสถาบันการสื่อสารมวลชนในระดับต่าง ๆ เพื่อสร้างสรรค์องค์ความรู้ หลักสูตรการสื่อสารที่เป็นประโยชน์ต่อสังคมและมนุษยชาติ",
                },
                {
                  title: "สนับสนุนให้เกิดการรวบรวมผลงานที่เกี่ยวกับการพัฒนา",
                  content:
                    "สนับสนุนให้เกิดการรวบรวมผลงานที่เกี่ยวกับการพัฒนา การเป็นแหล่งข้อมูลข่าวสาร และส่งเสริมให้เกิดการเผยแพร่ข้อมูลข่าวสาร ผลงานการพัฒนาสังคมเพื่อการเป็นอยู่ที่ดีขึ้นของประชาชน ผ่านทางระบบสื่อสารในช่องทางต่าง ๆ ทั้งสิ่งพิมพ์ วิทยุ โทรทัศน์ อินเทอร์เน็ต รวมทั้งสื่อมวลชนเพื่อประโยชน์สาธารณะ",
                },
                {
                  title: "เข้าร่วมกิจกรรมหรือดำเนินการเพื่อสาธารณประโยชน์",
                  content:
                    "เข้าร่วมกิจกรรมหรือดำเนินการเพื่อสาธารณประโยชน์ กับองค์กรการกุศลอื่น ๆ เพื่อสาธารณประโยชน์",
                },
                {
                  title: "ส่งเสริมให้เกิดการสื่อสารอย่างสร้างสรรค์ในสังคม",
                  content:
                    "การดำเนินการใด ๆ ของมูลนิธิไม่มีวัตถุประสงค์ในการทำการเมือง หรือแสวงหาผลกำไร การดำเนินการและจัดทำกิจกรรมใด ๆ ของมูลนิธิต้องเป็นไปเพื่อการส่งเสริมให้เกิดการสื่อสารอย่างสร้างสรรค์ในสังคม",
                },
              ].map((mission, index) => (
                <Card key={index} variant="outline">
                  <CardBody>
                    <Heading as="h4" size="sm" color="prachatham.700" mb={3}>
                      {mission.title}
                    </Heading>
                    <Text fontSize="sm" lineHeight="tall" color="gray.600">
                      {mission.content}
                    </Text>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Our History */}
        <Card>
          <CardBody>
            <Heading as="h2" size="lg" color="prachatham.700" mb={6}>
              พลวัตของประชาธรรม
            </Heading>
            <Badge colorScheme="orange" fontSize="sm" px={3} py={1} mb={6}>
              OUR HISTORY
            </Badge>
            <Text
              fontSize="lg"
              color="gray.600"
              mb={8}
              textAlign="center"
              fontStyle="italic"
            >
              จากสำนักข่าวท้องถิ่นสู่ผู้สนับสนุนให้เกิดการสื่อสาร
            </Text>

            <VStack align="stretch" gap={8}>
              {/* Foundation Phase */}
              <Box>
                <Heading as="h3" size="md" color="prachatham.700" mb={4}>
                  ยุคเริ่มต้น
                </Heading>
                <Text fontSize="sm" color="gray.500" mb={4}>
                  ปี 2542-2548
                </Text>
                <VStack
                  align="stretch"
                  gap={3}
                  fontSize="sm"
                  lineHeight="relaxed"
                  color="gray.700"
                >
                  <UnorderedList spacing={2} pl={6}>
                    <ListItem>
                      ปี 2542-2545 พัฒนากองบรรณาธิการ และโต๊ะข่าว
                      และการพัฒนาเว็บไซต์กลาง (www.prachatham.com)
                    </ListItem>
                    <ListItem>
                      ปี 2546 จัดทำโครงการฝึกอบรมผู้สื่อข่าวเชิงลึก เช่น
                      ทำข่าวสัมภาษณ์ การทำข่าวเชิงสืบสวนสอบสวน
                      เทคนิคการเขียนรายงานพิเศษ ร่วมกับสมาคมนักข่าว
                      และสถาบันพัฒนาองค์กรชุมชน (พอช.)
                    </ListItem>
                    <ListItem>
                      ปี 2547 โครงการฝึกอบรมผู้สื่อภูมิภาค 4 ภูมิภาค ได้แก่
                      ภาคอีสาน ภาคใต้ ภาคกลาง และภาคเหนือ
                      ร่วมกับสมาคมนักข่าวนักหนังสือพิมพ์แห่งประเทศไทย
                      และสถาบันพัฒนาองค์กรชุมชน (พอช.)
                    </ListItem>
                    <ListItem>
                      ปี 2547 พัฒนาเว็บไซต์ Localtalk
                      เพื่อเป็นการเชื่อมโยงการสื่อสารในแนวระนาบกับเครือข่ายวิทยุชุมชน
                      องค์กรชุมชน และนักข่าวในท้องถิ่น
                    </ListItem>
                    <ListItem>
                      ปี 2547 โครงการฝึกอบรมเยาวชนด้านเอดส์
                      ร่วมกับมูลนิธิพะเยาเพื่อการพัฒนา
                    </ListItem>
                    <ListItem>
                      ปี 2547 โครงการฝึกอบรมให้กับสถานีวิทยุชุมชน
                      ในการเป็นผู้สื่อข่าว
                      ร่วมกับเครือข่ายสื่อภาคประชาชนภาคเหนือ
                      และเครือข่ายวิทยุชุมชนจาวล้านนา
                    </ListItem>
                    <ListItem>
                      ปี 2548 โครงการฝึกอบรมผู้สื่อข่าวกับนโยบายสาธารณะ
                      ร่วมกับมูลนิธิสาธารณสุขแห่งชาติ ที่ จ.เชียงราย และ
                      จ.เชียงใหม่
                    </ListItem>
                    <ListItem>
                      ปี 2548 โครงการฝึกอบรมผู้สื่อข่าวเยาวชนที่ จ.นครสวรรค์
                      ร่วมกับ เครือข่ายเอดส์และสุขภาพ
                    </ListItem>
                  </UnorderedList>
                </VStack>
              </Box>

              <Divider />

              {/* Expansion Phase */}
              <Box>
                <Heading as="h3" size="md" color="prachatham.700" mb={4}>
                  ระยะสร้างฐาน พัฒนาเว็บไซต์ WWW.PRACHATHAM.COM
                </Heading>
                <Text fontSize="sm" color="gray.500" mb={4}>
                  ปี 2549-2556
                </Text>
                <VStack
                  align="stretch"
                  gap={3}
                  fontSize="sm"
                  lineHeight="relaxed"
                  color="gray.700"
                >
                  <UnorderedList spacing={2} pl={6}>
                    <ListItem>
                      ปี 2549 โครงการฝึกอบรมผู้สื่อข่าวท้องถิ่นเรื่องความยากจน
                      ที่จ.เพชรบุรี จ.เชียงราย ร่วมมือกับสถาบันพัฒนาองค์กรชุมชน
                      (พอช.) และเครือข่ายชุมชนท้องถิ่น
                      สถาบันการศึกษาในระดับท้องถิ่น เช่น สถาบันราชภัฎเชียงราย
                    </ListItem>
                    <ListItem>
                      ปี 2550 โครงการจัดตั้งผู้สื่อข่าวท้องถิ่น
                      นำร่องจัดตั้งศูนย์ข่าวท้องถิ่นในพื้นที่ จ.แม่ฮ่องสอน
                      และจ.เชียงราย ร่วมมือกับสถาบันพัฒนาองค์กรชุมชน
                    </ListItem>
                    <ListItem>
                      ปี 2550-2554 จัดทำโครงการจัดตั้งนักข่าวพลเมืองพื้นที่ 3
                      จังหวัด คือ เชียงใหม่ เชียงราย และ
                      แม่ฮ่องสอนได้รับทุนสนับสนุนจากสถาบันพัฒนาองค์กรชุมชน
                    </ListItem>
                    <ListItem>
                      ปี 2550-2554 จัดทำโครงการสื่อสารแนวราบ (Local Talk)
                      ได้รับทุนสนับสนุนจาก สถาบันพัฒนาองค์กรชุมชน และ สสส.
                      ในการพัฒนาเว็บไซต์ Local talk
                      และการสนับสนุนการสื่อสารระหว่างชุมชน ผลิตสื่อและวิทยุชุมชน
                    </ListItem>
                    <ListItem>
                      ปี 2550-2556 จัดทำโครงการ Alternative Journalist
                      ได้รับทุนสนับสนุนจาก OSF (Open Society Foundation)
                    </ListItem>
                    <ListItem>
                      ปี 2551-2554
                      การจัดทำโครงการนักข่าวสิ่งแวดล้อมในพื้นที่ลุ่มน้ำปิง-ฝาง
                      จ.เชียงใหม่ได้รับทุนสนับสนุนจาก กองทุนสิ่งแวดล้อม
                      สำนักงานนโยบายและแผนทรัพยากรธรรมชาติและสิ่งแวดล้อม
                      กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม
                    </ListItem>
                  </UnorderedList>
                </VStack>
              </Box>

              <Divider />

              {/* Foundation Establishment */}
              <Box>
                <Heading as="h3" size="md" color="prachatham.700" mb={4}>
                  ระยะขยายตัว สร้างเครือข่ายผู้สื่อข่าว
                  และนักสื่อสารทั้งในแนวดิ่งและแนวราบ
                </Heading>
                <Text fontSize="sm" color="gray.500" mb={4}>
                  ปี 2556-2564
                </Text>
                <VStack
                  align="stretch"
                  gap={3}
                  fontSize="sm"
                  lineHeight="relaxed"
                  color="gray.700"
                >
                  <UnorderedList spacing={2} pl={6}>
                    <ListItem>
                      ปี 2556-2565 ได้รับทุนสนับสนุนจาก
                      สำนักงานกองทุนการสร้างเสริมสุขภาพ (สสส.) Open Soceity
                      Foundation (OSF) สถาบันพัฒนาองค์กรชุมชน (พอช.)
                      และกองทุนสิ่งแวดล้อม
                      สำนักงานนโยบายและแผนทรัพยากรธรรมชาติและสิ่งแวดล้อม
                    </ListItem>
                    <ListItem>
                      ปี 2556-2557 โครงการประชาธรรมทีวี และการพัฒนาสื่อพลเมือง
                      ได้รับทุนสนับสนุนจาก usaid
                    </ListItem>
                    <ListItem>
                      ปี 2562-2563
                      โครงการพัฒนากระบวนการสื่อสารเพื่อสิทธิพลเมืองของผู้สูงวัย
                      ได้รับทุนสนับสนุนจากกองทุนสื่อสร้างสรรค์
                    </ListItem>
                    <ListItem>
                      ปี 2563-2564
                      โครงการเยาวชนเท่าทันสื่อรับมือโรคอุบัติใหม่ในชุมชน
                      ภายใต้โครงการ MIDL for Inclusive Cities 2020
                      ได้รับทุนจากสถาบันสื่อเด็กและเยาวชน
                    </ListItem>
                  </UnorderedList>
                </VStack>
              </Box>

              <Divider />

              {/* Knowledge Building */}
              <Box>
                <Heading as="h3" size="md" color="prachatham.700" mb={4}>
                  จัดตั้งเป็นมูลนิธิสื่อประชาธรรม
                </Heading>
                <Text fontSize="sm" color="gray.500" mb={4}>
                  ปี 2564 - ปัจจุบัน
                </Text>
                <VStack
                  align="stretch"
                  gap={3}
                  fontSize="sm"
                  lineHeight="relaxed"
                  color="gray.700"
                >
                  <UnorderedList spacing={2} pl={6}>
                    <ListItem>
                      ปี 2564-2566
                      โครงการสร้างนักสื่อสารสิ่งแวดล้อมเพื่อเฝ้าระวังและฟื้นฟูสิ่งแวดล้อมอย่างยั่งยืน
                      (เชียงใหม่) ได้รับทุนสนับสนุนจาก กองทุนสิ่งแวดล้อม
                      สำนักงานนโยบายและแผนทรัพยากรธรรมชาติและสิ่งแวดล้อม
                    </ListItem>
                    <ListItem>
                      ปี 2566-2567 ได้รับทุนสนับสนุนจาก กองทุนสื่อสร้างสรรค์
                      สถาบันสื่อเด็กและเยาวชน (สสย.)
                    </ListItem>
                    <ListItem>
                      ปี 2566-2567 โครงการ Citizen Accountability for Local
                      governance Media (CALM) ได้รับทุนจาก Internews
                    </ListItem>
                    <ListItem>
                      ปี 2567-2568 โครงการ Strengthening Transparency in
                      Infrastructure Development Through Environmental Reporting
                      in Southeast Asia (STRIDES) ได้รับทุนจาก Earth Journalism
                      Network (EJN)
                    </ListItem>
                  </UnorderedList>
                </VStack>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Contact Section */}
        <Box
          bg="prachatham.50"
          borderRadius="lg"
          p={8}
          textAlign="center"
          border="1px solid"
          borderColor="prachatham.200"
        >
          <Heading as="h3" size="lg" mb={4} color="prachatham.700">
            สื่อ สิ่งแวดล้อม ประชาทำ
          </Heading>
          <Text color="gray.600" mb={6}>
            77/1 หมู่ 5 ต.สุเทพ อ.เมืองจ.เชียงใหม่ 50200
          </Text>
          <HStack justify="center" gap={4} flexWrap="wrap">
            <ChakraLink
              as={Link}
              href="/donate"
              color="prachatham.600"
              fontWeight="medium"
              _hover={{ color: "prachatham.700", textDecoration: "underline" }}
            >
              ร่วมทำงานกับเรา
            </ChakraLink>
            <ChakraLink
              as={Link}
              href="/contact"
              color="prachatham.600"
              fontWeight="medium"
              _hover={{ color: "prachatham.700", textDecoration: "underline" }}
            >
              ช่องทางติดต่อเรา
            </ChakraLink>
            <ChakraLink
              as={Link}
              href="/causes"
              color="prachatham.600"
              fontWeight="medium"
              _hover={{ color: "prachatham.700", textDecoration: "underline" }}
            >
              โครงการของเรา
            </ChakraLink>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
}
