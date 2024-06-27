"use client";

import React from "react";
import { CssVarsProvider } from "@mui/material/styles";
import theme from "@/theme";
import { CssBaseline, Paper } from "@mui/material";

type ThemeProviderWrapperProps = {
  children: React.ReactNode;
};

const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Paper square>{children}</Paper>
    </CssVarsProvider>
  );
};

export default ThemeProviderWrapper;
