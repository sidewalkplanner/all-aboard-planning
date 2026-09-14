import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this as a project site at /all-aboard-planning/,
  // so asset URLs need that prefix baked in.
  base: '/all-aboard-planning/',
})
