/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        meteor: 'meteor 5s linear infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        meteor: {
          '0%': {
            transform: 'rotate(215deg) translateX(0)',
            opacity: 1,
          },
          '70%': {
            opacity: 1,
          },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
