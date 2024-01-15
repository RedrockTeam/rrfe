import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
//确定路径重命名
const pathSrc = path.resolve(__dirname, 'src');
const pathTypes = path.resolve(__dirname, 'types');
// https://vitejs.dev/config/
export default defineConfig({
  base: '//',
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      '~/': `${pathTypes}/`,
      '@/': `${pathSrc}/`,
    },
  },
  plugins: [
    react(),
    
  ],
  css: {
    postcss: {
      plugins: [autoprefixer({}),tailwindcss],
    },
  },
  server: {
    hmr: { overlay: false },
    host: '0.0.0.0',
    port: 8011,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'https://be-dev.redrock.cqupt.edu.cn',
        changeOrigin: true,
        rewrite: (path: string): string => path.replace(/^\/api/, ''),
      },
    },
  },
});
