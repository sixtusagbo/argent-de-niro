/** @type {import('tailwindcss').Config} */
import keepPreset from "keep-react/preset";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [keepPreset],
  theme: {
    extend: {
      fontFamily:{
        'name': ['Montserrat Alternates', 'Montserrat', 'sans-serif'],
        'headings': ['Nunito', 'Nunito Sans', 'Varela Round', 'sans-serif'],
      },
      backgroundImage: {
        'hero': "url('/src/assets/images/landingImage.svg')",
      },
    },
  },
  plugins: [],
}

