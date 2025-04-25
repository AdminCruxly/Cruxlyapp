import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  vite: {
    build: {
      rollupOptions: {
        output: {
          format: 'esm'
        }
      }
    },
    optimizeDeps: {
      include: ['firebase/app', 'firebase/firestore', 'firebase/analytics']
    },
    ssr: {
      noExternal: ['firebase']
    }
  }
});