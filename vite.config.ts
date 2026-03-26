import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: ['beth-diapasonal-zola.ngrok-free.app', 'beth-diapasonal-zola.ngrok-free.dev'],
  },
})
