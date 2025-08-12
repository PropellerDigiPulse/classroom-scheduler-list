import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), legacy({
      targets: ['defaults', 'Chrome 49', 'ie 11'], // Chrome 49 ≈ Chromium 56
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),],
  build: {
    target: 'es2015', // transpile to ES5-compatible output
  },
})
