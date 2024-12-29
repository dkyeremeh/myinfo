import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'ui', // Specify the directory containing the index.html
  build: {
    outDir: '../dist', // Output directory relative to the root
  },
});
