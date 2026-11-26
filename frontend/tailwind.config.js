/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          200: '#B6F0C8',
          500: '#0CAA41',
          600: '#0A8A3A',
          700: '#0A7A33',
          800: '#06652A',
        },
        mint: {
          DEFAULT: '#E9F6EE',
          50: '#F3FBF6',
        },
        ink: {
          DEFAULT: '#20262E',
          2: '#4A525C',
          3: '#5B6474',
          4: '#9AA1AB',
        },
        line: {
          DEFAULT: '#E3E5E8',
          strong: '#D5D8DD',
          input: '#8A919B',
        },
        field: '#F1F2F4',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        brand: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        xs: '6px',
        sm: '10px',
        md: '12px',
        lg: '16px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 4px 12px rgba(32, 38, 46, 0.08)',
        soft: '0 4px 12px rgba(32, 38, 46, 0.06)',
      },
      maxWidth: {
        container: '1440px',
        profile: '1312px',
        hero: '1100px',
      },
    },
  },
  plugins: [],
};
