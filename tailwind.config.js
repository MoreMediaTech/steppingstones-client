module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#5E17EB',
        'primary-dark': {
          100: '#5515d4',
          200: '#4b12bc',
          300: '#4210a5',
          400: '#380e8d',
          500: '#2e0c76',
          600: '#26095e',
          700: '#1c0746',
          800: '#13052f',
          900: '#090217',
        },
        'primary-light': {
          50: '#f9f8fc',
          100: '#efe8fd',
          200: '#dfd1fb',
          300: '#cfb9f9',
          400: '#bfa2f7',
          500: '#af8bf5',
          600: '#9e74f3',
          700: '#8e5df1',
          800: '#6e2eed',
        },
        secondary: '#3A0B99',
        tertiary: '#0c6980',
        dimWhite: 'rgba(255, 255, 255, 0.7)',
        dimBlue: 'rgba(9, 151, 124, 0.1)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1440px',
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
