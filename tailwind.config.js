/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "index.html"
  ],
  theme: {
    extend: {
        colors: {
          'main': '#2EFF93',
          'error':"#FF0015"
        },
        
      }
  },
  plugins: [],
}