import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  server: {
    proxy: {
      '/api': process.env.VITE_API_URL || 'http://localhost:5001',
      '/uploads': process.env.VITE_API_URL || 'http://localhost:5001',
    },
  },
}) 