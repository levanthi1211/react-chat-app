/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        accordion: {
          "0%": {
            opacity: 0,
            display: "none",
            visibility: "hidden",
            height: 0,
          },
          "100%": {
            opacity: 1,
            display: "block",
            visibility: "visible",
            height: "auto",
          },
        },
      },
      animation: {
        accordion: "accordion 1s ease-in-out",
      },
      colors: {
        "main-blue": "#1fb6ff",
        "main-purple": "#7e5bef",
        "main-pink": "#ff49db",
        "main-orange": "#ff7849",
        "main-green": "#13ce66",
        "main-yellow": "#ffc82c",
        "main-gray-dark": "#273444",
        "main-gray": "#8492a6",
        "main-gray-light": "#d3dce6",
        primary: "rgb(var(--color-primary))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
  darkMode: "class",
};
