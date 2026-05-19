"use client";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { FaVolumeUp, FaPlay, FaPause, FaStop, FaCog } from "react-icons/fa";

function htmlToChunks(html: string, maxLen = 180) {
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    // Replace block-level closing tags with a period to ensure pause
    .replace(/<\/(h[1-6]|p|div|li|br|tr)>/gi, ". ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const raw = text
    .split(/([。．\.!?…]|[?!]+|—)/u)
    .reduce<string[]>((acc, part) => {
      const p = (part || "").trim();
      if (!p) return acc;
      if (/[。．\.!?…]|[?!]+|—/.test(p) && acc.length) {
        acc[acc.length - 1] = `${acc[acc.length - 1]}${p}`;
      } else {
        acc.push(p);
      }
      return acc;
    }, []);

  const chunks: string[] = [];
  let buf = "";
  for (const s of raw) {
    if ((buf + " " + s).trim().length > maxLen) {
      if (buf) chunks.push(buf.trim());
      buf = s;
    } else {
      buf = (buf ? buf + " " : "") + s;
    }
  }
  if (buf) chunks.push(buf.trim());
  return chunks.filter(Boolean);
}

type Props = {
  postKey: string;
  articleSelector?: string;
};

export default function ReaderThaiFree({
  postKey,
  articleSelector = "article, .prose, .wordpress-content",
}: Props) {
  const [html, setHtml] = useState<string>("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(1);
  const [status, setStatus] = useState<"idle" | "playing" | "paused">("idle");
  const [canResume, setCanResume] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const queueRef = useRef<SpeechSynthesisUtterance[]>([]);
  const currentIdxRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = document.querySelector(
      articleSelector as string
    ) as HTMLElement | null;
    if (!el) {
      setError("ไม่พบเนื้อหาบทความสำหรับอ่านออกเสียง");
    }
    setHtml(el?.innerHTML || "");
  }, [articleSelector]);

  const chunks = useMemo(() => htmlToChunks(html), [html]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    function loadVoices() {
      const vs = window.speechSynthesis.getVoices();
      setVoices(vs);
      const th = vs.find((v) => v.lang?.toLowerCase().startsWith("th"));
      if (th) setSelectedVoice(th);
    }

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(`tts:${postKey}:idx`);
      setCanResume(saved !== null && Number(saved) < chunks.length);
    } catch {
      setCanResume(false);
    }
  }, [postKey, chunks.length]);

  const stopAll = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    queueRef.current = [];
    setStatus("idle");
    setCurrentIdx(0);
    currentIdxRef.current = 0;
  }, []);

  const buildQueue = useCallback(
    (startIndex = 0) => {
      setCurrentIdx(startIndex);
      currentIdxRef.current = startIndex;
      queueRef.current = chunks.map((text, idx) => {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = selectedVoice?.lang || "th-TH";
        if (selectedVoice) u.voice = selectedVoice;
        u.rate = rate;
        u.onstart = () => {
          currentIdxRef.current = idx;
          setCurrentIdx(idx);
          setStatus("playing");
          setError(null);
          try {
            localStorage.setItem(`tts:${postKey}:idx`, String(idx));
          } catch {
            // localStorage may be unavailable
          }
        };
        u.onend = () => {
          if (idx === chunks.length - 1) {
            try {
              localStorage.removeItem(`tts:${postKey}:idx`);
            } catch {
              // localStorage may be unavailable
            }
            setCanResume(false);
            setStatus("idle");
            setCurrentIdx(0);
          }
        };
        u.onerror = (event) => {
          setError(`การอ่านออกเสียงล้มเหลว: ${event.error}`);
          setStatus("idle");
        };
        return u;
      });

      const q = queueRef.current.slice(startIndex);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        for (const u of q) window.speechSynthesis.speak(u);
      }
    },
    [chunks, selectedVoice, rate, postKey]
  );

  const playFromStart = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setError("อุปกรณ์นี้ไม่รองรับการอ่านออกเสียง");
      return;
    }
    if (!chunks.length) return;
    stopAll();
    buildQueue(0);
  }, [chunks.length, stopAll, buildQueue]);

  const playFromSaved = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setError("อุปกรณ์นี้ไม่รองรับการอ่านออกเสียง");
      return;
    }

    let saved = 0;
    try {
      saved = Number(localStorage.getItem(`tts:${postKey}:idx`) || 0);
    } catch {
      // ignore
    }

    const start = Number.isFinite(saved)
      ? Math.max(0, Math.min(saved, chunks.length - 1))
      : 0;
    stopAll();
    buildQueue(start);
  }, [postKey, chunks.length, stopAll, buildQueue]);

  const pause = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        setStatus("paused");
      }
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setStatus("playing");
      }
    }
  }, []);

  const changeRate = useCallback(
    (v: number) => {
      setRate(v);
      // If currently playing, stop and rebuild from current position with new rate
      if (status === "playing" || status === "paused") {
        const resumeFrom = currentIdxRef.current;
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
        queueRef.current = [];
        // Rebuild will use the new rate via closure on next render
        // We use a small timeout to let state update
        setTimeout(() => {
          buildQueue(resumeFrom);
        }, 0);
      }
    },
    [status, buildQueue]
  );

  const hasThai = voices.some((v) => v.lang?.toLowerCase().startsWith("th"));

  return (
    <div role="region" aria-label="เครื่องมืออ่านบทความออกเสียง" id="tts-player">
      {/* Error Banner */}
      {error && (
        <div className="mb-3 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
          <span aria-hidden="true">⚠️</span>
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-700"
            aria-label="ปิดข้อความเตือน"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Controls */}
      <div className="flex flex-wrap items-center text-gray-600 text-sm gap-4">
        <div className="flex items-center gap-2">
          <FaVolumeUp size={14} aria-hidden="true" />
          <span className="font-medium">ฟังบทความ</span>
        </div>

        <div className="flex items-center gap-2" role="toolbar" aria-label="ควบคุมการเล่น">
          <button
            onClick={playFromStart}
            disabled={!chunks.length}
            aria-label="เริ่มอ่านบทความตั้งแต่ต้น"
            className="inline-flex items-center gap-1.5 bg-brand-600 text-white text-xs font-medium px-3 py-1 rounded-full hover:bg-brand-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-50 disabled:cursor-not-allowed"
            title={!chunks.length ? "ไม่พบเนื้อหาสำหรับอ่านออกเสียง" : undefined}
          >
            <FaPlay size={12} aria-hidden="true" />
            เริ่มอ่าน
          </button>

          {canResume && status === "idle" && (
            <button
              onClick={playFromSaved}
              aria-label="อ่านต่อจากตำแหน่งเดิม"
              className="bg-brand-500 text-white text-xs font-medium px-3 py-1 rounded-full hover:bg-brand-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              อ่านต่อ
            </button>
          )}

          {status === "playing" && (
            <button
              onClick={pause}
              aria-label="หยุดชั่วคราว"
              className="w-8 h-8 flex items-center justify-center bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              <FaPause aria-hidden="true" />
            </button>
          )}

          {status === "paused" && (
            <button
              onClick={resume}
              aria-label="เล่นต่อ"
              className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              <FaPlay aria-hidden="true" />
            </button>
          )}

          {status !== "idle" && (
            <button
              onClick={stopAll}
              aria-label="หยุดการอ่าน"
              className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              <FaStop aria-hidden="true" />
            </button>
          )}

          <button
            onClick={() => setShowSettings(!showSettings)}
            aria-label="ตั้งค่าการอ่านออกเสียง"
            aria-expanded={showSettings}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
              showSettings
                ? "bg-gray-600 text-white"
                : "border border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaCog aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Progress */}
      {status !== "idle" && chunks.length > 0 && (
        <div className="mt-2 flex items-center gap-3">
          <progress
            value={currentIdx + 1}
            max={chunks.length}
            className="flex-1 h-1.5 accent-brand-600"
            aria-label="ความคืบหน้าการอ่านออกเสียง"
          />
          <span className="text-xs text-gray-500">
            {currentIdx + 1} / {chunks.length}
          </span>
        </div>
      )}

      {/* Collapsible Settings */}
      {showSettings && (
        <div className="mt-3 pt-3 border-t border-gray-200" role="group" aria-label="ตั้งค่าการอ่านออกเสียง">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="min-w-0">
              <label htmlFor="tts-rate" className="mb-1 font-medium text-gray-700 block">ความเร็ว</label>
              <select
                id="tts-rate"
                value={rate}
                onChange={(e) => changeRate(parseFloat(e.target.value))}
                className="w-full sm:w-[120px] text-sm border border-gray-300 rounded-lg px-2 py-1 bg-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option value={0.75}>ช้า (0.75x)</option>
                <option value={1}>ปกติ (1.0x)</option>
                <option value={1.25}>เร็ว (1.25x)</option>
                <option value={1.5}>เร็วมาก (1.5x)</option>
              </select>
            </div>

            <div className="min-w-0">
              <label htmlFor="tts-voice" className="mb-1 font-medium text-gray-700 block">เสียง</label>
              <select
                id="tts-voice"
                value={selectedVoice?.name || ""}
                onChange={(e) =>
                  setSelectedVoice(
                    voices.find((v) => v.name === e.target.value) || null
                  )
                }
                className="w-full sm:w-[200px] text-sm border border-gray-300 rounded-lg px-2 py-1 bg-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                {(hasThai
                  ? voices.filter((v) => v.lang?.toLowerCase().startsWith("th"))
                  : voices.slice(0, 5)
                ).map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name.length > 20
                      ? v.name.substring(0, 20) + "..."
                      : v.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {!hasThai && (
            <p className="text-xs text-orange-600 mt-2" role="alert">
              <span aria-hidden="true">⚠️</span> ไม่พบเสียงภาษาไทย อาจอ่านไม่ถูกต้อง
            </p>
          )}
        </div>
      )}
    </div>
  );
}
