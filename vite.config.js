import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173
    // Quitamos el proxy de aquí para manejar la URL de forma dinámica
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
