/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#020817',
        'bulinks': '#3b82f6',
        'hovers': '#ffffff'
      },
      fontFamily: {
        'roboto': ['Roboto'],
        'srpnch': ['Sarpanch']
      },
    },
  },
  plugins: [],
}
