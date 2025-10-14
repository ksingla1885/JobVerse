// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        border: 'var(--border)',
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@tailwindcss/line-clamp'),
  ],
};