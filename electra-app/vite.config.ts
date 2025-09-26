import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // fuerza a Vite a escuchar en localhost
    port: 5173          // puerto que ya estás usando
  }
})
