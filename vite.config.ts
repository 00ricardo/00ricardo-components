import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      //external: ['@tiptap/suggestion'],
    },
  },
  plugins: [react(), visualizer({ open: false, gzipSize: true })],
});
