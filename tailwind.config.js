/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
      },
      fontFamily: {
        // to change, update font in _document.js
        sans: ["inter", ...defaultTheme.fontFamily.sans],
        serif: ["lora", ...defaultTheme.fontFamily.serif],
        stock: [defaultTheme.fontFamily.sans],
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "2/3": "2 / 3",
        "9/16": "9 / 16",
      },
    },
  },
  variants: {
    extend: {},
  },
  // Applies default Tailwind styles to block content. See https://tailwindcss.com/docs/typography-plugin
  plugins: [require("@tailwindcss/typography")],
};
