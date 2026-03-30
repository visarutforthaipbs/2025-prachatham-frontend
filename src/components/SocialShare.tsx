"use client";

import {
  HStack,
  IconButton,
  Tooltip,
  useClipboard,
  useToast,
  VStack,
  Text,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaTwitter,
  FaLine,
  FaCopy,
  FaPrint,
} from "react-icons/fa";

interface SocialShareProps {
  url: string;
  title: string;
  description: string;
}

export function SocialShare({
  url,
  title,
}: Omit<SocialShareProps, "description">) {
  const { onCopy } = useClipboard(url);
  const toast = useToast();

  const handleCopy = () => {
    onCopy();
    toast({
      title: "คัดลอกลิงก์แล้ว",
      description: "ลิงก์บทความถูกคัดลอกไปยังคลิปบอร์ดแล้ว",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const shareToFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const shareToTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const shareToLine = () => {
    const shareUrl = `https://social-plugins.line.me/share?url=${encodeURIComponent(
      url
    )}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <>
      {/* Social Share Buttons */}
      <VStack spacing={4} align="stretch">
        <Text fontWeight="semibold" color="gray.700" fontSize="sm">
          แชร์บทความ
        </Text>
        <HStack spacing={2} flexWrap="wrap">
          <Tooltip label="แชร์ใน Facebook">
            <IconButton
              aria-label="Share on Facebook"
              icon={<FaFacebook />}
              colorScheme="facebook"
              size="sm"
              onClick={shareToFacebook}
            />
          </Tooltip>
          <Tooltip label="แชร์ใน Twitter">
            <IconButton
              aria-label="Share on Twitter"
              icon={<FaTwitter />}
              colorScheme="twitter"
              size="sm"
              onClick={shareToTwitter}
            />
          </Tooltip>
          <Tooltip label="แชร์ใน LINE">
            <IconButton
              aria-label="Share on LINE"
              icon={<FaLine />}
              colorScheme="green"
              size="sm"
              onClick={shareToLine}
            />
          </Tooltip>
          <Tooltip label="คัดลอกลิงก์">
            <IconButton
              aria-label="Copy link"
              icon={<FaCopy />}
              colorScheme="gray"
              size="sm"
              onClick={handleCopy}
            />
          </Tooltip>
          <Tooltip label="พิมพ์บทความ">
            <IconButton
              aria-label="Print article"
              icon={<FaPrint />}
              colorScheme="gray"
              size="sm"
              onClick={handlePrint}
            />
          </Tooltip>
        </HStack>
      </VStack>
    </>
  );
}
