import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Раскомментируйте base, если деплоите на GitHub Pages в подпапку:
  // base: '/your-repo-name/',
})
