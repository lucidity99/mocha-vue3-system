<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color, width: w, height: h }">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script setup lang="ts">
import { computed } from 'vue'
/*
 * name  名字 必填
 * color 颜色
 * w     宽度
 * h     高度
 */
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  w: {
    type: String,
    default: '2rem'
  },
  h: {
    type: String,
    default: '2rem'
  }
})

const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  if (props.name) return `svg-icon icon-${props.name}`
  return 'svg-icon'
})
</script>
<style scoped>
.svg-icon {
  /* 此属性为更改svg颜色属性设置 */
  fill: currentColor;
  vertical-align: middle;
}
</style>
