import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    root: 'src', // Specify the directory containing the index.html
    build: {
        outDir: '../build', // Output directory relative to the root
    },
});
