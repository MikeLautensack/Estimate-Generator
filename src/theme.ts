import { extendTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    onPrimary: string;
    surfaceTint: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;
    onError: string;
    errorContainer: string;
    onErrorContainer: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    outline: string;
    outlineVariant: string;
    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;
    primaryFixed: string;
    onPrimaryFixed: string;
    primaryFixedDim: string;
    onPrimaryFixedVariant: string;
    secondaryFixed: string;
    onSecondaryFixed: string;
    secondaryFixedDim: string;
    onSecondaryFixedVariant: string;
    tertiaryFixed: string;
    onTertiaryFixed: string;
    tertiaryFixedDim: string;
    onTertiaryFixedVariant: string;
    surfaceDim: string;
    surfaceBright: string;
    surfaceContainerLowest: string;
    surfaceContainerLow: string;
    surfaceContainer: string;
    surfaceContainerHigh: string;
    surfaceContainerHighest: string;
    cash: string;
  }
  interface Palette {
    onPrimary: string;
    surfaceTint: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;
    onError: string;
    errorContainer: string;
    onErrorContainer: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    outline: string;
    outlineVariant: string;
    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;
    primaryFixed: string;
    onPrimaryFixed: string;
    primaryFixedDim: string;
    onPrimaryFixedVariant: string;
    secondaryFixed: string;
    onSecondaryFixed: string;
    secondaryFixedDim: string;
    onSecondaryFixedVariant: string;
    tertiaryFixed: string;
    onTertiaryFixed: string;
    tertiaryFixedDim: string;
    onTertiaryFixedVariant: string;
    surfaceDim: string;
    surfaceBright: string;
    surfaceContainerLowest: string;
    surfaceContainerLow: string;
    surfaceContainer: string;
    surfaceContainerHigh: string;
    surfaceContainerHighest: string;
    cash: string;
  }
}

// `extendTheme` is a new API
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#465D91",
        },
        surfaceTint: "#465D91",
        onPrimary: "#FFFFFF",
        primaryContainer: "#D9E2FF",
        onPrimaryContainer: "#001944",
        secondary: {
          main: "#575E71",
        },
        onSecondary: "#FFFFFF",
        secondaryContainer: "#DCE2F9",
        onSecondaryContainer: "#141B2C",
        tertiary: "#725572",
        onTertiary: "#FFFFFF",
        tertiaryContainer: "#FDD7FA",
        onTertiaryContainer: "#2A132C",
        error: {
          main: "##E6002A",
        },
        onError: "#FFFFFF",
        errorContainer: "#FFDAD6",
        onErrorContainer: "#410002",
        onBackground: "#1A1B20",
        surface: "#FAF8FF",
        onSurface: "#1A1B20",
        surfaceVariant: "#E1E2EC",
        onSurfaceVariant: "#44464F",
        outline: "#757780",
        outlineVariant: "#C5C6D0",
        inverseSurface: "#2F3036",
        inverseOnSurface: "#F1F0F7",
        inversePrimary: "#AFC6FF",
        primaryFixed: "#D9E2FF",
        onPrimaryFixed: "#001944",
        primaryFixedDim: "#AFC6FF",
        onPrimaryFixedVariant: "#2E4578",
        secondaryFixed: "#DCE2F9",
        onSecondaryFixed: "#141B2C",
        secondaryFixedDim: "#BFC6DC",
        onSecondaryFixedVariant: "#404659",
        tertiaryFixed: "#FDD7FA",
        onTertiaryFixed: "#2A132C",
        tertiaryFixedDim: "#DFBBDE",
        onTertiaryFixedVariant: "#593D5A",
        surfaceDim: "#DAD9E0",
        surfaceBright: "#FAF8FF",
        surfaceContainerLowest: "#FFFFFF",
        surfaceContainerLow: "#F4F3FA",
        surfaceContainer: "#EEEDF4",
        surfaceContainerHigh: "#E8E7EF",
        surfaceContainerHighest: "#E2E2E9",
        cash: "#3e9c35",
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#AFC6FF",
        },
        surfaceTint: "#AFC6FF",
        onPrimary: "#142F60",
        primaryContainer: "#2E4578",
        onPrimaryContainer: "#D9E2FF",
        secondary: {
          main: "#BFC6DC",
        },
        onSecondary: "#293042",
        secondaryContainer: "#404659",
        onSecondaryContainer: "#DCE2F9",
        tertiary: "#DFBBDE",
        onTertiary: "#412742",
        tertiaryContainer: "#593D5A",
        onTertiaryContainer: "#FDD7FA",
        error: {
          main: "#E6002A",
        },
        onError: "#690005",
        errorContainer: "#93000A",
        onErrorContainer: "#FFDAD6",
        onBackground: "#E2E2E9",
        surface: "#121318",
        onSurface: "#E2E2E9",
        surfaceVariant: "#44464F",
        onSurfaceVariant: "#C5C6D0",
        outline: "#8F9099",
        outlineVariant: "#44464F",
        inverseSurface: "#E2E2E9",
        inverseOnSurface: "#2F3036",
        inversePrimary: "#465D91",
        primaryFixed: "#D9E2FF",
        onPrimaryFixed: "#001944",
        primaryFixedDim: "#AFC6FF",
        onPrimaryFixedVariant: "#2E4578",
        secondaryFixed: "#DCE2F9",
        onSecondaryFixed: "#141B2C",
        secondaryFixedDim: "#BFC6DC",
        onSecondaryFixedVariant: "#404659",
        tertiaryFixed: "#FDD7FA",
        onTertiaryFixed: "#2A132C",
        tertiaryFixedDim: "#DFBBDE",
        onTertiaryFixedVariant: "#593D5A",
        surfaceDim: "#121318",
        surfaceBright: "#38393F",
        surfaceContainerLowest: "#0C0E13",
        surfaceContainerLow: "#1A1B20",
        surfaceContainer: "#1E1F25",
        surfaceContainerHigh: "#282A2F",
        surfaceContainerHighest: "#33353A",
        cash: "#3e9c35",
      },
    },
  },
});
export default theme;
