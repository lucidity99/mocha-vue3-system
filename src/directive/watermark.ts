import { DirectiveBinding } from 'vue'

// 水印
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    let txt = 'hello world'
    let style = {}
    if (binding && binding.value) {
      txt = binding.value.txt
      style = binding.value.style
    }
    genWatermark(el, txt, style)
  }
}

interface CanvasTextStyle {
  font?: string
  color?: string
}

function genWatermark(el: HTMLElement, txt: string, style?: CanvasTextStyle) {
  const defaultStyle = {
    font: '14px arial',
    color: 'rgba(0,0,0,0.2)'
  }

  let canvas = <HTMLCanvasElement>document.createElement('canvas')
  let ctx = <CanvasRenderingContext2D>canvas.getContext('2d')

  ctx.translate(150, 75)
  ctx.rotate((Math.PI / 180) * 25)
  ctx.translate(-150, -75)

  ctx.font = style?.font || defaultStyle.font
  ctx.fillStyle = style?.color || defaultStyle.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.fillText(txt, canvas.width / 2, canvas.height / 2)

  el.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`
}
