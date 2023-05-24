<template>
  <div class="container">
    <el-card>
      <template #header> <h2>使用方法</h2></template>
      <h3>使用iconify离线加载</h3>
      <p>
        <iconify-icon icon="ant-design:ant-cloud-outlined" />&lt;iconify-icon
        icon="ant-design:ant-cloud-outlined" /&gt;
      </p>
      <p>
        <iconify-icon icon="ep-add-location" class="text-purple-600" />&lt;iconify-icon
        icon="carbon-4k" /&gt;
      </p>

      <h3 class="mt-2">使用自动导入的element Plus图标</h3>
      <p class="flex"><i-ep-add-location class="text-orange-500" /> &lt;i-ep-add-location /&gt;</p>
      <p class="flex"><i-ep-aim /> &lt;i-ep-aim /&gt;</p></el-card
    >

    <el-tabs>
      <el-tab-pane :label="`antDesign(${antIconList.length})`">
        <IconLib :list="antIconList"
      /></el-tab-pane>
      <el-tab-pane :label="`Element Plus(${epIconList.length})`">
        <IconLib :list="epIconList"
      /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import IconLib from './IconLib.vue'

import { addCollection, disableCache, listIcons } from 'iconify-icon'
import antDesign from '@iconify-json/ant-design/icons.json'
import ep from '@iconify-json/ep/icons.json'
addCollection(antDesign)
addCollection(ep)
disableCache('all')
const epIconList = listIcons(undefined, 'ep')
const antIconList = listIcons(undefined, 'ant-design')
</script>
