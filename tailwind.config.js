/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-from-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.3s ease-out',
      },
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
        foreground: 'hsl(var(--foreground))',
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
