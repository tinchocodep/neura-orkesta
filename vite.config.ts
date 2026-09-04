import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // La forma de objeto de manualChunks dejaba a React adentro del chunk
        // 'framer' (framer-motion depende de React y Rollup lo resolvía ahí
        // primero). Eso obligaba a precargar framer-motion en el <head> junto
        // con el runtime, aunque ninguna sección above-the-fold lo use.
        // Con la forma de función el reparto es explícito: React va al camino
        // crítico, framer-motion queda aislado detrás de las secciones lazy.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (
            id.includes('framer-motion') ||
            id.includes('motion-dom') ||
            id.includes('motion-utils')
          ) return 'framer'
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/scheduler/')
          ) return 'react'
        },
      }
    }
  }
})
