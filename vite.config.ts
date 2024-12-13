import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  plugins: [
    react(),
    compression({
      algorithm: 'gzip', // Use gzip for text compression
      ext: '.gz', // File extension for compressed files
      threshold: 1024, // Compress files larger than 1 KB
      deleteOriginFile: false, // Keep the original file
    }),
  ],
});

