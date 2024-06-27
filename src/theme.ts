import { extendTheme } from "@mui/material/styles";

// `extendTheme` is a new API
const theme = extendTheme({
  colorSchemes: {
    light: {
      // palette for light mode
      palette: {},
    },
    dark: {
      // palette for dark mode
      palette: {},
    },
  },
});
export default theme;
