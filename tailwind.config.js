import defaultTheme from 'tailwindcss/defaultTheme'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        extendfont1:['"Bebas Neue"',  ...defaultTheme.fontFamily.sans],
        extendfont2:['"Cinzel"',  ...defaultTheme.fontFamily.sans],
        extendfont3:['"Cormorant Garamond"',  ...defaultTheme.fontFamily.sans],
        extendfont4:['"Oswald"',  ...defaultTheme.fontFamily.sans],
        extendfont5:['"Rethink Sans"',  ...defaultTheme.fontFamily.sans],
        extendfont6:['"Righteous"',  ...defaultTheme.fontFamily.sans],
        extendfont7:['"Sen"',  ...defaultTheme.fontFamily.sans],
        extendfont8:['"Sevillana"',  ...defaultTheme.fontFamily.sans],
        extendfont9:['"Whisper"',  ...defaultTheme.fontFamily.sans],
        extendfont10:['"forum"',  ...defaultTheme.fontFamily.sans],
      },
      colors:{
        primary:"#f1e1e0",
        second:"#c72846",
        third:'#4070F4',
        four:'#685CFE'
      }
    },
  },
  plugins: [import('@tailwindcss/forms'),],
}

