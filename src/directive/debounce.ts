// 节流
// 防止按钮多次点击，多次请求
import { DirectiveBinding } from 'vue'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const time = binding.value?.time || 1000
    const func = binding.value?.func || null
    el.timer = null

    el.addEventListener('click', () => {
      if (el.timer !== null) {
        clearTimeout(el.timer)
        el.timer = null
      }
      el.timer = setTimeout(() => {
        func && func()
      }, time)
    })
  }
}
