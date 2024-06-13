/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx,scss}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#bebdf2",
          DEFAULT: "#a3a0f5",
          dark: "#6a64e6",
        },
        customBlack: "#1B1D1F",
      },
      container: {
        center: true,
        screens: {
          xl: "1400px",
        },
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      fontFamily: {
        sans: ["Nunito Sans", "Arial", "sans-serif"],
        sansLogo: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
