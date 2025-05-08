/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      // fontFamily: {
      //   heading: ["Space Grotesk", "sans-serif"],
      //   body: ["IBM Plex Sans", "sans-serif"],
      // },
      // colors: {
      //   'bg': {
      //     "dark": "#212121",
      //     "light": "#eeedea",
      //   },
      //   'text': {
      //     "muted": "#929292",
      //     "highlight": "#eeede9",
      //   },
      //   'primary': '#002333',
      // },
    },
  },
  plugins: [],
}; 