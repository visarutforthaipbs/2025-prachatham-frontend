"use client";
import { useEffect, useState } from "react";
import { Box, Flex, Text, Link } from "@chakra-ui/react";

export default function ReaderFloatButton({ postKey }: { postKey: string }) {
  const [canResume, setCanResume] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(`tts:${postKey}:idx`);
        setCanResume(saved !== null);
      } catch (error) {
        console.warn("localStorage not available:", error);
        setCanResume(false);
      }
    }
  }, [postKey]);

  return (
    <Link
      href="#top-player"
      position="fixed"
      bottom={6}
      right={6}
      zIndex={50}
      _hover={{ transform: "scale(1.05)", textDecoration: "none" }}
      transition="all 0.2s"
      title={canResume ? "เล่นต่อจากตำแหน่งเดิม" : "เริ่มฟังบทความ"}
      aria-label={canResume ? "เล่นต่อจากตำแหน่งเดิม" : "เริ่มฟังบทความ"}
    >
      <Flex
        align="center"
        gap={2}
        bgGradient="linear(to-r, blue.600, blue.700)"
        color="white"
        px={4}
        py={3}
        borderRadius="full"
        boxShadow="lg"
        _hover={{ boxShadow: "xl" }}
      >
        <Text fontSize="lg">{canResume ? "⏯️" : "🔊"}</Text>
        <Text fontWeight="medium" fontSize="sm">
          {canResume ? "อ่านต่อ" : "อ่านให้ฟัง"}
        </Text>
        {canResume && (
          <Box
            w={2}
            h={2}
            bg="green.400"
            borderRadius="full"
            animation="pulse 2s infinite"
            sx={{
              "@keyframes pulse": {
                "0%": { opacity: 1 },
                "50%": { opacity: 0.5 },
                "100%": { opacity: 1 },
              },
            }}
          />
        )}
      </Flex>
    </Link>
  );
}
