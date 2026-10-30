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
        gold: {
          50: '#FDFCF7',
          100: '#F9F5E6',
          200: '#F3E5AB',
          300: '#E7CF76',
          400: '#DBB948',
          500: '#D4AF37', // signature champagne gold
          600: '#B8902A',
          700: '#946E1E',
          800: '#755419',
          900: '#5A3F14',
        },
        luxe: {
          black: '#0A0A0C',
          dark: '#121216',
          card: '#181820',
          elevated: '#20202C',
          border: 'rgba(212, 175, 55, 0.15)',
          ivory: '#FAF7F2',
          beige: '#EFE7DB',
          muted: '#9E9EA8',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 40px rgba(212, 175, 55, 0.35)',
        'luxe-card': '0 10px 30px -10px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(212, 175, 55, 0.12)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)' },
          '100%': { boxShadow: '0 0 35px rgba(212, 175, 55, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
