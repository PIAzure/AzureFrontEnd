/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'orange': '#EE8C36',
        'gray': '#808080',
        'dark-gray': '#696969',
        'light-gray': '#F2F2F2',
        'bt-primary': '#C0C0C0',
        'bt-secundary': '#A9A9A9',
        'light-orange': '#F68D46',
        'blue': '#0C90EE',
        'light-blue': '#8DB3CE',
        'cian': '#1E5F68',
        'light-cian': '#20979F',
        'ice': '#e5e1e1',
      },
      fontFamily: {
        'ubuntu': ['Ubuntu', 'Serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      maxWidth: {
        'padrao': '1400px',
      },
      padding: {
        'px': '40px',
        'pyMob': '40px',
        'pyDesk': '60px',
        'btX': '2.5rem',
        'btY': '1rem',
        'padrao': '40px',
      },
      margin: {
        '80px': '80px',
        '60px': '60px',
        '32px': '32px',
        '30px': '30px',
        '24px': '24px',
        '14px': '14px',
        '12px': '12px',
        '10px': '10px',
        '8px': '8px',
      },
      fontSize: {
        '14px': ['0.875rem', { lineHeight: '1.05rem' }],
        '16px': ['1rem', { lineHeight: '1.2rem' }],
        '18px': ['1.125rem', { lineHeight: '1.9rem' }],
        '20px': ['1.25rem', { lineHeight: '1.6rem' }],
        '24px': ['1.5rem', { lineHeight: '1.8rem' }],
        '28px': ['1.75rem', { lineHeight: '2.1rem' }],
        '32px': ['2rem', { lineHeight: '2.4rem' }],
        '36px': ['2.25rem', { lineHeight: '2.7rem' }],
        '40px': ['2.5rem', { lineHeight: '3rem' }],
        '48px': ['3rem', { lineHeight: '3.6rem' }],
        '56px': ['3.5rem', { lineHeight: '4.4rem' }],
        '64px': ['4rem', { lineHeight: '4.8rem' }],
        '72px': ['4.5rem', { lineHeight: '5.4rem' }],
        '80px': ['5rem', { lineHeight: '6rem' }],
        '92px': ['5.75rem', { lineHeight: '6.9rem' }],
        '96px': ['6rem', { lineHeight: '6.6rem' }],
        '110px': ['6.875rem', { lineHeight: '7.5rem' }],
        '50px': ['3.125rem', { lineHeight: '3.7rem' }],
        '35px': ['2.188rem', { lineHeight: '2.6rem' }],
        '30px': ['1.875rem', { lineHeight: '2.8rem' }],
        '25px': ['1.563rem', { lineHeight: '2rem' }],
      },
      screens: {
        padrao: '1400px',
        iphone12: '390px',
      },
      borderRadius: {
        'bt-primary': '10px',
        'bt-secundary': '15px',
        'imagem': '25px',
      },
    },
    keyframes: {
      fadeBottom: {
        from: {
          transform: 'translateY(10%)',
          opacity: '0',
        },
        to: {
          transform: 'translateY(0)',
          opacity: '1',
        },
      },
      fadeLeft: {
        '0%': {
          transform: 'translateX(-20%)',
          opacity: '0',
        },
        '100%': {
          transform: 'translateX(0)',
          opacity: '1',
        },
      },
      show: {
        '0%': {
          opacity: '0',
        },
        '100%': {
          opacity: '1',
        },
      },
      heigth: {
        '0%': {
          opacity: '0',
        },
        '100%': {
          opacity: '1',
        },
      },
      open: {
        '0%': {
          transform: 'rotate(45deg)',
        },
        '100%': {
          transform: 'rotate(0deg)',
        },
      },
      close: {
        '0%': {
          transform: 'rotate(-45deg)',
        },
        '100%': {
          transform: 'rotate(0deg)',
        },
      },
    },
    animation: {
      open: 'open 0.2s ease-out forwards',
      show: 'show 0.2s ease-out forwards',
      close: 'close 0.2s ease-out forwards',
      heigth: 'heigth 0.5s ease-in forwards',
      fadeBottom: 'fadeBottom 1s ease-in forwards',
      fadeLeft: 'fadeLeft 1s ease-in forwards',
    },
  },
  plugins: [],
}