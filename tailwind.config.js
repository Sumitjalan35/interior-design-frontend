/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["'Playfair Display'", 'serif'],
        lora: ["'Lora'", 'serif'],
        montserrat: ["'Montserrat'", 'sans-serif'],
      },
      colors: {
        gold: {
          400: '#eab308',
          500: '#facc15',
        },
        bronze: {
          400: '#b08d57',
        },
        cream: {
          100: '#fffbe6',
          300: '#f5e9c8',
        },
        charcoal: {
          700: '#343a40',
          800: '#212529',
          900: '#0d1117',
        },
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
        gold: '0 4px 24px 0 rgba(234, 179, 8, 0.18)',
      },
      backdropBlur: {
        xl: '24px',
      },
      animation: {
        shimmer: 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'spin-slow-reverse': 'spin-reverse 10s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'float-1': 'float 6s ease-in-out infinite',
        'float-2': 'float 8s ease-in-out infinite',
        'float-3': 'float 7s ease-in-out infinite',
        'float-4': 'float 9s ease-in-out infinite',
        fade: 'fadeIn 1.2s ease-in',
        slide: 'slideIn 1.2s cubic-bezier(0.4,0,0.2,1)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
        'spin-reverse': {
          '100%': { transform: 'rotate(-360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(40px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dark-gradient': 'linear-gradient(135deg, #0d1117 0%, #212529 50%, #343a40 100%)',
        'gold-gradient': 'linear-gradient(135deg, #bfa074 0%, #d4c4a8 50%, #e4d9c8 100%)',
      },
    },
  },
  plugins: [],
}
