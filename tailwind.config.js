/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'winifreda': {
          ocean: '#0087BA',
          french: '#213A7F',
          egypt: '#27348B',
          orange: '#E78423',
        }
      }
    },
  },
  plugins: [],
}