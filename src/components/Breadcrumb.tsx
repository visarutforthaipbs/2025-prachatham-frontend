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
    <Box bg="gray.50" py={3} borderBottomWidth="1px" borderColor="gray.200">
      <Container maxW="7xl">
        <ChakraBreadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.400" />}
          fontSize="sm"
        >
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              href="/"
              color="gray.600"
              _hover={{ color: "prachatham.600", textDecoration: "none" }}
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
                  color="gray.600"
                  _hover={{ color: "prachatham.600", textDecoration: "none" }}
                >
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbLink
                  color="prachatham.600"
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
