"use client";

import React from "react";
import { CssVarsProvider } from "@mui/material/styles";
import theme from "@/theme";
import { Box, CssBaseline, Paper } from "@mui/material";

type ThemeProviderWrapperProps = {
  children: React.ReactNode;
};

const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Paper square sx={{ backgroundColor: "surface" }}>
        {children}
      </Paper>
    </CssVarsProvider>
  );
};

export default ThemeProviderWrapper;
