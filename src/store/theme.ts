import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    let css = ref({})
    // UI主题
    let scheme = ref('')
    // 布局方案
    let layoutScheme = ref('default')

    // 设置配色主题
    function setScheme(str: string) {
      scheme.value = str
    }

    // 设置CSS Vars
    function setCSS(property: string, value: string) {
      css.value[property] = value
    }

    // 设置用户定义的CSS变量
    function setCustomized(vars: any) {
      Object.keys(vars).forEach((item) => {
        setCSS(vars[item].key, vars[item].value)
      })
    }

    // 设置布局方案
    function setLayoutScheme(layout: string) {
      layoutScheme.value = layout
    }

    return { scheme, css, layoutScheme, setCSS, setScheme, setCustomized, setLayoutScheme }
  },
  {
    persist: true
  }
)
