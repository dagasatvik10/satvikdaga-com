/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    spacing: {
      0: '0px',
      1: '2px',
      2: '4px',
      3: '6px',
      4: '8px',
      5: '10px',
      6: '12px',
      8: '16px',
      10: '20px',
      12: '24px',
      14: '28px',
      16: '32px',
      20: '40px',
    },
    fontFamily: {
      mono: ['JetBrains Mono', 'monospace'],
    },
    extend: {
      colors: {
        bg: '#0d1117',
        'bg-surface': '#161b22',
        'bg-subtle': '#21262d',
        stroke: '#30363d',
        'stroke-muted': '#21262d',
        fg: '#e6edf3',
        'fg-muted': '#8b949e',
        'accent-blue': '#58a6ff',
        'accent-green': '#3fb950',
        'accent-purple': '#bc8cff',
        'accent-yellow': '#d29922',
        'accent-red': '#f85149',
      },
    },
  },
  plugins: [],
};
