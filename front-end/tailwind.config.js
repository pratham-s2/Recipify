/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], 
        rollit: ['matemasie', 'sans-serif']
      },
      backgroundImage: {
        'recipify-bg': "url('/recipifyBg.jpg')",
      },
      screens: {
        'xl': '1600px'
      },
    },
  },
  plugins: [],
}

