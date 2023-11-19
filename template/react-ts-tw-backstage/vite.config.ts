import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from '@arco-plugins/vite-plugin-svgr';
import vitePluginForArco from '@arco-plugins/vite-react';
import setting from './src/settings.json';

//确定路径重命名
const pathSrc = path.resolve(__dirname, 'src');
const pathTypes = path.resolve(__dirname, 'types');
// https://vitejs.dev/config/
export default defineConfig({
  base: '/redrock-datahub/',
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
    svgrPlugin({
      svgrOptions: {},
    }),
    vitePluginForArco({
      theme: '@arco-themes/react-arco-pro',
      modifyVars: {
        'arcoblue-6': setting.themeColor,
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
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
