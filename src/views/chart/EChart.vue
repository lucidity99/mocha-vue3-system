<template>
  <div class="container">
    <el-row :gutter="16">
      <el-col :span="12">
        <el-card> <my-echart :options="options1" style="height: 300px"></my-echart> </el-card
      ></el-col>
      <el-col :span="12">
        <el-card> <my-echart :options="options2" style="height: 300px"></my-echart> </el-card
      ></el-col>
    </el-row>
    <el-row class="mt-4" :gutter="16">
      <el-col :span="12">
        <el-card> <my-echart :options="options3" style="height: 300px"></my-echart> </el-card
      ></el-col>
      <el-col :span="12">
        <el-card> <my-echart :options="options4" style="height: 300px"></my-echart> </el-card
      ></el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import MyEchart from '~/components/echarts/MyEchart.vue'
import { reactive } from 'vue'

const options1 = reactive({
  title: {
    text: '柱状图'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
})

const options2 = reactive({
  title: {
    text: '饼图',
    subtext: 'Fake Data',
    left: 'left'
  },
  tooltip: {
    trigger: 'item'
  },

  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})

const options3 = reactive({
  title: {
    text: '折线图',
    left: 'left'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
})

const options4 = reactive({
  title: {
    text: '南丁格尔玫瑰图',
    subtext: 'Fake Data',
    left: 'left'
  },
  legend: {
    top: 'bottom'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [50, 120],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
        { value: 26, name: 'rose 6' },
        { value: 22, name: 'rose 7' },
        { value: 18, name: 'rose 8' }
      ]
    }
  ]
})
</script>
