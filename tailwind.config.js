const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons')
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.indigo,
        secondary: colors.teal,
        accent: colors.pink,
        success: colors.green,
        info: colors.blue,
        warning: colors.yellow,
        error: colors.red,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    iconsPlugin({
      collections: getIconCollections(['mdi', 'mi', 'fa', 'eos-icons', 'twemoji', 'heroicons', 'fa-brands', 'fa-regular', 'fa-solid']),
    }),
  ],
}
