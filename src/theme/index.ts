import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
  disableTransitionOnChange: false,
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
  Card: {
    baseStyle: {
      container: {
        borderRadius: "lg",
        overflow: "hidden",
        boxShadow: "sm",
        _hover: {
          boxShadow: "md",
          transform: "translateY(-2px)",
          transition: "all 0.2s ease-in-out",
        },
      },
    },
  },
  Button: {
    baseStyle: {
      fontWeight: "medium",
      borderRadius: "md",
    },
    variants: {
      solid: {
        bg: "prachatham.500",
        color: "white",
        _hover: {
          bg: "prachatham.600",
        },
      },
      outline: {
        borderColor: "prachatham.500",
        color: "prachatham.500",
        _hover: {
          bg: "prachatham.50",
        },
      },
    },
  },
  Tag: {
    variants: {
      solid: {
        container: {
          bg: "prachatham.100",
          color: "prachatham.800",
          _hover: {
            bg: "prachatham.200",
          },
        },
      },
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
        bg: "gray.50",
        color: "gray.800",
        fontFamily:
          "'DB Helvethaica X', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
      },
    },
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
});

export default theme;
