/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0F0D0A',
          900: '#17140F',
          800: '#1F1B15',
          700: '#2A241C',
          600: '#3A3226',
          500: '#4F4433',
        },
        mist: {
          400: '#7C7059',
          300: '#A2937A',
          200: '#C9BBA0',
          100: '#E3D8C3',
          50: '#F0E6D2',
        },
        sand: {
          50: '#FAF3E4',
          100: '#F2E6CF',
          200: '#E6D4B0',
          300: '#D2B786',
          600: '#8A7657',
          700: '#6B573D',
          900: '#3A2E1F',
        },
        // Brand accent driven by CSS vars so it can differ per theme with full opacity-modifier support
        signal: {
          DEFAULT: 'rgb(var(--accent-rgb) / <alpha-value>)',
          dim: 'rgb(var(--accent-dim-rgb) / <alpha-value>)',
          bright: 'rgb(var(--accent-bright-rgb) / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'rgb(var(--accent-rgb) / <alpha-value>)',
          dim: 'rgb(var(--accent-dim-rgb) / <alpha-value>)',
          bright: 'rgb(var(--accent-bright-rgb) / <alpha-value>)',
        },
        good: '#3E9E6E',
        warn: '#C4832A',
        bad: '#B3273D',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backdropBlur: {
        glass: '12px',
      },
      ringOffsetColor: {
        page: 'var(--page-bg)',
      },
      boxShadow: {
        glass: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 30px rgba(0,0,0,0.35)',
      },
      keyframes: {
        bounce_slow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        fade_in: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        glow_border: {
          '0%': { boxShadow: '0 0 0 0 rgba(201,151,43,0.55)' },
          '100%': { boxShadow: '0 0 0 8px rgba(201,151,43,0)' },
        },
      },
      animation: {
        bounce_slow: 'bounce_slow 1.8s ease-in-out infinite',
        fade_in: 'fade_in 0.5s ease-out',
        glow_border: 'glow_border 1.2s ease-out',
      },
    },
  },
  plugins: [],
}
