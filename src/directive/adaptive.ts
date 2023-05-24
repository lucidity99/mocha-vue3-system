import { DirectiveBinding } from 'vue'

interface ExHTMLElement extends HTMLElement {
  resizeListener: EventListener
}

export default {
  mounted: (el: ExHTMLElement, binding: DirectiveBinding) => {
    el.resizeListener = () => {
      setHeight(el, binding)
    }

    setHeight(el, binding)

    window.addEventListener('resize', el.resizeListener)
  },
  unmounted(el: ExHTMLElement) {
    window.removeEventListener('resize', el.resizeListener)
  },
  updated(el: ExHTMLElement, binding: DirectiveBinding) {
    setHeight(el, binding)
  }
}

// set el-table height
function setHeight(el: ExHTMLElement, binding: DirectiveBinding) {
  const top = el.offsetTop
  const bottom = binding?.value?.bottom || 84
  const pageHeight = window.innerHeight
  el.style.height = pageHeight - top - bottom + 'px'
  el.style.overflowY = 'auto'
}
