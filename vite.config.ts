import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Ваши другие настройки конфигурации...
  define: {
    'process.env.HTTPS': false
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://193.233.49.179:3002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react()]
});
