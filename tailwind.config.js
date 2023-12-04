/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        pickColorTheme: {
          primary: "#FBBD23",
          secondary: "#FEF9f6",
          info: "#062029",
          accent: "#F2E9E3",
          neutral: "#000000", //text-black
          "base-100": "#ffffff", //bg-white
          "base-200": "#FBBD23",
          error: "#1E88E5",
        },
      },
      {
        dark: {
          info: "#062029",
          secondary: "#0f0e1085", //black
          accent: "#0f0e1085",
          neutral: "#ffffff", //text-white
          "base-100": "#0f0e1085", //btn
          "base-200": "#FBBD23",
          error: "#1E88E5",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
