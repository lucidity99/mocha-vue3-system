<template>
  <div class="container">
    <div class="relative">
      <div
        class="absolute z-0 top-[2px] left-[2px] grid w-[500px] h-[500px]"
        style="
          grid-template-columns: repeat(10, minmax(0, 1fr));
          grid-template-rows: repeat(10, minmax(0, 1fr));
        "
      >
        <div
          v-for="index in 100"
          class="inline-flex items-center justify-center border-b border-r"
        ></div>
      </div>
      <canvas ref="canvasRef" width="500" height="500" class="relative z-10 border"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const canvasRef = ref()
let ctx: any = null

onMounted(() => {
  ctx = canvasRef.value.getContext('2d')
  clock()
})
function clock() {
  var now = new Date()

  ctx.save()
  ctx.clearRect(0, 0, 500, 500)
  ctx.translate(200, 200)
  // ctx.scale(1, 1)
  ctx.rotate(-Math.PI / 2)
  ctx.strokeStyle = '#b9b9b9'
  ctx.fillStyle = '#b9b9b9'
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.lineCap = 'square'

  ctx.arc(0, 0, 150, 0, Math.PI * 2, true)
  ctx.fillStyle = '#4d4d4d'
  ctx.fill()

  // Hour marks
  ctx.save()
  for (var i = 0; i < 12; i++) {
    ctx.beginPath()
    ctx.rotate(Math.PI / 6)
    ctx.moveTo(136, 0)
    ctx.lineTo(142, 0)
    ctx.stroke()
  }
  ctx.restore()

  // text marks
  ctx.save()
  ctx.rotate(Math.PI / 2)
  for (var i = 1; i < 13; i++) {
    ctx.font = '18px arial'
    ctx.fillStyle = '#b9b9b9'

    let text = ctx.measureText(i)
    let x = 118 * Math.cos((30 * (i - 3) * Math.PI) / 180) - text.width / 2
    let y = 118 * Math.sin((30 * (i - 3) * Math.PI) / 180) + 7

    ctx.fillText(i, x, y)
  }
  ctx.restore()

  // Minute marks
  ctx.save()
  ctx.lineWidth = 2
  ctx.stokeStyle = '#eee'
  for (i = 0; i < 60; i++) {
    if (i % 5 != 0) {
      ctx.beginPath()
      ctx.moveTo(138, 0)
      ctx.lineTo(142, 0)
      ctx.stroke()
    }
    ctx.rotate(Math.PI / 30)
  }
  ctx.restore()

  var sec = now.getSeconds()
  var min = now.getMinutes()
  var hr = now.getHours()
  hr = hr >= 12 ? hr - 12 : hr

  ctx.fillStyle = 'black'

  // write Hours
  ctx.save()
  ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec)
  ctx.lineWidth = 8
  ctx.beginPath()
  ctx.moveTo(-20, 0)
  ctx.lineTo(80, 0)
  ctx.strokeStyle = '#222'
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(30, 0)
  ctx.lineTo(80, 0)
  ctx.strokeStyle = '#eee'
  ctx.stroke()
  ctx.restore()

  // write Minutes
  ctx.save()
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec)
  ctx.lineWidth = 6
  ctx.beginPath()
  ctx.moveTo(-28, 0)
  ctx.lineTo(30, 0)
  ctx.strokeStyle = '#222'
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(30, 0)
  ctx.lineTo(100, 0)
  ctx.strokeStyle = '#eee'
  ctx.stroke()
  ctx.restore()

  // Write seconds
  ctx.save()
  ctx.rotate((sec * Math.PI) / 30)
  ctx.strokeStyle = '#D40000'
  ctx.fillStyle = '#D40000'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(-30, 0)
  ctx.lineTo(90, 0)
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(95, 0, 5, 0, Math.PI * 2, true)
  ctx.stroke()
  ctx.fillStyle = 'rgba(0,0,0,0)'
  ctx.arc(0, 0, 3, 0, Math.PI * 2, true)
  ctx.fill()
  ctx.restore()

  ctx.beginPath()
  ctx.lineWidth = 6
  ctx.strokeStyle = '#494949'
  ctx.arc(0, 0, 150, 0, Math.PI * 2, true)
  ctx.stroke()

  ctx.restore()

  window.requestAnimationFrame(clock)
}

window.requestAnimationFrame(clock)
</script>
