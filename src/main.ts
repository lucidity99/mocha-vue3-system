import { createApp } from 'vue'

// pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import App from './App.vue'
import router from './router'

import './assets/css/index.scss'
import './assets/css/element/index.scss'

import 'element-plus/theme-chalk/dark/css-vars.css'

// 自定义主题方案
import './assets/css/theme.css'

const app = createApp(App)

// i18n
import i18n from './locales'
app.use(i18n)

app.use(pinia)
app.use(router)

import '~/router/permission'

// 在 main.ts文件中设置svg-icon为全局组件
import svgIcon from '~/components/svgIcon/index.vue'
app.component('svg-icon', svgIcon)
import 'iconify-icon'

// 注册指令
import directive from './directive'
directive(app)

// theme
import initTheme from '~/layout/theme'
initTheme(pinia)

// 引入VForm 设计器需全局引入Element Plus
// import ElementPlus from 'element-plus' //引入element-plus库
// import 'element-plus/dist/index.css' //引入element-plus样式
// //  引入并全局注册VForm 3组件
// import VForm3 from 'vform3-builds' //引入VForm 3库
// import 'vform3-builds/dist/designer.style.css' //引入VForm3样式
// app.use(ElementPlus) //全局注册element-plus
// app.use(VForm3)

// 应用实例会暴露一个 .config 对象允许我们配置一些应用级的选项，
// 例如定义一个应用级的错误处理器，用来捕获所有子组件上的错误：
app.config.errorHandler = (err, instance, info) => {
  console.error('error ---', err)
  console.error('instance ---', instance)
  console.error('info ---', info)
}
// 为 Vue 的运行时警告指定一个自定义处理函数
app.config.warnHandler = (msg, instance, trace) => {
  // `trace` is the component hierarchy trace
}

app.config.globalProperties.$globalMsg = 'hello'

app.provide('$globalName', 'mocha-vue3-admin')
app.mount('#app')
