"use client";

import React from "react";
import theme from "../theme";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";

type ThemeProviderWrapperProps = {
  children: React.ReactNode;
};

const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
  return (
    <CssVarsProvider theme={theme}>
      <Paper square>{children}</Paper>
    </CssVarsProvider>
  );
};

export default ThemeProviderWrapper;
