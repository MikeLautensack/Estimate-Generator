import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      tablet: "640px",
      desktop: "1024px",
      sm: "600px",
      md: "900px",
      lg: "1200px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        rubic: ["var(--font-rubic)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary50: "#ebedef",
        primary100: "#c0c8cc",
        primary200: "#a1adb4",
        primary300: "#768892",
        primary400: "#5c717d",
        primary500: "#334d5c",
        primary600: "#2e4654",
        primary700: "#243741",
        primary800: "#1c2a33",
        primary900: "#152027",
        secondary50: "#fef9f4",
        secondary100: "#fbeddd",
        secondary200: "#f9e4cc",
        secondary300: "#f6d8b5",
        secondary400: "#f5d1a7",
        secondary500: "#f2c591",
        secondary600: "#dcb384",
        secondary700: "#ac8c67",
        secondary800: "#856c50",
        secondary900: "#66533d",
        error50: "#fdedec",
        error100: "#fbe4e2",
        error200: "#f8c8c3",
        error300: "#e74d3c",
        error400: "#d04536",
        error500: "#b93e30",
        error600: "#ad3a2d",
        error700: "#8b2e24",
        error800: "#68231b",
        error900: "#511b15",
        neutral50: "#ffffff",
        neutral100: "#fbfbfc",
        neutral200: "#f7f8f8",
        neutral300: "#eff1f2",
        neutral400: "#e4e8ea",
        neutral500: "#ccd3d6",
        neutral600: "#c0c8cc",
        neutral700: "#b6bfc4",
        neutral800: "#a9b4bb",
        neutral900: "#9daab1",
        neutral1000: "#919fa7",
        neutral1200: "#85949d",
        neutral1300: "#788a93",
        neutral1400: "#6e818b",
        neutral1500: "#627681",
        neutral1600: "#586d79",
        neutral1700: "#49616e",
        neutral1800: "#3d5664",
        neutral1900: "#334d5c",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export const plugins = [require("tailwindcss-animate")];

export default config;
