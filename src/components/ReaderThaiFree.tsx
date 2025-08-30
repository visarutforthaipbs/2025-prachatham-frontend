"use client";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  Select,
  HStack,
  Collapse,
  IconButton,
} from "@chakra-ui/react";
import { FaVolumeUp, FaPlay, FaPause, FaStop, FaCog } from "react-icons/fa";

function htmlToChunks(html: string, maxLen = 180) {
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
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

  const queueRef = useRef<SpeechSynthesisUtterance[]>([]);
  const currentIdxRef = useRef(0);

  useEffect(() => {
    const el = document.querySelector(
      articleSelector as string
    ) as HTMLElement | null;
    setHtml(el?.innerHTML || "");
  }, [articleSelector]);

  const chunks = useMemo(() => htmlToChunks(html), [html]);

  useEffect(() => {
    function loadVoices() {
      if (typeof window === "undefined" || !("speechSynthesis" in window))
        return;

      const vs = window.speechSynthesis.getVoices();
      setVoices(vs);
      const th = vs.find((v) => v.lang?.toLowerCase().startsWith("th"));
      if (th) setSelectedVoice(th);
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(`tts:${postKey}:idx`);
        setCanResume(saved !== null && Number(saved) < chunks.length);
      } catch (error) {
        console.warn("localStorage not available:", error);
        setCanResume(false);
      }
    }
  }, [postKey, chunks.length]);

  const stopAll = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    queueRef.current = [];
    setStatus("idle");
  }, []);

  const buildQueue = useCallback(
    (startIndex = 0) => {
      queueRef.current = chunks.map((text, idx) => {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = selectedVoice?.lang || "th-TH";
        if (selectedVoice) u.voice = selectedVoice;
        u.rate = rate;
        u.onstart = () => {
          currentIdxRef.current = idx;
          setStatus("playing");
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem(`tts:${postKey}:idx`, String(idx));
            } catch (error) {
              console.warn("Failed to save TTS progress:", error);
            }
          }
        };
        u.onend = () => {
          if (idx === chunks.length - 1) {
            if (typeof window !== "undefined") {
              try {
                localStorage.removeItem(`tts:${postKey}:idx`);
              } catch (error) {
                console.warn("Failed to clear TTS progress:", error);
              }
            }
            setCanResume(false);
            setStatus("idle");
          }
        };
        u.onerror = () => {};
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
    if (typeof window === "undefined" || !("speechSynthesis" in window))
      return alert("อุปกรณ์นี้ไม่รองรับการอ่านออกเสียง");
    if (!chunks.length) return;
    stopAll();
    buildQueue(0);
  }, [chunks.length, stopAll, buildQueue]);

  const playFromSaved = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window))
      return alert("อุปกรณ์นี้ไม่รองรับการอ่านออกเสียง");

    let saved = 0;
    if (typeof window !== "undefined") {
      try {
        saved = Number(localStorage.getItem(`tts:${postKey}:idx`) || 0);
      } catch (error) {
        console.warn("Failed to read TTS progress:", error);
      }
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

  function changeRate(v: number) {
    setRate(v);
    for (let i = currentIdxRef.current; i < queueRef.current.length; i++) {
      queueRef.current[i].rate = v;
    }
  }

  const hasThai = voices.some((v) => v.lang?.toLowerCase().startsWith("th"));

  return (
    <Box>
      {/* Main Controls */}
      <HStack color="gray.600" fontSize="sm" spacing={4}>
        <Flex align="center" gap={2}>
          <FaVolumeUp size={14} />
          <Text fontWeight="medium">ฟังบทความ</Text>
        </Flex>

        <HStack spacing={2}>
          <Button
            onClick={playFromStart}
            size="sm"
            leftIcon={<FaPlay size={12} />}
            colorScheme="prachatham"
            variant="solid"
            fontSize="xs"
            px={3}
            py={1}
            h="auto"
            minH="auto"
          >
            เริ่มอ่าน
          </Button>

          {canResume && (
            <Button
              onClick={playFromSaved}
              size="sm"
              colorScheme="green"
              variant="solid"
              fontSize="xs"
              px={3}
              py={1}
              h="auto"
              minH="auto"
            >
              อ่านต่อ
            </Button>
          )}

          {status === "playing" && (
            <IconButton
              onClick={pause}
              icon={<FaPause />}
              size="sm"
              colorScheme="yellow"
              variant="solid"
              aria-label="หยุดชั่วคราว"
              minW="auto"
              w={8}
              h={8}
            />
          )}

          {status === "paused" && (
            <IconButton
              onClick={resume}
              icon={<FaPlay />}
              size="sm"
              colorScheme="orange"
              variant="solid"
              aria-label="เล่นต่อ"
              minW="auto"
              w={8}
              h={8}
            />
          )}

          {status !== "idle" && (
            <IconButton
              onClick={stopAll}
              icon={<FaStop />}
              size="sm"
              colorScheme="red"
              variant="solid"
              aria-label="หยุด"
              minW="auto"
              w={8}
              h={8}
            />
          )}

          <IconButton
            onClick={() => setShowSettings(!showSettings)}
            icon={<FaCog />}
            size="sm"
            variant={showSettings ? "solid" : "outline"}
            colorScheme="gray"
            aria-label="ตั้งค่า"
            minW="auto"
            w={8}
            h={8}
          />
        </HStack>
      </HStack>

      {/* Collapsible Settings */}
      <Collapse in={showSettings} animateOpacity>
        <Box mt={3} pt={3} borderTop="1px solid" borderTopColor="gray.200">
          <HStack spacing={4} fontSize="sm">
            <Box>
              <Text mb={1} fontWeight="medium" color="gray.700">
                ความเร็ว
              </Text>
              <Select
                value={rate}
                onChange={(e) => changeRate(parseFloat(e.target.value))}
                size="sm"
                w="120px"
                bg="white"
              >
                <option value={0.75}>ช้า (0.75x)</option>
                <option value={1}>ปกติ (1.0x)</option>
                <option value={1.25}>เร็ว (1.25x)</option>
                <option value={1.5}>เร็วมาก (1.5x)</option>
              </Select>
            </Box>

            <Box>
              <Text mb={1} fontWeight="medium" color="gray.700">
                เสียง
              </Text>
              <Select
                value={selectedVoice?.name || ""}
                onChange={(e) =>
                  setSelectedVoice(
                    voices.find((v) => v.name === e.target.value) || null
                  )
                }
                size="sm"
                w="200px"
                bg="white"
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
              </Select>
            </Box>
          </HStack>

          {!hasThai && (
            <Text fontSize="xs" color="orange.600" mt={2}>
              ⚠️ ไม่พบเสียงภาษาไทย อาจอ่านไม่ถูกต้อง
            </Text>
          )}
        </Box>
      </Collapse>
    </Box>
  );
}
