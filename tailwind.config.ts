import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-base':    '#0a0e1a',
        'bg-surface': '#0d1117',
        'bg-code':    '#12141f',
        'accent':     '#00d4ff',
        'up':         '#50fa7b',
        'down':       '#ff5555',
        'border-dim': '#1e293b',
        'text-dim':   '#475569',
        'text-muted': '#334155',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
      },
      animation: {
        ticker: 'ticker 30s linear infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}

export default config
