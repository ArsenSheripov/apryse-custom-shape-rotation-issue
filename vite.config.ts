import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'app', replacement: fileURLToPath(new URL('./src/app', import.meta.url)) },
      { find: 'pages', replacement: fileURLToPath(new URL('./src/pages', import.meta.url)) },
      { find: 'widgets', replacement: fileURLToPath(new URL('./src/widgets', import.meta.url)) },
      { find: 'features', replacement: fileURLToPath(new URL('./src/features', import.meta.url)) },
      { find: 'entities', replacement: fileURLToPath(new URL('./src/entities', import.meta.url)) },
      { find: 'shared', replacement: fileURLToPath(new URL('./src/shared', import.meta.url)) },
    ],
  },
  optimizeDeps: {
    include: ['@dnd-kit/utilities'],
  },
  css: {
    preprocessorOptions: {

    },
  },
});
