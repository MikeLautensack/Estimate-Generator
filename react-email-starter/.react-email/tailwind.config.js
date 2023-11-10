const colors = require('@radix-ui/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

const iOsHeight = plugin(function ({ addUtilities }) {
  const supportsTouchRule = '@supports (-webkit-touch-callout: none)';
  const webkitFillAvailable = '-webkit-fill-available';

  const utilities = {
    '.min-h-screen-ios': {
      [supportsTouchRule]: {
        minHeight: webkitFillAvailable,
      },
    },
    '.h-screen-ios': {
      [supportsTouchRule]: {
        height: webkitFillAvailable,
      },
    },
  };

  addUtilities(utilities, ['responsive']);
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    '../../packages/**/*.{js,ts,jsx,tsx}',
    '../../apps/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary50: '#e6e8ec',
      primary100: '#b1b7c3',
      primary200: '#8c95a6',
      primary300: '#57647d',
      primary400: '#364664',
      primary500: '#04183d',
      primary600: '#041638',
      primary700: '#03112b',
      primary800: '#020d22',
      primary900: '#020a1a',
      secondary50: '#fbf7eb',
      secondary100: '#f2e6c1',
      secondary200: '#ebdaa3',
      secondary300: '#e2c979',
      secondary400: '#ddbf5f',
      secondary500: '#d4af37',
      secondary600: '#c19f32',
      secondary700: '#977c27',
      secondary800: '#75601e',
      secondary900: '#594a17',
      accent50: '#edfafc',
      accent100: '#c8f0f6',
      accent200: '#ade9f1',
      accent300: '#88e0eb',
      accent400: '#71d9e7',
      accent500: '#4dd0e1',
      accent600: '#46bdcd',
      accent700: '#3794a0',
      accent800: '#2a727c',
      accent900: '#20575f',
      succcess50: '#eff8ef',
      succcess100: '#cce9cc',
      succcess200: '#b4deb4',
      succcess300: '#92cf92',
      succcess400: '#7dc67d',
      succcess500: '#5cb85c',
      succcess600: '#54a754',
      succcess700: '#418341',
      succcess800: '#336533',
      succcess900: '#274d27',
      warning50: '#fff0e6',
      warning100: '#ffd0b0',
      warning200: '#ffb98a',
      warning300: '#ff9954',
      warning400: '#ff8533',
      warning500: '#ff6700',
      warning600: '#e85e00',
      warning700: '#b54900',
      warning800: '#8c3900',
      warning900: '#6b2b00',
      error50: '#ffe6e6',
      error100: '#ffb0b0',
      error200: '#ff8a8a',
      error300: '#ff5454',
      error400: '#ff3333',
      error500: '#ff0000',
      error600: '#e80000',
      error700: '#b50000',
      error800: '#8c0000',
      error900: '#6b0000',
      neutral50: '#ffffff',
      neutral100: '#fcfdfd',
      neutral200: '#f5f5f7',
      neutral300: '#f0f1f2',
      neutral400: '#d9dbdf',
      neutral500: '#c0c4ca',
      neutral600: '#8e94a0',
      neutral700: '#5b6475',
      neutral800: '#475164',
      neutral900: '#29354b',
      neutral1000: '#212e44',
      neutral1200: '#17243c',
      neutral1300: '#03112b',
    },
    extend: {
      backgroundImage: {
        gradient:
          'linear-gradient(145.37deg, rgba(255, 255, 255, 0.09) -8.75%, rgba(255, 255, 255, 0.027) 83.95%)',
        gradientHover:
          'linear-gradient(145.37deg, rgba(255, 255, 255, 0.1) -8.75%, rgba(255, 255, 255, 0.057) 83.95%)',
        shine:
          'linear-gradient(45deg, rgba(255,255,255,0) 45%,rgba(255,255,255,1) 50%,rgba(255,255,255,0) 55%,rgba(255,255,255,0) 100%)',
      },
      colors: {
        cyan: {
          1: colors.cyanDarkA.cyanA1,
          2: colors.cyanDarkA.cyanA2,
          3: colors.cyanDarkA.cyanA3,
          4: colors.cyanDarkA.cyanA4,
          5: colors.cyanDarkA.cyanA5,
          6: colors.cyanDarkA.cyanA6,
          7: colors.cyanDarkA.cyanA7,
          8: colors.cyanDarkA.cyanA8,
          9: colors.cyanDarkA.cyanA9,
          10: colors.cyanDarkA.cyanA10,
          11: colors.cyanDarkA.cyanA11,
          12: colors.cyanDarkA.cyanA12,
        },
        slate: {
          1: colors.slateDarkA.slateA1,
          2: colors.slateDarkA.slateA2,
          3: colors.slateDarkA.slateA3,
          4: colors.slateDarkA.slateA4,
          5: colors.slateDarkA.slateA5,
          6: colors.slateDarkA.slateA6,
          7: colors.slateDarkA.slateA7,
          8: colors.slateDarkA.slateA8,
          9: colors.slateDarkA.slateA9,
          10: colors.slateDarkA.slateA10,
          11: colors.slateDarkA.slateA11,
          12: colors.slateDarkA.slateA12,
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '-100%' },
          '100%': { backgroundPosition: '100%' },
        },
        dash: {
          '0%': { strokeDashoffset: 1000 },
          '100%': { strokeDashoffset: 0 },
        },
      },
    },
  },
  plugins: [iOsHeight],
};
