"use client";
import React from "react";

import RTKProvider from "./rtk-providers";
import { ThemeProvider } from "./nexttheme-provider";
import { SessionProvider } from "./session-providers";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <RTKProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </RTKProvider>
  );
}
