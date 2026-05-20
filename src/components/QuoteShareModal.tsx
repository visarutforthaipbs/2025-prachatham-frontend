"use client";

import { useEffect, useRef, useState } from "react";
import { FaDownload, FaTimes, FaFont } from "react-icons/fa";

interface QuoteShareModalProps {
  text: string;
  isOpen: boolean;
  onClose: () => void;
  attribution: {
    title: string;
    author?: string;
    date?: string;
  };
}


type ThemeName = "forest" | "slate" | "cream" | "sunset";

interface ThemeConfig {
  bgGradient: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
  textColor: string;
  subTextColor: string;
  quoteMarkColor: string;
  accentLineColor: string;
  isDark: boolean;
}

const THEMES: Record<ThemeName, ThemeConfig> = {
  forest: {
    bgGradient: (ctx, w, h) => {
      const grad = ctx.createRadialGradient(w / 2, h / 2, 100, w / 2, h / 2, w * 0.8);
      grad.addColorStop(0, "#04564c");
      grad.addColorStop(1, "#011e1b");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    },
    textColor: "#ffffff",
    subTextColor: "#a5d8c3",
    quoteMarkColor: "#ffd166",
    accentLineColor: "#04564c",
    isDark: true,
  },
  slate: {
    bgGradient: (ctx, w, h) => {
      const grad = ctx.createRadialGradient(w / 2, h / 2, 100, w / 2, h / 2, w * 0.8);
      grad.addColorStop(0, "#1f302d");
      grad.addColorStop(1, "#091211");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    },
    textColor: "#ffffff",
    subTextColor: "#a1a1aa",
    quoteMarkColor: "#5cc882",
    accentLineColor: "#5cc882",
    isDark: true,
  },
  cream: {
    bgGradient: (ctx, w, h) => {
      ctx.fillStyle = "#fbfcf7";
      ctx.fillRect(0, 0, w, h);
      
      // Elegant thin inner border
      ctx.strokeStyle = "rgba(4,86,76,0.12)";
      ctx.lineWidth = 16;
      ctx.strokeRect(32, 32, w - 64, h - 64);
    },
    textColor: "#011e1b",
    subTextColor: "#04564c",
    quoteMarkColor: "#e65c00",
    accentLineColor: "#e65c00",
    isDark: false,
  },
  sunset: {
    bgGradient: (ctx, w, h) => {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "#044b41");
      grad.addColorStop(1, "#d95400");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    },
    textColor: "#ffffff",
    subTextColor: "#ffdcd0",
    quoteMarkColor: "#ffffff",
    accentLineColor: "#ffffff",
    isDark: true,
  },
};

interface IntlWithSegmenter {
  Segmenter: new (locale: string, options?: { granularity: "word" | "grapheme" | "sentence" }) => {
    segment: (text: string) => Iterable<{ segment: string }>;
  };
}

// Thai Segmenter-based text wrapping for HTML5 Canvas
function wrapThaiText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  if (typeof window !== "undefined" && "Intl" in window && "Segmenter" in (Intl as unknown as Record<string, unknown>)) {
    try {
      const segmenter = new (Intl as unknown as IntlWithSegmenter).Segmenter("th", { granularity: "word" });
      const segments = segmenter.segment(text);
      const lines: string[] = [];
      let currentLine = "";

      for (const segment of segments) {
        const word = segment.segment;
        if (word === "\n") {
          lines.push(currentLine);
          currentLine = "";
          continue;
        }

        const testLine = currentLine + word;
        const metrics = ctx.measureText(testLine);

        if (metrics.width > maxWidth) {
          if (currentLine !== "") {
            lines.push(currentLine);
            currentLine = word;
          } else {
            lines.push(word);
            currentLine = "";
          }
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) {
        lines.push(currentLine);
      }
      return lines.map(line => line.trim());
    } catch {
      // Fallback below
    }
  }

  // Fallback wrapping by char/word split
  const chars = text.split("");
  const lines: string[] = [];
  let currentLine = "";

  for (let i = 0; i < chars.length; i++) {
    const testLine = currentLine + chars[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && i > 0) {
      lines.push(currentLine);
      currentLine = chars[i];
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  return lines;
}

export default function QuoteShareModal({
  text,
  isOpen,
  onClose,
  attribution,
}: QuoteShareModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>("forest");
  const [fontSize, setFontSize] = useState<number>(68);
  const [showBranding, setShowBranding] = useState<boolean>(true);
  const [showAttribution, setShowAttribution] = useState<boolean>(true);
  const [triggerRedraw, setTriggerRedraw] = useState<number>(0);
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null);

  // Pre-load the real Prachatham logo SVG
  useEffect(() => {
    if (typeof window !== "undefined") {
      const img = new Image();
      img.src = "/new-logo-2.svg";
      img.onload = () => {
        setLogoImage(img);
        setTriggerRedraw(prev => prev + 1);
      };
    }
  }, []);

  // Redraw when fonts load completely
  useEffect(() => {
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        setTriggerRedraw(prev => prev + 1);
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 1080;
    const height = 1350;
    canvas.width = width;
    canvas.height = height;

    const theme = THEMES[selectedTheme];

    // 1. Draw Background
    theme.bgGradient(ctx, width, height);

    // 2. Draw Decorative Quote Marks
    ctx.font = `italic bold 280px "DB Helvethaica X", sans-serif`;
    ctx.fillStyle = theme.quoteMarkColor;
    ctx.globalAlpha = theme.isDark ? 0.15 : 0.08;
    ctx.fillText("“", 90, 240);
    ctx.globalAlpha = 1.0;

    // 3. Draw Quote Text
    ctx.fillStyle = theme.textColor;
    ctx.font = `normal 500 ${fontSize}px "DB Helvethaica X", sans-serif`;
    ctx.textBaseline = "top";
    ctx.textAlign = "left";

    const contentWidth = width - 200; // Padding: 100px left & right
    const wrappedLines = wrapThaiText(ctx, text, contentWidth);
    const lineHeight = fontSize * 1.28;
    const textBlockHeight = wrappedLines.length * lineHeight;
    
    // Position quote in center/upper portion
    const quoteStartY = 360;
    
    wrappedLines.forEach((line, idx) => {
      ctx.fillText(line, 100, quoteStartY + idx * lineHeight);
    });

    let lastDrawY = quoteStartY + textBlockHeight + 40;

    // 4. Draw Accent Separator Line
    ctx.strokeStyle = theme.quoteMarkColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(100, lastDrawY);
    ctx.lineTo(240, lastDrawY);
    ctx.stroke();
    lastDrawY += 50;

    // 5. Draw Attribution
    if (showAttribution) {
      ctx.fillStyle = theme.subTextColor;
      
      // Author / Title info
      const authorText = attribution.author ? `โดย ${attribution.author}` : "ประชาธรรม";
      ctx.font = `bold 38px "DB Helvethaica X", sans-serif`;
      ctx.fillText(authorText, 100, lastDrawY);
      lastDrawY += 48;

      ctx.font = `italic 32px "DB Helvethaica X", sans-serif`;
      // Limit article title length on card to 100 characters before wrapping
      const displayTitle = attribution.title.length > 100 
        ? `${attribution.title.substring(0, 100)}...` 
        : attribution.title;
      const fullTitleText = `จาก: ${displayTitle}`;
      const wrappedTitleLines = wrapThaiText(ctx, fullTitleText, contentWidth);
      
      wrappedTitleLines.forEach((line) => {
        ctx.fillText(line, 100, lastDrawY);
        lastDrawY += 42;
      });
    }

    // 6. Draw Branding Watermark at the Bottom
    if (showBranding && logoImage) {
      const bottomY = height - 100;
      
      // Divider
      ctx.strokeStyle = theme.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(100, bottomY - 40);
      ctx.lineTo(width - 100, bottomY - 40);
      ctx.stroke();

      // logo-2 aspect ratio is 257.13 / 37.87 = 6.79
      const logoWidth = 258;
      const logoHeight = 38;
      const logoX = 100;
      const logoY = bottomY - 10;

      if (theme.isDark) {
        ctx.filter = "brightness(0) invert(1)";
      }
      ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight);
      if (theme.isDark) {
        ctx.filter = "none";
      }
    }

  }, [isOpen, text, selectedTheme, fontSize, showAttribution, showBranding, attribution, triggerRedraw, logoImage]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `prachatham-quote-${Date.now()}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[2100] flex items-center justify-center p-3 sm:p-4 backdrop-blur-md bg-black/60 overflow-y-auto animate-fade-in">
      <div className="relative bg-[#fbfcf7] dark:bg-forest-950 border border-black/10 dark:border-forest-800/80 shadow-2xl rounded-3xl w-full max-w-4xl max-h-[95vh] md:max-h-none overflow-hidden flex flex-col md:grid md:grid-cols-[1.1fr_0.9fr]">
        
        {/* Close Button: Absolute positioned for easy touch access on all screens */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 z-[2200] p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full text-gray-500 dark:text-gray-400 cursor-pointer bg-white/85 dark:bg-forest-900/85 backdrop-blur-sm border border-black/10 dark:border-forest-800/40 shadow-sm transition-all active:scale-95"
          aria-label="ปิดกล่อง"
        >
          <FaTimes size={16} />
        </button>

        {/* Left Column: Live Canvas Preview */}
        <div className="p-4 md:p-6 bg-gray-100/50 dark:bg-forest-900/40 flex items-center justify-center border-b md:border-b-0 md:border-r border-black/5 dark:border-forest-800/60 overflow-hidden">
          <div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] aspect-[4/5] relative rounded-2xl overflow-hidden shadow-xl border border-black/10 dark:border-forest-800 bg-white">
            <canvas 
              ref={canvasRef} 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right Column: Settings & Actions */}
        <div className="p-4 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[80vh]">
          {/* Header */}
          <div className="flex justify-between items-start mb-4 md:mb-6 pr-8 md:pr-0">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">การ์ดโควทคำคม</h3>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">ตกแต่งและดาวน์โหลดคำคมเพื่อแชร์ในโซเชียลมีเดีย</p>
            </div>
          </div>

          {/* Configuration Options */}
          <div className="flex flex-col gap-4 md:gap-6 flex-grow">
            
            {/* Theme selection */}
            <div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-2">ธีมภาพพื้นหลัง</span>
              <div className="grid grid-cols-4 gap-2">
                {(Object.keys(THEMES) as ThemeName[]).map((themeName) => (
                  <button
                    key={themeName}
                    onClick={() => setSelectedTheme(themeName)}
                    className={`h-9 md:h-11 rounded-xl flex items-center justify-center capitalize font-semibold border-2 transition-all cursor-pointer text-xs
                      ${themeName === "forest" ? "bg-[#04564c] text-white" : ""}
                      ${themeName === "slate" ? "bg-[#1f302d] text-white" : ""}
                      ${themeName === "cream" ? "bg-[#fbfcf7] border-black/10 text-[#011e1b]" : ""}
                      ${themeName === "sunset" ? "bg-gradient-to-br from-[#044b41] to-[#d95400] text-white" : ""}
                      ${selectedTheme === themeName 
                        ? "border-brand-500 scale-[1.04] shadow-md" 
                        : "border-transparent hover:scale-[1.02]"
                      }
                    `}
                  >
                    {themeName === "forest" && "ไพร"}
                    {themeName === "slate" && "หินดิน"}
                    {themeName === "cream" && "นมครีม"}
                    {themeName === "sunset" && "สุริยา"}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Sizing */}
            <div>
              <div className="flex justify-between text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                <span className="flex items-center gap-1.5"><FaFont size={10} /> ขนาดตัวหนังสือ</span>
                <span className="text-brand-600 dark:text-brand-400">{fontSize}px</span>
              </div>
              <input
                type="range"
                min="48"
                max="88"
                step="4"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-brand-600 h-1.5 bg-gray-200 dark:bg-forest-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Layout Toggles */}
            <div className="flex flex-col gap-2.5 pt-1">
              <label className="flex items-center justify-between p-2.5 md:p-3 rounded-xl border border-black/5 dark:border-forest-800 cursor-pointer select-none">
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-gray-150">เครดิตบทความ</span>
                  <span className="text-[10px] text-gray-400">แสดงชื่อบทความและผู้แต่ง</span>
                </div>
                <input
                  type="checkbox"
                  checked={showAttribution}
                  onChange={(e) => setShowAttribution(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-gray-300 dark:border-forest-800 accent-brand-500"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 md:p-3 rounded-xl border border-black/5 dark:border-forest-800 cursor-pointer select-none">
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-gray-150">ลายน้ำสื่อประชาธรรม</span>
                  <span className="text-[10px] text-gray-400">แสดงตราสัญลักษณ์ที่ขอบล่าง</span>
                </div>
                <input
                  type="checkbox"
                  checked={showBranding}
                  onChange={(e) => setShowBranding(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-gray-300 dark:border-forest-800 accent-brand-500"
                />
              </label>
            </div>

          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 mt-4 md:mt-8 border-t border-black/5 dark:border-forest-800/80 pt-4 md:pt-5">
            <button
              onClick={onClose}
              className="flex-1 btn-secondary text-center py-2 md:py-2.5 rounded-xl transition-all cursor-pointer font-medium text-sm md:text-base"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleDownload}
              className="flex-[1.5] btn-primary flex items-center justify-center gap-2 py-2 md:py-2.5 rounded-xl transition-all cursor-pointer shadow-lg hover:shadow-brand-glow font-medium text-sm md:text-base"
            >
              <FaDownload size={13} />
              ดาวน์โหลดภาพ
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
