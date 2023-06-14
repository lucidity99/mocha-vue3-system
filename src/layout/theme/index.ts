import { Pinia } from 'pinia'
import { useThemeStore } from '~/store/theme'

export default (pinia: Pinia) => {
  const useTheme = useThemeStore(pinia)
  // const el = document.documentElement

  // 如果有缓存的主题方案
  if (useTheme.scheme) {
    document.getElementsByTagName('html')[0].className = useTheme.scheme
  }
  // 如果有缓存的自定义设置
  if (useTheme.css) {
    console.log(useTheme.css)
    Object.keys(useTheme.css).forEach((val) => {
      document.documentElement.style.setProperty(val, useTheme.css[val])
    })
  }
}
