import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import i18n from '~/locales'

export const useLocaleStore = defineStore(
  'locale',
  () => {
    let locale = ref(i18n.global.locale.value)
    let currentLocale = computed(() => {
      return locale
    })
    // 设置locale
    function setLocale(lang) {
      locale.value = lang
      i18n.global.locale.value = lang
    }

    return { locale, currentLocale, setLocale }
  },
  {
    persist: true
  }
)
