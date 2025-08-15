import { Metadata } from "next";
import { notFound } from "next/navigation";
import { wordpressApi, formatThaiDate } from "@/lib/wordpress";
import {
  Container,
  Heading,
  Text,
  Box,
  VStack,
  HStack,
  Link as ChakraLink,
  Image,
  Badge,
} from "@chakra-ui/react";
import Link from "next/link";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await wordpressApi.getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: "ไม่พบโครงการ | ประชาธรรม",
    };
  }

  return {
    title: `${project.title.rendered} | ประชาธรรม`,
    description: project.excerpt.rendered || "โครงการของมูลนิธิประชาธรรม",
    openGraph: {
      title: `${project.title.rendered} | ประชาธรรม`,
      description: project.excerpt.rendered || "โครงการของมูลนิธิประชาธรรม",
      type: "article",
      images: project._embedded?.["wp:featuredmedia"]?.[0]?.source_url
        ? [
            {
              url: project._embedded["wp:featuredmedia"][0].source_url,
              alt:
                project._embedded["wp:featuredmedia"][0].alt_text ||
                project.title.rendered,
            },
          ]
        : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = await wordpressApi.getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <Container maxW="4xl" py={8}>
      <VStack align="stretch" spacing={8}>
        {/* Breadcrumb */}
        <HStack fontSize="sm" color="gray.500">
          <ChakraLink as={Link} href="/" _hover={{ color: "prachatham.600" }}>
            หน้าแรก
          </ChakraLink>
          <Text>/</Text>
          <ChakraLink
            as={Link}
            href="/causes"
            _hover={{ color: "prachatham.600" }}
          >
            โครงการของเรา
          </ChakraLink>
          <Text>/</Text>
          <Text color="gray.700" fontWeight="medium" noOfLines={1}>
            {project.title.rendered}
          </Text>
        </HStack>

        {/* Project Header */}
        <Box>
          <Badge colorScheme="green" fontSize="sm" mb={4}>
            โครงการ
          </Badge>
          <Heading as="h1" size="xl" color="prachatham.700" mb={4}>
            {project.title.rendered}
          </Heading>
          <Text color="gray.500" fontSize="sm">
            {formatThaiDate(project.date)}
          </Text>
        </Box>

        {/* Featured Image */}
        {project._embedded?.["wp:featuredmedia"]?.[0] && (
          <Box borderRadius="lg" overflow="hidden">
            <Image
              src={project._embedded["wp:featuredmedia"][0].source_url}
              alt={
                project._embedded["wp:featuredmedia"][0].alt_text ||
                project.title.rendered
              }
              w="100%"
              h="400px"
              objectFit="cover"
            />
          </Box>
        )}

        {/* Project Content */}
        <Box
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: project.content.rendered }}
          sx={{
            "& p": {
              marginBottom: "1.5rem",
              lineHeight: "1.75",
              color: "gray.700",
            },
            "& h2, & h3, & h4": {
              color: "prachatham.700",
              fontWeight: "bold",
              marginTop: "2rem",
              marginBottom: "1rem",
            },
            "& ul, & ol": {
              marginLeft: "1.5rem",
              marginBottom: "1.5rem",
            },
            "& img": {
              borderRadius: "0.5rem",
              marginY: "1.5rem",
            },
          }}
        />
      </VStack>
    </Container>
  );
}
