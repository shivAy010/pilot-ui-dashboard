import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",

     // Or if using `src` directory:
     "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#0EA5E9', // sky-500
        'primary-50': '#F0F9FF', // sky-50
        'primary-100': '#E0F2FE', // sky-100
        'primary-200': '#BAE6FD', // sky-200
        'primary-300': '#7DD3FC', // sky-300
        'primary-400': '#38BDF8', // sky-400
        'primary-500': '#0EA5E9', // sky-500
        'primary-600': '#0284C7', // sky-600
        'primary-700': '#0369A1', // sky-700
        'primary-800': '#075985', // sky-800
        'primary-900': '#0C4A6E', // sky-900
        'primary-foreground': '#FFFFFF', // white

        // Secondary Colors
        'secondary': '#64748B', // slate-500
        'secondary-50': '#F8FAFC', // slate-50
        'secondary-100': '#F1F5F9', // slate-100
        'secondary-200': '#E2E8F0', // slate-200
        'secondary-300': '#CBD5E1', // slate-300
        'secondary-400': '#94A3B8', // slate-400
        'secondary-500': '#64748B', // slate-500
        'secondary-600': '#475569', // slate-600
        'secondary-700': '#334155', // slate-700
        'secondary-800': '#1E293B', // slate-800
        'secondary-900': '#0F172A', // slate-900
        'secondary-foreground': '#FFFFFF', // white

        // Accent Colors
        'accent': '#06B6D4', // cyan-500
        'accent-50': '#ECFEFF', // cyan-50
        'accent-100': '#CFFAFE', // cyan-100
        'accent-200': '#A5F3FC', // cyan-200
        'accent-300': '#67E8F9', // cyan-300
        'accent-400': '#22D3EE', // cyan-400
        'accent-500': '#06B6D4', // cyan-500
        'accent-600': '#0891B2', // cyan-600
        'accent-700': '#0E7490', // cyan-700
        'accent-800': '#155E75', // cyan-800
        'accent-900': '#164E63', // cyan-900
        'accent-foreground': '#FFFFFF', // white

        // Background Colors
        'background': '#FAFBFC', // custom background
        'surface': '#F1F5F9', // slate-100
        'card': '#FFFFFF', // white
        'border': '#E2E8F0', // slate-200

        // Text Colors
        'text-primary': '#1E293B', // slate-800
        'text-secondary': '#475569', // slate-600
        'text-muted': '#64748B', // slate-500
        'text-inverse': '#FFFFFF', // white

        // Status Colors
        'success': '#10B981', // emerald-500
        'success-50': '#ECFDF5', // emerald-50
        'success-100': '#D1FAE5', // emerald-100
        'success-200': '#A7F3D0', // emerald-200
        'success-300': '#6EE7B7', // emerald-300
        'success-400': '#34D399', // emerald-400
        'success-500': '#10B981', // emerald-500
        'success-600': '#059669', // emerald-600
        'success-700': '#047857', // emerald-700
        'success-800': '#065F46', // emerald-800
        'success-900': '#064E3B', // emerald-900
        'success-foreground': '#FFFFFF', // white

        'warning': '#F59E0B', // amber-500
        'warning-50': '#FFFBEB', // amber-50
        'warning-100': '#FEF3C7', // amber-100
        'warning-200': '#FDE68A', // amber-200
        'warning-300': '#FCD34D', // amber-300
        'warning-400': '#FBBF24', // amber-400
        'warning-500': '#F59E0B', // amber-500
        'warning-600': '#D97706', // amber-600
        'warning-700': '#B45309', // amber-700
        'warning-800': '#92400E', // amber-800
        'warning-900': '#78350F', // amber-900
        'warning-foreground': '#FFFFFF', // white

        'error': '#EF4444', // red-500
        'error-50': '#FEF2F2', // red-50
        'error-100': '#FEE2E2', // red-100
        'error-200': '#FECACA', // red-200
        'error-300': '#FCA5A5', // red-300
        'error-400': '#F87171', // red-400
        'error-500': '#EF4444', // red-500
        'error-600': '#DC2626', // red-600
        'error-700': '#B91C1C', // red-700
        'error-800': '#991B1B', // red-800
        'error-900': '#7F1D1D', // red-900
        'error-foreground': '#FFFFFF', // white
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      boxShadow: {
        'brand': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'brand-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'brand-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'brand-xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'elevation-2': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elevation-3': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'elevation-4': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'brand': '6px',
        'brand-lg': '12px',
        'brand-xl': '16px',
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite linear',
        'pulse-soft': 'pulse-soft 2s infinite',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in': 'fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-soft': 'bounce-soft 1s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '400': '400ms',
      },
      backdropBlur: {
        'brand': '20px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
} satisfies Config;
