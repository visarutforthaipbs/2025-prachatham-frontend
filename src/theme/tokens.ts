/**
 * Prachatham Design System — Design Tokens
 * ==========================================
 * Single source of truth for all visual design decisions.
 *
 * Brand colors extracted from existing codebase:
 *   Primary (prachatham green): #059669 / #10b981 / #047857
 *   Font: DB Helvethaica X
 */

// ─── Color Tokens ────────────────────────────────────────────────────────────

export const colors = {
  /** Core brand palette — the identity green */
  brand: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981", // primary accent
    600: "#059669", // primary brand color
    700: "#047857", // headings / emphasis
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22",
  },
  /** Extended green for environment / nature sections */
  nature: {
    50: "#f0fdf9",
    100: "#ccfbef",
    200: "#99f6e0",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
  },
  /** Neutral surface & text palette */
  surface: {
    white: "#ffffff",
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
  /** Semantic colours */
  semantic: {
    success: "#059669",
    warning: "#d97706",
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
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 1.8,
  },
  letterSpacing: {
    tight: "-0.02em",
    normal: "0em",
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
  brandGlow: "0 8px 30px -4px rgba(5, 150, 105, 0.35)",
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
