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
      colors: {
        btnDark: 'var(--color-btnDark)',
        btnLight: 'var(--color-btnLight)',
        bgDark: 'var(--color-bgDark)',
        bgLight: 'var(--color-bgLight)',
        textMuted: 'var(--color-textMuted)',
        textHighlight: 'var(--color-textHighlight)'
      }
    }
  },
  plugins: [],
};