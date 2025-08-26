"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "@/theme/client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme} resetCSS={true}>
        {children}
      </ChakraProvider>
    </>
  );
}
