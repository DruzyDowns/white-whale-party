/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        walnut: "#483329",
        ocean: "#114f75",
        warm: "#f4eeeb",
        "warm-dark": "#eee0da",
        offwhite: "#fcfcfc",
      },
      fontFamily: {
        hl: "var(--font-spectral)",
        body: "var(--font-source)",
      },
    },
  },
  plugins: [],
};
