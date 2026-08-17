import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// PENTING: Ganti 'video-pembelajaran' di bawah dengan nama repository GitHub Anda
export default defineConfig({
  plugins: [react()],
  base: '/mindstream/',
})
