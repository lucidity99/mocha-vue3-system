import { DirectiveBinding } from 'vue'

import { useUserStore } from '~/store/user'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const val = binding.value
    const useUser = useUserStore()
    const role = useUser.role
    const parentEl = el.parentElement

    let flag = true
    // 可以传入字符串和数组
    if (typeof val === 'string') {
      flag = role === val
    } else {
      flag = val.includes(role)
    }

    if (!flag) parentEl?.removeChild(el)
  }
}
