import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    AutoImport({
      imports: [
        'vue', // 自动导入 vue 的 ref, reactive, computed 等
        'vue-router', // 自动导入 useRouter, useRoute
        'pinia',
      ],
      dts: 'src/auto-imports.d.ts', // 生成 TS 类型声明
      eslintrc: {
        enabled: true, // 自动生成 eslint 配置
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
  ],
})
