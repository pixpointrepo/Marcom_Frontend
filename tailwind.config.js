import typography from '@tailwindcss/typography';

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
      screens: {
        'custom1000px': '1000px',  // Custom breakpoint
        'custom1100px': '1100px',
        'custom1150px': '1150px',
        
        '2xl': '1536px',  // default for 2xl
        '1.5xl': '1440px',
        '3xl': '1920px',  // new breakpoint for large screens (e.g., 24-inch monitors)
        '4xl': '2560px',

        
      },
      maxWidth: {
        '8xl': '90rem',  // 1440px
        '9xl': '100rem', // 1600px
        '10xl': '120rem' // 1920px
      }
    
    },
  },
  plugins: [typography],
}