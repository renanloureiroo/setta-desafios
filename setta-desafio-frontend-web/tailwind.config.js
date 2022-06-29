/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
        mono: "'Roboto Mono', monospace",
      },
      colors: {
        brand: {
          blue: "#5DAFF6",
          coral: "#F2D4E1",
        },
      },
    },
  },
  plugins: [],
};
