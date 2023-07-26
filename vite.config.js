import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  devServer: {
    port:5173,//vue网页访问的端口
    host:"127.0.0.1",//vue网页访问的地址
    https:false,
    open:false,
    proxy: {
      '/api': {
        target: 'http://192.168.20.116/', // 后端接口地址
        secure:true,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
