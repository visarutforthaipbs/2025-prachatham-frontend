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
    <Box
      overflow="hidden"
      borderRadius="xl"
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      boxShadow="0 1px 3px rgba(0,0,0,0.06)"
      _hover={{
        boxShadow: "0 20px 40px -8px rgba(0,0,0,0.12)",
        transform: "translateY(-4px)",
        borderColor: "prachatham.100",
      }}
      transition="all 0.3s ease"
      h="full"
      display="flex"
      flexDirection="column"
    >
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
              bg={project.acf.projectStatus === "active" ? "prachatham.500" : "gray.500"}
              color="white"
              fontSize="xs"
              px={3}
              py={1}
              borderRadius="full"
              fontWeight="500"
            >
              {project.acf.projectStatus === "active" ? "ดำเนินการ" : "เสร็จสิ้น"}
            </Badge>
          )}
        </Box>

        {/* Project Content */}
        <Box p={5} flexGrow={1} display="flex" flexDirection="column">
          <Heading
            as="h3"
            size="md"
            color="prachatham.700"
            mb={3}
            lineHeight="snug"
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
        </Box>
      </ChakraLink>
    </Box>
  );
}
