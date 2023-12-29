/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: '#A729F5',
        'dark-navy': '#313E51',
        'navy': '#3B4D66',
        'grey-navy': '#626C7F',
        'light-bluish': '#ABC1E1',
        'light-grey': '#F4F6FA',
        'green': '#26D782',
        'red': '#EE5454'
      },
      fontSize: {
        display: '9rem',
        'headingL': '4rem',
        'headingM': '2.25rem',
        'headingS': '1.75rem',
        'bodyM': '0.75rem',
      }
    },
  },
  plugins: [],
}

