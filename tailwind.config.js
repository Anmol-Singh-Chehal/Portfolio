/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0D12',
          50: '#F7F8FA',
          100: '#EDEFF2',
          200: '#C7CDD6',
          300: '#8A93A3',
          400: '#5B6472',
          500: '#3A414D',
          600: '#232933',
          700: '#171B22',
          800: '#12161D',
          900: '#0A0D12',
        },
        scan: {
          DEFAULT: '#4FD8E8',
          light: '#0E7C86',
        },
        flare: {
          DEFAULT: '#FF6B4A',
          light: '#D94F32',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
      },
      animation: {
        scanline: 'scanline 6s linear infinite',
        blink: 'blink 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
