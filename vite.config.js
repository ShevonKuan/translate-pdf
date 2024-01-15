import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
        vue({
            template: {
                compilerOptions: {
                    // 所有以 mdui- 开头的标签名都是 mdui 组件, 不要把 mdui 组件当成 Vue 组件来解析
                    isCustomElement: (tag) => tag.startsWith('mdui-')
                }
            }
        }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
