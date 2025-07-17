import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgLoader from 'vite-svg-loader'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgLoader()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    historyApiFallback: true,
    watch: {
      usePolling: true
    }
  }
})
