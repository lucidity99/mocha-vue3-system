import { Pinia } from 'pinia'
import { useThemeStore } from '~/store/theme'

export default (pinia: Pinia) => {
  const useTheme = useThemeStore(pinia)
  // const el = document.documentElement

  if (useTheme.scheme) {
    document.getElementsByTagName('html')[0].className = useTheme.scheme
  }
}
