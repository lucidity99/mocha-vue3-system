// 限制输入数字
import { DirectiveBinding } from 'vue'

interface ExHTMLElement extends HTMLElement {
  inputListener: EventListener
}

export default {
  mounted(el: ExHTMLElement, binding: DirectiveBinding) {
    const decimal = binding.value?.decimal || 2
    const elInput = el.getElementsByTagName('input')[0]

    let regDecimal: RegExp
    if (decimal > 0) regDecimal = new RegExp(`^\\d*(.?\\d{0,${decimal}})`, 'g')
    else regDecimal = new RegExp(`^\\d*`, 'g')

    let locking = false
    elInput.onkeyup = (e) => {
      if (locking) {
        return
      }
      let val = elInput.value
      elInput.value =
        val
          .replace(/[^\d^\.]+/g, '')
          .replace(/^0+(\d)/, '$1')
          .replace(/^\./, '0.')
          .match(regDecimal)[0] || ''
      if (val !== elInput.value && !locking) {
        elInput.dispatchEvent(new Event('input'))
      }
    }

    elInput.addEventListener('compositionstart', () => {
      locking = true //解决中文输入双向绑定失效
    })
    elInput.addEventListener('compositionend', () => {
      locking = false //解决中文输入双向绑定失效
    })
  },
  unmounted(el: ExHTMLElement) {
    el.getElementsByTagName('keyup')[0].removeEventListener('input', el.inputListener)
  }
}
