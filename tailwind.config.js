/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: { DEFAULT: 'var(--background)' },
        foreground: { DEFAULT: 'var(--foreground)' },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        // Retro 8-bit arcade tokens (Black & Yellow Khula signature palette)
        arcade: {
          canvas: 'var(--arcade-canvas)',
          cream: 'var(--arcade-cream)',
          orange: 'var(--arcade-orange)',
          yellow: 'var(--arcade-yellow)',
          'yellow-bright': 'var(--arcade-yellow-bright)',
          'orange-deep': 'var(--arcade-orange-deep)',
          terracotta: 'var(--arcade-terracotta)',
          cyan: 'var(--arcade-cyan)',
          green: 'var(--arcade-green)',
          coin: 'var(--arcade-coin)',
          surface: 'var(--arcade-surface)',
          ink: 'var(--arcade-ink)',
        },
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 2px)',
        DEFAULT: 'var(--radius)',
        md: 'calc(var(--radius) + 2px)',
        lg: 'calc(var(--radius) + 4px)',
        xl: 'calc(var(--radius) + 8px)',
        '2xl': 'calc(var(--radius) + 16px)',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'Segoe UI', 'sans-serif'],
        display: ['var(--font-body)', 'Segoe UI', 'sans-serif'],
        pixel: ['var(--font-pixel)', 'monospace'],
        terminal: ['var(--font-terminal)', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'blink-text': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.15' },
        },
      },
      animation: {
        'blink-text': 'blink-text 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
