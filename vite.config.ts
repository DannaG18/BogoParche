import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Repository pages are served from https://<usuario>.github.io/BogoParche/
  base: '/BogoParche/',
  plugins: [react()],
});
