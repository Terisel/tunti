/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4e8098",
        secondary: "#ced3dc",
        white: "#fcf7f8",
        priceHigh: "#FB181C",
        priceHighTransparent: 'rgba(251, 24, 28, 0.15)',
        priceMedium: "#fabc3c",
        priceLow: "#008C0C",
        priceLowTransparent: 'rgba(0, 140, 12, 0.15)',
        nightTime: "#EBE2FF"

      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}
