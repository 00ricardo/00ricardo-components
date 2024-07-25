import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      input: './src/main.tsx',
      output: {
        entryFileNames: 'output.js',
        manualChunks: {
          'react-vendors': ['react', 'react-dom'],
          'mui-vendors': ['@mui/material', '@mui/icons-material'],
          'lottie-vendors': ['lottie-react'],
        },
      },
    },
  },
  plugins: [react()],
});
