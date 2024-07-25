/** @type {import('tailwindcss').Config} */
// tailwind.config.js
// tailwind.config.js
// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('/src/assets/imgbg.jpg')",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
