/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],

  darkMode: 'media',
  theme: {
    boxShadow: {
      top4px: 'inset 0 4px 0 0 rgba(0, 0, 0, 0.15)',
      top2px: 'inset 0 2px 0 0 rgba(0, 0, 0, 0.15)',
      '2xl': '0 5px 20px 0px rgba(0, 0, 0, 0.10)'
    },
    colors: {
      primary: '#4272EF',
      primarylight: '#E3EAFD',
      secondary: '#FF5E5E',
      tertiary: '#FFCF60',
      success: '#6FCA37',
      successlight: '#EBFFDF',
      warning: '#F28D15',
      warninglight: '#FFEFDC',
      delete: '#DB1E1E',
      deletelight: '#FFECEC',
      error: '#DB1E1E',
      errorlight: '#FFECEC',
      black: '#000000',
      grey1: '#222222',
      grey2: '#999999',
      grey3: '#CCCCCC',
      grey4: '#EEEEEE',
      grey5: '#F6F6F6',
      grey6: '#FAFAFA',
      white: '#FFFFFF'
    },
    extend: {
      opacity: {
        shadow: '.15'
      },
      spacing: {
        '1px': '1px',
        '2px': '2px',
        '3px': '3px',
        '5px': '5px',
        '6px': '6px',
        '7px': '7px',
        '9px': '9px',
        '10px': '10px',
        '11px': '11px',
        '13px': '13px',
        '14px': '14px',
        '15px': '15px',
        '17px': '17px',
        '18px': '18px',
        '19px': '19px',
        '30px': '30px',
        '48px': '48px',
        '44px': '44px',
        '84px': '84px',
        '200px': '200px',
        '224px': '224px',
        30: '120px',
        34: '136px',
        35: '140px'
      },
      width: {
        sidebar: '320px',
        logo: '240px',
        'logo-sm': '48px',
        sheet: '760px',
        form: '400px',
        card: '376px',
        'image-preview': '120px',
        'image-preview-sm': '200px',
        'image-preview-circle': '120px',
        'image-preview-circle-sm': '150px',
        'button-sm': '14px',
        popup: '480px',
        'popup-sm': '520px',
        'popup-md': '730px',
        'popup-lg': '1228px'
      },
      height: {
        footer: '88px',
        logo: '110px',
        table: 384,
        'logo-sm': '48px',
        'image-card': '200px',
        'image-preview': '90px',
        'image-preview-sm': '150px',
        'image-preview-circle': '120px',
        'image-preview-circle-sm': '150px',
        'button-sm': '14px'
      },
      fontFamily: {
        title0: ['Finador-Black', 'sans-serif'],
        title1: ['Finador-Black', 'sans-serif'],
        title2: ['Finador-Black', 'sans-serif'],
        title3: ['Finador-Black', 'sans-serif'],
        title4: ['Finador-Black', 'sans-serif'],
        title5: ['Finador-Bold', 'sans-serif'],
        title6: ['Finador-Bold', 'sans-serif'],
        title7: ['Finador-Bold', 'sans-serif'],
        caption: ['Finador-Medium', 'sans-serif'],
        link: ['Finador-Medium', 'sans-serif'],
        subhead: ['Finador-Medium', 'sans-serif'],
        button: ['Finador-Bold', 'sans-serif'],
        intro: ['Finador-Medium', 'sans-serif'],
        label: ['Finador-Bold', 'sans-serif'],
        body: ['Finador-Light', 'sans-serif'],
        bodybold: ['Finador-Medium', 'sans-serif'],
        'table-header': ['Finador-Bold', 'sans-serif'],
        'table-row': ['Finador-Regular', 'sans-serif']
      },
      fontSize: {
        title0: ['64px', '68px'],
        title1: ['50px', '50px'],
        title2: ['40px', '44px'],
        title3: ['32px', '38px'],
        title4: ['28px', '32px'],
        title5: ['24px', '26px'],
        title6: ['20px', '22px'],
        title7: ['16px', '20px'],
        caption: ['14px', '18px'],
        captionsmall: ['12px', '14px'],
        subhead: ['20px', '20px'],
        label: ['16px', '16px'],
        labelsmall: ['14px', '14px'],
        button: ['18px', '18px'],
        buttonsmall: ['16px', '16px'],
        intro: ['20px', '30px'],
        introdesktop: ['24px', '36px'],
        bodylarge: ['24px', '36px'],
        bodymedium: ['20px', '30px'],
        bodysmall: ['16px', '24px'],
        bodylinklarge: ['24px', '36px'],
        bodylinkmedium: ['30px', '30px'],
        link: ['16px', '24px'],
        table: ['14px', '14px']
      },
      minWidth: {
        '1/2': '50%',
        '3/4': '75%',
        button: '200px'
      },
      maxWidth: {
        card: '376px',
        form: '400px',
        sheet: '760px',
        popup: '480px',
        'popup-sm': '520px',
        'popup-md': '730px',
        'popup-lg': '1228px',
        '3/4': '75%',
        '9/10': '90%'
      },
      maxHeight: {
        dropdown: '317px',
        header1: '376px',
        form: '400px',
        mailto: '128px'
      }
    }
  },
  variants: {
    extend: {
      borderColor: ['active', 'hover', 'disabled'],
      borderWidth: ['active', 'hover', 'disabled'],
      ringColor: ['hover'],
      ringWidth: ['hover'],
      ringOpacity: ['hover'],
      ringOffsetColor: ['hover'],
      ringOffsetWidth: ['hover'],
      opacity: ['active', 'disabled'],
      padding: ['active'],
      boxShadow: ['active']
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.h-viewport': {
          height: 'calc(var(--vh, 1vh) * 100)'
        },
        '.scrollbar-hide': {
          /* Firefox */
          'scrollbar-width': 'thin',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
      addUtilities(newUtilities)
    })
  ]
}
