"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react";
import { emotionCache } from "./emotionCache";

export default function ChakraProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  );
}
