"use client";

import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box minH="50vh" display="flex" alignItems="center" bg="gray.50">
          <Container maxW="lg">
            <VStack spacing={6} textAlign="center">
              <Icon as={WarningIcon} boxSize={16} color="orange.500" />
              <Heading size="lg" color="gray.800">
                เกิดข้อผิดพลาด
              </Heading>
              <Text color="gray.600" fontSize="lg">
                ขออภัย เกิดข้อผิดพลาดขึ้น กรุณาลองใหม่อีกครั้ง
              </Text>
              <Button
                colorScheme="prachatham"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
              >
                โหลดหน้าใหม่
              </Button>
            </VStack>
          </Container>
        </Box>
      );
    }

    return this.props.children;
  }
}

// Functional wrapper for easier use
export default function ErrorBoundaryWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
