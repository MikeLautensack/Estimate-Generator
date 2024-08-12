"use client";

import React from "react";
import theme from "@/theme";
import { Box, CssBaseline, CssVarsProvider, Paper } from "@mui/material";

type ThemeProviderWrapperProps = {
  children: React.ReactNode;
};

const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Box component="div" sx={{ backgroundColor: "bg" }}>
        {children}
      </Box>
    </CssVarsProvider>
  );
};

export default ThemeProviderWrapper;
