import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import typegpu from 'unplugin-typegpu/vite'

// https://vite.dev/config/
export default defineConfig({
  // typegpu compiles the 'use gpu' shader functions in src/components/orbs
  plugins: [typegpu(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
