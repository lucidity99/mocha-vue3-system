<template>
  <div ref="chartRef" class="my-chart"></div>
</template>

<script setup lang="ts">
import {  onBeforeUnmount, onMounted, ref } from 'vue'
import echarts from './echarts'

const props = defineProps(['options'])
const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null
const resizeHandler = () => {
  chart?.resize()
}
onMounted(() => {
  setTimeout(() => {
    initChart()
  }, 20)
  window.addEventListener('resize', resizeHandler)
})

const initChart = () => {
  chart = echarts.init(chartRef.value as HTMLDivElement)
  chart.setOption({
    ...props.options
  })
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
  chart?.dispose()
})
</script>

<style lang="scss" scoped></style>
