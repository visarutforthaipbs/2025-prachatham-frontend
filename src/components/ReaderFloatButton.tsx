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
      href="#tts-player"
      className="fixed bottom-6 right-6 z-50 hover:scale-105 transition-all duration-200 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 rounded-full"
      title={canResume ? "เล่นต่อจากตำแหน่งเดิม" : "เริ่มฟังบทความ"}
      aria-label={canResume ? "เล่นต่อจากตำแหน่งเดิม" : "เริ่มฟังบทความ"}
    >
      <div className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-colors duration-200">
        <span className="text-lg" aria-hidden="true">{canResume ? "⏯️" : "🔊"}</span>
        <span className="font-medium text-sm">
          {canResume ? "อ่านต่อ" : "อ่านให้ฟัง"}
        </span>
        {canResume && (
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-soft" aria-hidden="true" />
        )}
      </div>
    </a>
  );
}
