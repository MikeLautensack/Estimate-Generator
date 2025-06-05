"use client";

import React from "react";
import theme from "@/theme";
import { Box, CssBaseline, CssVarsProvider } from "@mui/material";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderWrapperProps = {
  children: React.ReactNode;
};

const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      value={{
        light: "light",
        dark: "dark",
        system: "system",
      }}
    >
      <CssVarsProvider theme={theme} defaultMode="system">
        <CssBaseline />
        <Box component="div" sx={{ backgroundColor: "bg" }}>
          {children}
        </Box>
      </CssVarsProvider>
    </NextThemesProvider>
  );
};

export default ThemeProviderWrapper;
