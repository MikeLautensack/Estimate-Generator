"use client";

import React from "react";
import theme from "../theme";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { AppBar, Container, Paper } from "@mui/material";

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <CssVarsProvider theme={theme}>
      <Paper square>{children}</Paper>
    </CssVarsProvider>
  );
};

export default ThemeProvider;
