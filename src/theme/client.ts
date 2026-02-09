"use client";

import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import {
  colors,
  typography,
  shadows,
  radii,
  layout,
  zIndices,
} from "./tokens";

// ─── Config ──────────────────────────────────────────────────────────────────

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
  disableTransitionOnChange: true,
};

// ─── Chakra Colour Palette (mapped from tokens) ─────────────────────────────

const chakraColors = {
  prachatham: {
    50: colors.brand[50],
    100: colors.brand[100],
    200: colors.brand[200],
    300: colors.brand[300],
    400: colors.brand[400],
    500: colors.brand[500],
    600: colors.brand[600],
    700: colors.brand[700],
    800: colors.brand[800],
    900: colors.brand[900],
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  envGreen: {
    50: colors.nature[50],
    100: colors.nature[100],
    200: colors.nature[200],
    300: colors.nature[300],
    400: colors.nature[400],
    500: colors.nature[500],
    600: colors.nature[600],
    700: colors.nature[700],
    800: colors.nature[800],
    900: colors.nature[900],
  },
};

// ─── Fonts ───────────────────────────────────────────────────────────────────

const fonts = {
  heading: typography.fontFamily.heading,
  body: typography.fontFamily.body,
  mono: typography.fontFamily.mono,
};

// ─── Component Overrides ─────────────────────────────────────────────────────

const components = {
  // ── Heading ──────────────────────────────────────────────────────────────
  Heading: {
    baseStyle: {
      fontWeight: "600",
      letterSpacing: typography.letterSpacing.tight,
      lineHeight: typography.lineHeight.tight,
    },
    variants: {
      hero: {
        fontSize: { base: "3xl", md: "5xl", lg: "6xl" },
        fontWeight: "bold",
        lineHeight: 1.1,
      },
      page: {
        fontSize: { base: "2xl", md: "3xl", lg: "4xl" },
        fontWeight: "bold",
        color: "gray.900",
      },
      section: {
        fontSize: { base: "xl", md: "2xl", lg: "3xl" },
        fontWeight: "600",
        color: "gray.800",
      },
      card: {
        fontSize: { base: "md", md: "lg" },
        fontWeight: "600",
        lineHeight: typography.lineHeight.snug,
        color: "gray.800",
      },
    },
  },

  // ── Text ─────────────────────────────────────────────────────────────────
  Text: {
    baseStyle: {
      lineHeight: typography.lineHeight.relaxed,
    },
    variants: {
      lead: {
        fontSize: { base: "lg", md: "xl" },
        color: "gray.600",
        lineHeight: typography.lineHeight.loose,
      },
      body: {
        fontSize: { base: "md", md: "lg" },
        color: "gray.600",
        lineHeight: typography.lineHeight.relaxed,
      },
      caption: {
        fontSize: "sm",
        color: "gray.500",
      },
      overline: {
        fontSize: "xs",
        fontWeight: "600",
        letterSpacing: typography.letterSpacing.wide,
        textTransform: "uppercase" as const,
        color: "prachatham.600",
      },
    },
  },

  // ── Button ───────────────────────────────────────────────────────────────
  Button: {
    baseStyle: {
      fontWeight: "500",
      borderRadius: radii.lg,
      transition: "all 0.2s ease",
    },
    sizes: {
      sm: { fontSize: "sm", px: 4, py: 2, h: "auto", minH: "2rem" },
      md: { fontSize: "md", px: 6, py: 2.5, h: "auto", minH: "2.5rem" },
      lg: { fontSize: "lg", px: 8, py: 3, h: "auto", minH: "3rem" },
      xl: { fontSize: "lg", px: 10, py: 4, h: "auto", minH: "3.5rem" },
    },
    variants: {
      primary: {
        bg: "prachatham.600",
        color: "white",
        _hover: {
          bg: "prachatham.700",
          transform: "translateY(-1px)",
          boxShadow: shadows.brandGlow,
        },
        _active: {
          bg: "prachatham.800",
          transform: "translateY(0)",
        },
      },
      secondary: {
        bg: "white",
        color: "prachatham.700",
        border: "2px solid",
        borderColor: "prachatham.600",
        _hover: {
          bg: "prachatham.50",
          transform: "translateY(-1px)",
          boxShadow: shadows.md,
        },
        _active: {
          bg: "prachatham.100",
        },
      },
      ghost: {
        color: "gray.600",
        _hover: {
          bg: "gray.100",
          color: "prachatham.700",
        },
      },
      link: {
        color: "prachatham.600",
        fontWeight: "500",
        _hover: {
          color: "prachatham.700",
          textDecoration: "none",
        },
      },
    },
    defaultProps: {
      variant: "primary",
    },
  },

  // ── Card ─────────────────────────────────────────────────────────────────
  Card: {
    baseStyle: {
      container: {
        borderRadius: radii.xl,
        overflow: "hidden",
        bg: "white",
        boxShadow: shadows.sm,
        border: "1px solid",
        borderColor: "gray.100",
        transition: "all 0.3s ease",
        _hover: {
          boxShadow: shadows.cardHover,
          transform: "translateY(-4px)",
          borderColor: "prachatham.100",
        },
      },
    },
  },

  // ── Badge ────────────────────────────────────────────────────────────────
  Badge: {
    baseStyle: {
      fontWeight: "500",
      borderRadius: radii.full,
      px: 3,
      py: 1,
      fontSize: "xs",
      letterSpacing: typography.letterSpacing.wide,
    },
    variants: {
      brand: {
        bg: "prachatham.50",
        color: "prachatham.700",
        border: "1px solid",
        borderColor: "prachatham.200",
      },
      nature: {
        bg: "envGreen.50",
        color: "envGreen.700",
        border: "1px solid",
        borderColor: "envGreen.200",
      },
    },
  },

  // ── Input ────────────────────────────────────────────────────────────────
  Input: {
    variants: {
      outline: {
        field: {
          borderRadius: radii.lg,
          borderColor: "gray.200",
          _hover: { borderColor: "prachatham.300" },
          _focus: {
            borderColor: "prachatham.500",
            boxShadow: `0 0 0 1px ${colors.brand[500]}`,
          },
        },
      },
    },
  },

  // ── Container ────────────────────────────────────────────────────────────
  Container: {
    baseStyle: {
      maxW: layout.maxWidth.content,
      px: { base: 4, md: 6, lg: 8 },
    },
  },

  // ── Divider ──────────────────────────────────────────────────────────────
  Divider: {
    baseStyle: {
      borderColor: "gray.200",
    },
  },

  // ── Link ─────────────────────────────────────────────────────────────────
  Link: {
    baseStyle: {
      color: "prachatham.600",
      _hover: {
        color: "prachatham.700",
        textDecoration: "none",
      },
      transition: "color 0.15s ease",
    },
  },

  // ── Tooltip ──────────────────────────────────────────────────────────────
  Tooltip: {
    baseStyle: {
      borderRadius: radii.md,
      fontSize: "sm",
      px: 3,
      py: 1.5,
    },
  },
};

// ─── Global Styles ───────────────────────────────────────────────────────────

const styles = {
  global: {
    body: {
      fontFamily: "body",
      color: "gray.700",
      bg: "gray.50",
      lineHeight: typography.lineHeight.relaxed,
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    "::selection": {
      bg: "prachatham.100",
      color: "prachatham.900",
    },
  },
};

// ─── Theme Export ────────────────────────────────────────────────────────────

const theme = extendTheme({
  config,
  colors: chakraColors,
  fonts,
  components,
  styles,
  shadows,
  radii,
  zIndices,
});

export default theme;
