import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        rouge: '#D62300',
        'rouge-dark': '#B01D00',
        jaune: '#FF8732',
        'jaune-dark': '#E56F1A',
        sombre: '#D62300',
        creme: '#F5EBDC',
        'creme-50': '#FAF3E9',
      },
      fontFamily: {
        oswald: ['Archivo', 'sans-serif'],
        bebas: ['Archivo', 'sans-serif'],
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        'marquee-left': 'marquee-left 60s linear infinite',
        'marquee-right': 'marquee-right 60s linear infinite',
        'float-slow': 'float-slow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
