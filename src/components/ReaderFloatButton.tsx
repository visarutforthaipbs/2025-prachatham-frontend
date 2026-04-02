"use client";
import { useEffect, useState } from "react";

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
    <a
      href="#top-player"
      className="fixed bottom-6 right-6 z-50 hover:scale-105 transition-all duration-200 no-underline"
      title={canResume ? "เล่นต่อจากตำแหน่งเดิม" : "เริ่มฟังบทความ"}
      aria-label={canResume ? "เล่นต่อจากตำแหน่งเดิม" : "เริ่มฟังบทความ"}
    >
      <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl">
        <span className="text-lg">{canResume ? "⏯️" : "🔊"}</span>
        <span className="font-medium text-sm">
          {canResume ? "อ่านต่อ" : "อ่านให้ฟัง"}
        </span>
        {canResume && (
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-soft" />
        )}
      </div>
    </a>
  );
}
