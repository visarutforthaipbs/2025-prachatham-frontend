"use client";

import { useState } from "react";
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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
    <div className="flex flex-col gap-4">
      <span className="font-semibold text-gray-700 text-sm">
        แชร์บทความ
      </span>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={shareToFacebook}
          aria-label="Share on Facebook"
          title="แชร์ใน Facebook"
          className="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <FaFacebook size={16} />
        </button>
        <button
          onClick={shareToTwitter}
          aria-label="Share on Twitter"
          title="แชร์ใน Twitter"
          className="p-2 rounded-md bg-sky-500 text-white hover:bg-sky-600 transition-colors"
        >
          <FaTwitter size={16} />
        </button>
        <button
          onClick={shareToLine}
          aria-label="Share on LINE"
          title="แชร์ใน LINE"
          className="p-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
        >
          <FaLine size={16} />
        </button>
        <button
          onClick={handleCopy}
          aria-label="Copy link"
          title={copied ? "คัดลอกแล้ว!" : "คัดลอกลิงก์"}
          className="p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
        >
          <FaCopy size={16} />
        </button>
        <button
          onClick={handlePrint}
          aria-label="Print article"
          title="พิมพ์บทความ"
          className="p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
        >
          <FaPrint size={16} />
        </button>
        {copied && (
          <span className="text-xs text-green-600 font-medium">คัดลอกลิงก์แล้ว</span>
        )}
      </div>
    </div>
  );
}
