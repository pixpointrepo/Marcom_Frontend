

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  
  theme: {
    
    extend: {
      colors: {
        main: '#3B82F6', //blue
        secondary: '#FFB90B', //amber
        width: {
          'scroll-width': '8px', // Custom width for scrollbar
        },
      },
      fontFamily: {

        montserrat: ['Montserrat', 'sans-serif'], // For Google Fonts
        // custom: ['CustomFont', 'sans-serif'], // For Local Fonts
      },
      backgroundImage: {
        // 'home-section': "url('/src/assets/images/bg.jpg')",
      },
    
    },
  },
  plugins: [
    
  ],
}