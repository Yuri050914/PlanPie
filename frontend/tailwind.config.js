/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-blue': '#E6F3FF',
        'soft-purple': '#F0E6FF',
        'beach-blue': '#87CEEB',
        'neon-blue': '#00BFFF',
      },
    },
  },
  plugins: [],
}
