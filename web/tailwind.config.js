/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'name': ['Montserrat Alternates', 'Montserrat', 'sans-serif'],
        'headings': ['Nunito', 'Nunito Sans', 'Varela Round', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

