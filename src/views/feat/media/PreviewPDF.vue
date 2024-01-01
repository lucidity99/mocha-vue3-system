<!--
 * @Author: lucidity99 lucidity929@163.com
 * @Date: 2023-05-19 09:39:08
 * @LastEditors: lucidity99 lucidity929@163.com
 * @LastEditTime: 2023-10-26 14:23:59
 * @FilePath: /mocha-vue3-system/src/views/feat/media/PreviewPDF.vue
 * @Description:
 *
 * 湖南灵之心, All Rights Reserved.
-->
<template>
  <div class="m-4 shadow">
    <div class="flex">
      <div class="mr-4" @click="changePDF('/Javascript中的函数.pdf')">Javascript中的函数</div>
      <div @click="changePDF('/L16 心动-编配谱.pdf')">《心动》钢琴谱</div>
    </div>
    <div v-adaptive>
      <vue-pdf-embed
        ref="pdfRef"
        :source="pdfSource"
        :page="page"
        :width="width"
        class="transition-all"
        @password-requested="handlePasswordRequest"
        @rendered="handleDocumentRender"
      />
    </div>

    <div class="flex items-center justify-center py-2" ref="wpRef">
      <el-button :disabled="page <= 1" @click="page--">❮</el-button>
      <span class="mx-4">{{ page }} / {{ pageCount }}</span>
      <el-button :disabled="page >= pageCount" @click="page++">❯</el-button>

      <i-ep:zoom-out
        @click="zoom(-1)"
        class="ml-8 text-lg cursor-pointer"
        :class="scale < 0.3 ? 'text-gray-300 cursor-not-allowed	' : ''"
      ></i-ep:zoom-out>
      <i-ep:zoom-in
        @click="zoom(1)"
        class="ml-4 text-lg cursor-pointer"
        :class="scale > 5 ? 'text-gray-300 cursor-not-allowed	' : ''"
      ></i-ep:zoom-in>

      <el-button @click="print" class="ml-8">打印</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'

const pdfRef = ref()
const wpRef = ref()

let pdfSource = ref('/演示文稿1.pdf')
let isLoading = ref(true)
let page = ref(1)
let scale = ref(1)
let pageCount = ref(0)
let wpWidth = 0
let width = ref(0)

onMounted(() => {
  wpWidth = wpRef.value.clientWidth
  width.value = wpWidth
})

function handleDocumentRender() {
  isLoading.value = false
  pageCount.value = pdfRef.value.pageCount
}

function zoom(type: number) {
  if ((scale.value < 0.3 && type === -1) || (scale.value > 5 && type === 1)) return

  scale.value = scale.value + type * 0.1
  width.value = scale.value * wpWidth
}

function print() {
  pdfRef.value.print(150, null, true)
}
function handlePasswordRequest(callback: any, retry) {
  callback(prompt(retry ? 'Enter password again' : 'Enter password'))
}

function changePDF(source: string) {
  pdfSource.value =
    'http://118.89.81.22:9527/L16%20%E5%BF%83%E5%8A%A8-%E7%BC%96%E9%85%8D%E8%B0%B1.pdf'
  // pdfSource.value = source
  page.value = 1
}
</script>
