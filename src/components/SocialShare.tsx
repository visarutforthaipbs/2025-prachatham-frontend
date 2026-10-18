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
      <span className="font-bold text-gray-800 dark:text-gray-100 text-base">
        แชร์บทความ
      </span>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={shareToFacebook}
          aria-label="Share on Facebook"
          title="แชร์ใน Facebook"
          className="w-11 h-11 inline-flex items-center justify-center rounded-full transition-colors bg-[#1877F2] text-white hover:opacity-90"
        >
          <FaFacebook size={16} />
        </button>
        <button
          onClick={shareToTwitter}
          aria-label="Share on Twitter"
          title="แชร์ใน Twitter"
          className="w-11 h-11 inline-flex items-center justify-center rounded-full transition-colors bg-black text-white hover:opacity-85 dark:bg-white dark:text-black"
        >
          <FaTwitter size={16} />
        </button>
        <button
          onClick={shareToLine}
          aria-label="Share on LINE"
          title="แชร์ใน LINE"
          className="w-11 h-11 inline-flex items-center justify-center rounded-full transition-colors bg-[#06C755] text-white hover:opacity-90"
        >
          <FaLine size={16} />
        </button>
        <button
          onClick={handleCopy}
          aria-label="Copy link"
          title={copied ? "คัดลอกแล้ว!" : "คัดลอกลิงก์"}
          className="w-11 h-11 inline-flex items-center justify-center rounded-full transition-colors bg-black/5 text-gray-700 hover:bg-black/10 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/15"
        >
          <FaCopy size={16} />
        </button>
        <button
          onClick={handlePrint}
          aria-label="Print article"
          title="พิมพ์บทความ"
          className="w-11 h-11 inline-flex items-center justify-center rounded-full transition-colors bg-black/5 text-gray-700 hover:bg-black/10 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/15"
        >
          <FaPrint size={16} />
        </button>
        {copied && (
          <span className="text-sm text-brand-700 dark:text-brand-200 font-bold" role="status">คัดลอกลิงก์แล้ว</span>
        )}
      </div>
    </div>
  );
}
