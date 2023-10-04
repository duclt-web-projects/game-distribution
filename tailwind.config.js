/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./vueform.config.js", // or where `vueform.config.js` is located
    "./node_modules/@vueform/vueform/themes/tailwind/**/*.vue",
    "./node_modules/@vueform/vueform/themes/tailwind/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@vueform/vueform/tailwind"),
  ],
  extend: {
    form: (theme) => ({
      primary: '#e5e7eb',
      primaryDarker: '#cccdcf',
    })
  }
}