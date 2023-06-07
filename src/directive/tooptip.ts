import { DirectiveBinding, h, render } from 'vue'
import { ElTooltip, ElTag } from 'element-plus'
import { QuestionFilled } from '@element-plus/icons-vue'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const message = binding.value.message
    const placement = binding.value.placement || 'top'
    const effect = binding.value.effect || 'light'
    const position = binding.value.position || 'left'
    if (binding.value.message) {
      const vnode = h(
        ElTooltip,
        { content: message, placement, effect },
        h(QuestionFilled, { style: { width: '16px' } })
      )

      const dom = document.createElement('span')
      if (position === 'left') el.prepend(dom)
      else el.append(dom)

      render(vnode, dom)
    }
  }
}
