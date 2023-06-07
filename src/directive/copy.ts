import { DirectiveBinding } from 'vue'
import { copyText } from 'vue3-clipboard'
import { ElMessage } from 'element-plus'

interface ExHTMLElement extends HTMLElement {
  clickListener: EventListener
  trigger?: HTMLElement
}

// 复制图标
const svg =
  '<svg viewBox="0 0 1024 1024" width="1.25em" height="1.2em"><path fill="currentColor" d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"></path><path fill="currentColor" d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"></path></svg>'

export default {
  mounted(el: ExHTMLElement, binding: DirectiveBinding) {
    // 动态增加复制图标
    el.trigger = document.createElement('span')
    el.trigger.style.marginLeft = '4px'
    el.trigger.style.cursor = 'pointer'
    el.trigger.innerHTML = svg

    // 复制图标的位置
    if (binding.value?.position === 'out') el.after(el.trigger)
    else el.append(el.trigger)

    el.clickListener = () => {
      const text = el.innerText
      copyText(text, undefined, (error: string, event: Event) => {
        if (error) {
          ElMessage({ type: 'error', message: '未能复制', duration: 2000 })
          console.log(error)
        } else {
          ElMessage({ type: 'success', message: '复制成功', duration: 2000 })
          console.log(event)
        }
      })
    }
    el.trigger.addEventListener('click', el.clickListener)
  },

  unmounted(el: ExHTMLElement) {
    el.trigger?.removeEventListener('resize', el.clickListener)
  }
}
