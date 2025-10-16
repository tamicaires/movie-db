/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'hsl(var(--background))',
          dark: '#0D1117',
        },
        surface: {
          DEFAULT: 'hsl(var(--surface))',
          dark: '#161B22',
          light: '#21262D',
        },
        primary: {
          DEFAULT: '#388BFF',
          50: '#EBF5FF',
          100: '#D6EBFF',
          200: '#ADD6FF',
          300: '#85C2FF',
          400: '#5CADFF',
          500: '#388BFF',
          600: '#0066E0',
          700: '#004DB8',
          800: '#003580',
          900: '#001C48',
        },
        accent: {
          red: '#E54D60',
        },
        text: {
          primary: '#F0F6FC',
          secondary: '#8B949E',
        },
        rating: {
          high: '#E3B341',
          medium: '#A3BF3B',
        },
        border: {
          DEFAULT: '#30363D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
