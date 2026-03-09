/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'pepdf-blue-light': '#7C9EB2',
        'pepdf-primary': '#5228CC', // Using CC for 6 digits
        'pepdf-purple-dark': '#372554',
        'pepdf-midnight': '#231123',
        'pepdf-black': '#000000',
      },
      fontFamily: {
        'display': ['Outfit', 'system-ui', 'sans-serif'],
        'body': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'pepdf-gradient': 'linear-gradient(135deg, #5228CC 0%, #372554 100%)',
        'dark-mesh': 'radial-gradient(at 0% 0%, #231123 0%, transparent 50%), radial-gradient(at 100% 0%, #5228CC 0%, transparent 50%), radial-gradient(at 100% 100%, #372554 0%, transparent 50%), radial-gradient(at 0% 100%, #000000 0%, transparent 50%)',
      }
    },
  },
  plugins: [],
};