/** @type {import('tailwindcss').Config} */
// import colors from 'tailwindcss/colors'
const colors = require('tailwindcss/colors')
module.exports = {
  content: [],
  theme: {
    extend: {
      container : {
        center: true,
        padding: '1rem',
      },
      colors: {
        cyan: colors.cyan,
        teal: colors.teal,
        'light-blue': colors.lightBlue,
      },
      spacing: {
        112: '28rem',
      }
    },
  },
  plugins: [],
}
