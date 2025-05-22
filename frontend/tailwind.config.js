/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounceColor: {
          '0%, 100%': {
            transform: 'translateY(0)',
            backgroundColor: '#d1fae5', // green-100
            color: '#047857', // green-700
          },
          '50%': {
            transform: 'translateY(-25%)',
            backgroundColor: '#fef9c3', // yellow-100
            color: '#ca8a04', // yellow-700
          },
        },
      },
      animation: {
        'bounce-color': 'bounceColor 2s infinite',
      },
    },
  },
  plugins: [],
}






