"use client";

import { Roboto } from "next/font/google";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = extendTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.vars.palette.primary.main,
          // When the mode switches to dark, the attribute selector is attached to
          // the <html> tag by default.
          '[data-mui-color-scheme="dark"] &': {
            color: "#fff",
          },
        }),
      },
    },
  },
});

export default theme;
