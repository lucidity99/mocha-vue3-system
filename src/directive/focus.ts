// 通过权限字符串判断是否有当前权限
import type { DirectiveBinding } from 'vue'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.querySelector('input')?.focus()
  }
}
