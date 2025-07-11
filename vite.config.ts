import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import themePlugin from '@replit/vite-plugin-shadcn-theme-json';
import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Only used in vite.config.ts — safe for frontend config
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: resolve(__dirname, 'client'), // ✅ Vite's root points to your frontend
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
  build: {
    outDir: resolve(__dirname, 'dist', 'public'),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'client', 'index.html'),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
