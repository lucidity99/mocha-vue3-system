import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    let css = ref({})
    let scheme = ref('')

    // 设置配色主题
    function setScheme(str: string) {
      scheme.value = str
    }

    // 设置CSS Vars
    function setCSS(property: string, value: string) {
      css.value[property] = value
    }

    return { scheme, css, setCSS, setScheme }
  },
  {
    persist: true
  }
)
