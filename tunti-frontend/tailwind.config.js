/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4e8098',
        secondary: '#ced3dc',
        white: '#fcf7f8',
        priceHigh: '#a31621',
        priceMedium: '#fabc3c',
        priceLow: '#71ba4f',
      },
    },
  },
  plugins: [],
}

