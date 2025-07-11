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
  root: resolve(__dirname, 'client'), // ✅ Vite builds from the client folder
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
    outDir: resolve(__dirname, 'client', 'dist'), // ✅ Matches what Express serves
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
