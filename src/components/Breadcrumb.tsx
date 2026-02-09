"use client";

import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Container,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <Box bg="white" py={3} borderBottomWidth="1px" borderColor="gray.100">
      <Container maxW="7xl">
        <ChakraBreadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.300" boxSize={3} />}
          fontSize="sm"
        >
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              href="/"
              color="gray.500"
              _hover={{ color: "prachatham.600", textDecoration: "none" }}
              transition="color 0.15s ease"
            >
              หน้าแรก
            </BreadcrumbLink>
          </BreadcrumbItem>

          {items.map((item, index) => (
            <BreadcrumbItem
              key={index}
              isCurrentPage={index === items.length - 1}
            >
              {item.href && index !== items.length - 1 ? (
                <BreadcrumbLink
                  as={Link}
                  href={item.href}
                  color="gray.500"
                  _hover={{ color: "prachatham.600", textDecoration: "none" }}
                  transition="color 0.15s ease"
                >
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbLink
                  color="gray.800"
                  fontWeight="medium"
                  _hover={{ textDecoration: "none" }}
                  cursor="default"
                >
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
        </ChakraBreadcrumb>
      </Container>
    </Box>
  );
}
