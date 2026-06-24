/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E1116',
        panel: '#161B22',
        panel2: '#1C232D',
        line: '#2A3340',
        accent: '#FF6A3D',
        accent2: '#3DDC97',
        muted: '#8A93A3',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 24px -8px rgba(0,0,0,0.45)',
        glow: '0 0 0 1px rgba(255,106,61,0.4), 0 8px 24px -6px rgba(255,106,61,0.35)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pop: {
          '0%': { opacity: 0, transform: 'scale(0.94)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.35s ease-out both',
        pop: 'pop 0.2s ease-out both',
      },
    },
  },
  plugins: [],
};
