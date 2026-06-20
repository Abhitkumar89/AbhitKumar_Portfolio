/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Neutrals are driven by CSS variables (see index.css) so the whole
        // site re-themes between light and dark automatically. We override the
        // built-in `ink`, `slate`, and `white` tokens to point at those vars,
        // which means existing utility classes adapt without any markup changes.
        ink: {
          DEFAULT: 'rgb(var(--c-base) / <alpha-value>)',
          soft: 'rgb(var(--c-surface) / <alpha-value>)',
          card: 'rgb(var(--c-card) / <alpha-value>)',
        },
        // `text-white`, `bg-white/5`, `border-white/10` -> foreground-tinted and
        // theme-aware (light tint on dark, dark tint on light).
        white: 'rgb(var(--c-fg) / <alpha-value>)',
        slate: {
          100: 'rgb(var(--c-fg) / <alpha-value>)',
          200: 'rgb(var(--c-fg) / <alpha-value>)',
          300: 'rgb(var(--c-fg-muted) / <alpha-value>)',
          400: 'rgb(var(--c-fg-muted) / <alpha-value>)',
          500: 'rgb(var(--c-fg-faint) / <alpha-value>)',
          600: 'rgb(var(--c-fg-faint) / <alpha-value>)',
        },
        // Fixed dark color for text sitting on top of the (light) accent
        // colors - stays dark in both themes so buttons keep good contrast.
        onaccent: '#0a0e14',
        // "Lagoon" accent palette - coral, teal, and sky. Same in both themes.
        accent: {
          pink: '#fb7185', // primary - coral/rose
          violet: '#2dd4bf', // secondary - teal
          cyan: '#38bdf8', // tertiary - sky
          lime: '#34d399', // pop - emerald
          amber: '#fbbf24', // supporting - amber
        },
      },
      fontFamily: {
        display: ['"Clash Display"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(45, 212, 191, 0.45)',
        'glow-pink': '0 0 40px -8px rgba(251, 113, 133, 0.5)',
        'glow-cyan': '0 0 40px -8px rgba(56, 189, 248, 0.45)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgb(var(--c-grid) / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--c-grid) / 0.06) 1px, transparent 1px)',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        gradient: 'gradientShift 6s ease infinite',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spinSlow 18s linear infinite',
      },
    },
  },
  plugins: [],
};
