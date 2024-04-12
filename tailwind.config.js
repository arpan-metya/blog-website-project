/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        squish: 'squish 300ms ease-in'
      },
      keyframes: {
        squish: {
          '50%': { scale: '1.3 0.9' }
        }
      }
    },
  },
  plugins: [],
}
