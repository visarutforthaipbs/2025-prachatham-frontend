"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Heading,
  Text,
  Badge,
  Flex,
  HStack,
  Icon,
  Link as ChakraLink,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { FaArrowRight, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import type { WordPressProject } from "@/lib/wordpress";

interface ProjectCardProps {
  project: WordPressProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getImageUrl = () => {
    if (project._embedded?.["wp:featuredmedia"]?.[0]) {
      return (
        project._embedded["wp:featuredmedia"][0].media_details?.sizes?.medium
          ?.source_url || project._embedded["wp:featuredmedia"][0].source_url
      );
    }
    return "/images/placeholder-project.jpg";
  };

  const getImageAlt = () => {
    return (
      project._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
      project.title.rendered ||
      "Project image"
    );
  };

  return (
    <Card h="full">
      <ChakraLink
        as={Link}
        href={`/projects/${project.slug}`}
        _hover={{ textDecoration: "none" }}
        h="full"
        display="flex"
        flexDirection="column"
      >
        {/* Project Image */}
        <Box position="relative" height="220px" overflow="hidden">
          <Image
            src={getImageUrl()}
            alt={getImageAlt()}
            fill
            style={{
              objectFit: "cover",
              transition: "transform 0.4s ease",
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Status Badge */}
          {project.acf?.projectStatus && (
            <Badge
              position="absolute"
              top={3}
              right={3}
              variant={project.acf.projectStatus === "active" ? "brand" : "subtle"}
              fontSize="xs"
              px={3}
              py={1}
            >
              {project.acf.projectStatus === "active" ? "ดำเนินการ" : "เสร็จสิ้น"}
            </Badge>
          )}
        </Box>

        {/* Project Content */}
        <CardBody p={5} flexGrow={1} display="flex" flexDirection="column">
          <Heading
            as="h3"
            variant="card"
            color="prachatham.700"
            mb={3}
            _groupHover={{ color: "prachatham.600" }}
            css={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.title.rendered}
          </Heading>

          {/* Project Details */}
          <Flex direction="column" gap={2} mb={4} flexGrow={1}>
            {project.acf?.project_duration && (
              <HStack fontSize="sm" color="gray.500" spacing={2}>
                <Icon as={FaClock} boxSize={3} color="gray.400" />
                <Text>{project.acf.project_duration}</Text>
              </HStack>
            )}
            {project.acf?.project_location && (
              <HStack fontSize="sm" color="gray.500" spacing={2}>
                <Icon as={FaMapMarkerAlt} boxSize={3} color="gray.400" />
                <Text>{project.acf.project_location}</Text>
              </HStack>
            )}
          </Flex>

          {/* Read More */}
          <Flex
            align="center"
            gap={1}
            mt="auto"
            pt={4}
            borderTop="1px solid"
            borderColor="gray.100"
            color="prachatham.600"
            fontSize="sm"
            fontWeight="500"
            _hover={{ gap: 2 }}
            transition="all 0.2s ease"
          >
            อ่านเพิ่มเติม
            <Icon as={FaArrowRight} boxSize={2.5} />
          </Flex>
        </CardBody>
      </ChakraLink>
    </Card>
  );
}
