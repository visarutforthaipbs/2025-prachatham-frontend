"use client";

import { useEffect, useState } from "react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";

interface TtsState {
  status: "idle" | "playing" | "paused";
  currentIdx: number;
  totalChunks: number;
  postKey: string;
}

export default function ReaderFloatingOverlay({ currentPostKey }: { currentPostKey: string }) {
  const [state, setState] = useState<TtsState>({
    status: "idle",
    currentIdx: 0,
    totalChunks: 0,
    postKey: "",
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStateChange = (e: Event) => {
      const customEvent = e as CustomEvent<TtsState>;
      if (customEvent.detail && customEvent.detail.postKey === currentPostKey) {
        setState(customEvent.detail);
      }
    };

    window.addEventListener("tts-state-change", handleStateChange);
    return () => {
      window.removeEventListener("tts-state-change", handleStateChange);
    };
  }, [currentPostKey]);

  useEffect(() => {
    setIsVisible(state.status !== "idle" && state.totalChunks > 0);
  }, [state.status, state.totalChunks]);

  if (!isVisible) return null;

  const triggerAction = (action: "play" | "pause" | "stop") => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("tts-control-action", {
        detail: { action, key: currentPostKey }
      }));
    }
  };

  const progressPercent = state.totalChunks > 0 
    ? ((state.currentIdx + 1) / state.totalChunks) * 100 
    : 0;

  return (
    <div 
      className="fixed bottom-6 right-6 z-[1900] max-w-[280px] sm:max-w-[320px] w-full backdrop-blur-xl bg-[#fbfcf7]/92 dark:bg-forest-900/92 border border-black/5 dark:border-forest-800/80 shadow-2xl rounded-2xl p-4 flex flex-col gap-3 transition-all duration-300 animate-fade-in-up"
      role="region"
      aria-label="เครื่องมือควบคุมการอ่านเสียงย่อส่วน"
    >
      <div className="flex items-center justify-between gap-3">
        {/* Playback status text & visualizer */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center gap-[3px] h-4 w-4 justify-center">
            {state.status === "playing" ? (
              <>
                <div className="w-[3px] bg-brand-500 rounded-full animate-audio-wave-1" />
                <div className="w-[3px] bg-brand-500 rounded-full animate-audio-wave-2" />
                <div className="w-[3px] bg-brand-500 rounded-full animate-audio-wave-3" />
              </>
            ) : (
              <>
                <div className="w-[3px] h-1.5 bg-gray-400 dark:bg-gray-650 rounded-full" />
                <div className="w-[3px] h-1.5 bg-gray-400 dark:bg-gray-650 rounded-full" />
                <div className="w-[3px] h-1.5 bg-gray-400 dark:bg-gray-650 rounded-full" />
              </>
            )}
          </div>
          <span className="text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 uppercase truncate">
            {state.status === "playing" ? "กำลังอ่านออกเสียง" : "หยุดชั่วคราว"}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {state.status === "playing" ? (
            <button
              onClick={() => triggerAction("pause")}
              aria-label="หยุดชั่วคราว"
              className="w-7 h-7 flex items-center justify-center bg-brand-500 text-white rounded-full hover:bg-brand-600 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              <FaPause size={10} />
            </button>
          ) : (
            <button
              onClick={() => triggerAction("play")}
              aria-label="เล่นต่อ"
              className="w-7 h-7 flex items-center justify-center bg-brand-600 text-white rounded-full hover:bg-brand-700 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              <FaPlay size={10} className="ml-0.5" />
            </button>
          )}
          <button
            onClick={() => triggerAction("stop")}
            aria-label="หยุดเล่นและปิดแถบควบคุม"
            className="w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            <FaStop size={10} />
          </button>
        </div>
      </div>

      {/* Progress slider and percentage indicator */}
      <div className="flex flex-col gap-1">
        <div className="w-full h-1 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500">
          <span>ย่อหน้า {state.currentIdx + 1} จาก {state.totalChunks}</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
      </div>
    </div>
  );
}
