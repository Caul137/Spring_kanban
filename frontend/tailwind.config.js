/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        ink: '#20243b',
        muted: '#85899f',
        violet: {
          50: '#f2f0ff',
          100: '#e8e4ff',
          500: '#7966f5',
          600: '#6852e8',
          700: '#5540d4',
        },
      },
      boxShadow: {
        card: '0 4px 18px rgba(37, 39, 67, 0.045)',
        panel: '0 18px 50px rgba(31, 35, 67, 0.16)',
      },
    },
  },
  plugins: [],
};
