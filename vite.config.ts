import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
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
          'mui-core': ['@mui/material'],
          'mui-icons': ['@mui/icons-material'],
          'mui-system': ['@mui/system'],
          //'storybook': ['lottie-react'],
        },
      },
    },
  },
  plugins: [react(), visualizer({ open: true })],
});
