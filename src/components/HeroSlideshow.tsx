"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa";

export interface HeroSlideView {
  src: string;
  alt: string;
  /** Decoded post title shown as the photo credit line; omitted for the house photo. */
  title?: string;
  href?: string;
}

/* Owner-requested exception to "no looping animation" (design_system.md §5):
   a slow crossfade that WCAG 2.2.2 keeps under the reader's control —
   visible pause button, pauses on hover / keyboard focus / hidden tab,
   and never auto-advances under prefers-reduced-motion. */
const INTERVAL_MS = 6000;

export default function HeroSlideshow({ slides }: { slides: HeroSlideView[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  // Only mount photos the reader has reached (plus the next one, so it is
  // decoded before it fades in) — phones don't download all six up front.
  const [loadedUpTo, setLoadedUpTo] = useState(Math.min(1, slides.length - 1));
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const count = slides.length;
  const autoplay = count > 1 && !reduceMotion;
  const running = autoplay && !userPaused && !hovered && !focused && !tabHidden;

  const goTo = useCallback(
    (i: number) => {
      const next = ((i % count) + count) % count;
      setIndex(next);
      setLoadedUpTo((u) => Math.max(u, Math.min(next + 1, count - 1)));
    },
    [count]
  );

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => goTo(index + 1), INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [running, index, goTo]);

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const current = slides[index];

  return (
    /* No z-index here on purpose: the photos (z auto) sit under the hero
       scrim (z-1) while the control bar (z-3) sits above the hero copy. */
    <div
      className="absolute inset-0"
      role="region"
      aria-roledescription="carousel"
      aria-label="ภาพจากงานของประชาธรรม"
    >
      {/* Images are direct children (hero > div > img) — scripts/hig_check.py
          recognises that shape as "text sits on a photo" for contrast checks. */}
      {slides.map((s, i) =>
        i <= loadedUpTo ? (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            aria-hidden={i !== index}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority={i === 0}
            className={`${reduceMotion ? "" : "transition-opacity duration-1000 ease-in-out"} ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null
      )}

      {count > 1 && (
        <>
          {/* Bottom scrim so the credit line and controls stay ≥ 4.5:1 on any photo */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-48 md:h-40 z-[2] pointer-events-none"
            style={{ background: "linear-gradient(0deg, rgba(1,33,29,0.85) 0%, rgba(1,33,29,0) 100%)" }}
          />
          <div
            className="absolute inset-x-0 bottom-0 z-[3]"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
            }}
          >
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-1 md:pb-5 flex flex-col md:flex-row md:items-center md:justify-between md:gap-3">
              <p className="min-w-0 w-full md:w-auto text-sm md:text-base text-white leading-relaxed" aria-live={running ? "off" : "polite"}>
                {current.href && current.title ? (
                  <Link
                    href={current.href}
                    className="inline-flex items-center min-h-[44px] max-w-full underline-offset-4 hover:underline focus-visible:underline"
                  >
                    <span className="line-clamp-1 break-words">
                      <span className="font-bold">ภาพจากเรื่อง: </span>
                      {current.title}
                    </span>
                  </Link>
                ) : (
                  <span className="sr-only">ภาพที่ {index + 1} จาก {count}</span>
                )}
              </p>

              <div className="flex items-center justify-between md:justify-end shrink-0 -mx-2 md:mx-0">
                <div className="flex items-center" role="group" aria-label="เลือกภาพ">
                  {slides.map((s, i) => (
                    <button
                      key={s.src}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`ภาพที่ ${i + 1} จาก ${count}`}
                      aria-current={i === index ? "true" : undefined}
                      className="group inline-flex items-center justify-center min-w-[44px] min-h-[44px]"
                    >
                      <span
                        className={`block h-2 rounded-full transition-all duration-200 ${
                          /* dark:* repeats the colour: globals.css's dark-mode net remaps bg-white */
                          i === index
                            ? "w-6 bg-white dark:bg-white"
                            : "w-2 bg-white/60 dark:bg-white/60 group-hover:bg-white/90 dark:group-hover:bg-white/90"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {autoplay && (
                  <button
                    type="button"
                    onClick={() => setUserPaused((p) => !p)}
                    aria-label={userPaused ? "เล่นภาพสไลด์" : "หยุดภาพสไลด์"}
                    className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full text-white hover:bg-white/15 transition-colors"
                  >
                    {userPaused ? (
                      <FaPlay className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <FaPause className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
