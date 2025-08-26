"use client";

import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
  disableTransitionOnChange: true,
};

const colors = {
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
  prachatham: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#059669",
    600: "#10b981",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },
};

const fonts = {
  heading: `'DB Helvethaica X', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  body: `'DB Helvethaica X', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
};

const components = {
  Heading: {
    baseStyle: {
      fontWeight: "500",
    },
    variants: {
      section: {
        fontSize: { base: "2xl", md: "3xl", lg: "4xl" },
        fontWeight: "500",
        color: "gray.800",
        mb: 4,
      },
      page: {
        fontSize: { base: "3xl", md: "4xl", lg: "5xl" },
        fontWeight: "bold",
        color: "gray.900",
        mb: 6,
      },
    },
  },
  Text: {
    baseStyle: {
      lineHeight: "1.6",
    },
    variants: {
      body: {
        fontSize: { base: "md", md: "lg" },
        color: "gray.600",
        lineHeight: "1.7",
      },
      caption: {
        fontSize: "sm",
        color: "gray.500",
        fontStyle: "italic",
      },
    },
  },
  Button: {
    baseStyle: {
      fontWeight: "500",
      borderRadius: "md",
    },
    variants: {
      primary: {
        bg: "prachatham.600",
        color: "white",
        _hover: {
          bg: "prachatham.700",
        },
      },
      secondary: {
        bg: "gray.100",
        color: "gray.700",
        _hover: {
          bg: "gray.200",
        },
      },
    },
    defaultProps: {
      variant: "primary",
    },
  },
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  components,
  styles: {
    global: {
      body: {
        fontFamily: "body",
        color: "gray.700",
        bg: "gray.50",
      },
    },
  },
});

export default theme;
