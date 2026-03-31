/**
 * Prachatham Design System — Design Tokens
 * ==========================================
 * Single source of truth for all visual design decisions.
 *
 * Brand colors (2025 rebrand):
 *   Primary (deep teal): #044B41
 *   Accent (warm orange): #C46211
 *   Font: DB Helvethaica X
 */

// ─── Color Tokens ────────────────────────────────────────────────────────────

export const colors = {
  /** Core brand palette — deep teal identity */
  brand: {
    50: "#D4FDD5",   // light mint
    100: "#C3F38D",  // lime green
    200: "#8AE0A0",  // soft green
    300: "#5CC882",  // medium green
    400: "#38A96A",  // green
    500: "#038B71",  // lighter teal
    600: "#044B41",  // primary brand color
    700: "#033D35",  // headings / emphasis
    800: "#022F29",  // dark teal
    900: "#01211D",  // deepest teal
    950: "#011512",  // near-black teal
  },
  /** Accent palette — warm orange for CTAs */
  accent: {
    50: "#FEF3E2",
    100: "#FDE2BF",
    200: "#F9C17A",
    300: "#F5A043",
    400: "#D87A1A",
    500: "#C46211",  // primary accent
    600: "#A8530E",
    700: "#8C440B",
    800: "#703608",
    900: "#542806",
  },
  /** Extended green for environment / nature sections */
  nature: {
    50: "#E8FBF5",
    100: "#C0F5E3",
    200: "#8EEBC7",
    300: "#5EDBA8",
    400: "#38C48D",
    500: "#038B71",  // midpoint — matches brand.500
    600: "#027560",
    700: "#025F4F",
    800: "#01493E",
    900: "#01332C",
  },
  /** Neutral surface & text palette */
  surface: {
    white: "#ffffff",
    50: "#F0F1E9",   // cream background
    100: "#E5E6DE",
    200: "#D0D1C8",
    300: "#B5B6AD",
    400: "#8A8B82",
    500: "#64655E",
    600: "#494A44",
    700: "#33342F",
    800: "#1E1F1B",
    900: "#0D110F",  // near-black
  },
  /** Semantic colours */
  semantic: {
    success: "#038B71",
    warning: "#C46211",
    error: "#dc2626",
    info: "#0284c7",
  },
};

// ─── Typography Tokens ───────────────────────────────────────────────────────

export const typography = {
  fontFamily: {
    heading: `'DB Helvethaica X', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    body: `'DB Helvethaica X', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    mono: `'SF Mono', SFMono-Regular, ui-monospace, 'DejaVu Sans Mono', Menlo, Consolas, monospace`,
  },
  /** Modular type scale — fluid, responsive */
  fontSize: {
    xs: "0.75rem",    // 12px
    sm: "0.875rem",   // 14px
    base: "1rem",     // 16px
    lg: "1.125rem",   // 18px
    xl: "1.25rem",    // 20px
    "2xl": "1.5rem",  // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem",    // 48px
    "6xl": "3.75rem", // 60px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    snug: 1.45,
    normal: 1.6,
    relaxed: 1.8,
    loose: 2.0,
  },
  letterSpacing: {
    tight: "0em",
    normal: "0.01em",
    wide: "0.025em",
  },
};

// ─── Spacing Tokens ──────────────────────────────────────────────────────────

export const spacing = {
  px: "1px",
  0: "0",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  section: {
    sm: "3rem",    // 48px — small section padding
    md: "5rem",    // 80px — standard section
    lg: "7rem",    // 112px — hero-level
  },
};

// ─── Border & Radius Tokens ──────────────────────────────────────────────────

export const radii = {
  none: "0",
  sm: "0.25rem",
  base: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
};

// ─── Shadow Tokens ───────────────────────────────────────────────────────────

export const shadows = {
  xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  /** Coloured glow for CTA buttons */
  brandGlow: "0 8px 30px -4px rgba(196, 98, 17, 0.35)",
  /** Card hover lift */
  cardHover: "0 20px 40px -8px rgba(0, 0, 0, 0.12)",
  /** Inner shadow for inputs */
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)",
};

// ─── Transition Tokens ───────────────────────────────────────────────────────

export const transitions = {
  fast: "all 0.15s ease",
  normal: "all 0.2s ease",
  slow: "all 0.3s ease",
  spring: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
};

// ─── Layout Tokens ───────────────────────────────────────────────────────────

export const layout = {
  maxWidth: {
    content: "72rem",   // 1152px — main content
    narrow: "48rem",    // 768px — article / form
    wide: "80rem",      // 1280px — full-width sections
  },
  navHeight: "4rem",    // 64px sticky nav
  borderWidth: {
    thin: "1px",
    medium: "2px",
    thick: "3px",
  },
};

// ─── Z-Index Scale ───────────────────────────────────────────────────────────

export const zIndices = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  popover: 500,
  toast: 600,
  tooltip: 700,
};
