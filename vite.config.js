import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn,util } from 'vite-plugin-monkey';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import path from 'path';
function resolve(dir) {
  return path.resolve(__dirname, dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      // 配置组件解析器
      dts: 'src/components.d.ts', // 生成 TypeScript 声明文件的路径
    }),
    AutoImport({
      imports: [
        'vue', // 自动导入 Vue 相关函数，如 ref, reactive, toRefs 等
        '@vueuse/core', // 自动导入 @vueuse/core 库的函数
        util.unimportPreset, // 自动导入 util.unimportPreset 的函数
      ],
      dts: 'src/auto-imports.d.ts', // 生成 TypeScript 声明文件的路径
    }),
    monkey({
      entry: 'src/main.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['http://127.0.0.1:5500/*','https://www.xiaohongshu.com/*'],
        connect:['*']
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve("src"),
      components: resolve("src/components"),
      assets: resolve("src/assets"),
    }
  },
});
