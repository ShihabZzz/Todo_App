/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'custom-fit': 'repeat(auto-fit, minmax(250px, 1fr))',
      },
      screens: {
        'xs': '360px',
        '3xl': '1720px',
      },
    },
  },
  plugins: [],
}
