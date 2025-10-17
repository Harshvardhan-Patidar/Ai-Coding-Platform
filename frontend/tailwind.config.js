/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        light: {
          primary: '#3b82f6',
          secondary: '#64748b',
          background: '#ffffff',
          surface: '#f8fafc',
          text: '#1e293b',
        },
        // Dark theme colors  
        dark: {
          primary: '#60a5fa',
          secondary: '#94a3b8',
          background: '#0f172a',
          surface: '#1e293b',
          text: '#f1f5f9',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          from: { transform: 'translateY(-10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}