import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    include: ['src/tests/**/*.test.tsx', 'src/tests/**/*.test.ts'],
    coverage: {  // (Opcional) Para habilitar la cobertura de pruebas
      reporter: ['text', 'json', 'html'],
    }
  }
});