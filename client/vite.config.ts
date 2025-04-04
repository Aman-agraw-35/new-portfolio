import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import themePlugin from '@replit/vite-plugin-shadcn-theme-json';
import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    runtimeErrorOverlay(),
    themePlugin(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'client', 'src'),
      '@shared': resolve(__dirname, 'shared'),
    },
  },
  root: __dirname, // Set root to project root instead of 'client'
  publicDir: resolve(__dirname, 'client', 'public'), // Ensure public assets are correctly served
  build: {
    outDir: resolve(__dirname, 'dist'), // Store the build output in 'dist' folder
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'client', 'index.html'), // Explicitly specify the entry point
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
