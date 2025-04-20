import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'server',
  vite: {
    build: {
      rollupOptions: {
        external: ['firebase/app', 'firebase/firestore']
      }
    }
  }
});