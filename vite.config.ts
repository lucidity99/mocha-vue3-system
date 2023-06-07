import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import dayjs from 'dayjs'
import pkg from './package.json'
import { createSvg } from './src/components/svgIcon/svg'

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export default ({ mode }) => {
  return defineConfig({
    base: './',
    server: {
      port: 9527,
      proxy: {
        '/api': {
          target: 'https://mock.apifox.cn/m1/2700315-0-default/', // 接口的域名
          secure: false, // 如果是https接口，需要配置这个参数
          changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
          rewrite: (path) => path.replace(/^\/api/, '/')
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            echarts: ['echarts']
          }
        }
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
      __APP_NAME__: JSON.stringify('mocha-vue3-admin')
    },

    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag === 'iconify-icon'
          }
        }
      }),
      vueJsx(),
      VueSetupExtend(),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          // Auto import icon components
          // 自动导入图标组件
          IconsResolver()
        ]
      }),
      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep']
          }),
          ElementPlusResolver({
            importStyle: mode === 'development' ? false : 'sass'
          })
        ]
      }),

      Icons({
        autoInstall: true
      }),

      // 使用unplugin-vue-components按需加载样式，开发环境会导致项目异常卡顿
      // 导致原因：vite会预加载style，当首次启动 vite 服务时会对 style 进行依赖预构建，，因为element-plus的按需样式会导入大量style文件，导致页面会卡住直至style构建完成
      // https://github.com/antfu/unplugin-vue-components/issues/361
      // 这里自定义一个vite插件，更改src/main.js内容，开发环境全局引入样式
      {
        name: 'import-element-plus-style',
        transform(code, id) {
          if (/src\/main.js$/.test(id)) {
            if (mode === 'development') {
              return {
                code: `${code};import 'element-plus/dist/index.css';`,
                map: null
              }
            } else {
              return {
                code: `${code};import 'element-plus/theme-chalk/src/message-box.scss';import 'element-plus/theme-chalk/src/message.scss';`,
                map: null
              }
            }
          }
        }
      },

      createSvg('./src/components/svgIcon/svgIcons/')
    ],

    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
        assets: `${path.resolve(__dirname, 'src/assets')}/`,
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/css/variables.scss" as *;`
        }
      }
    }
  })
}
