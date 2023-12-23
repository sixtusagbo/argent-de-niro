/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'name': ['Montserrat Alternates', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

