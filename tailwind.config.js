/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        manila:  '#F2EDE3',
        paper:   '#FAF7F2',
        dust:    '#E8E0CE',
        sand:    '#C4A87A',
        umber:   '#8B7355',
        ink:     '#1A1510',
        inksoft: '#3A3028',
      },
      scale: {
        '103': '1.03',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
