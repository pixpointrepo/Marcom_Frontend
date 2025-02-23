import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: './postcss.config.js',
  },
  plugins: [react()],
  server: {
    port:3003
    // allowedHosts: [
    //   '9152-27-34-66-33.ngrok-free.app', // Add your ngrok URL
    //   'localhost',                     // Allow localhost (important!)
    //   // Add other hosts if needed, e.g., your local network IP
    //   // or '*' for all hosts (USE WITH CAUTION IN PRODUCTION)
    // ],
  },
})
