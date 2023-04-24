/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['"Space Grotesk"']
      },
      keyframes: {
        slidefromtop: {
          '0%': { 'max-height': '0px' },
          '100%': {'max-height': '100px' }
        },
        contract: {
          '0%': {'max-height': '100px' },
          '100%': {'max-height': '0px' }
        }
      },
      animation: {
        slidefromtop: 'slidefromtop 0.6s ease-in-out',
        contract: 'contract 0.6s ease-in-out forwards'
      },
    },
  },
  plugins: [],
}
