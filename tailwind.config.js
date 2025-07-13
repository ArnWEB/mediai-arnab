/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      minWidth: {
        'sidebar': '220px',
        'sidebar-lg': '280px',
      },
      maxWidth: {
        'sidebar': '280px',
        'sidebar-lg': '320px',
      },
    },
  },
  plugins: [],
};
