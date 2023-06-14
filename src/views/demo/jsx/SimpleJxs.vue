<!-- <script lang="tsx">
import { ref, h } from 'vue'

export default {
  setup(props) {
    const count = ref(1)

    // 返回渲染函数
    return () =>
      h(
        'div',
        Array.from({ length: 20 }).map(() => {
          return h('p', 'hi')
        })
      )
  }
}
</script> -->
<template>
  <hd />
</template>
<script lang="tsx" setup>
import { h } from 'vue'

// 返回渲染函数
const hd = h(
  'div',
  Array.from({ length: 20 }).map(() => {
    return h('p', 'hi')
  })
)
</script>
