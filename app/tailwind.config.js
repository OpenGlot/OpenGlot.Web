/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,scss}'],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          xl: '1280px',
        },
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
      fontFamily: {
        sans: ['Nunito Sans', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
