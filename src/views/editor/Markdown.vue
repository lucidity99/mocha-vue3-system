<template>
  <div>
    <PageHeader title="markdown 编辑器">
      md-editor-v3：vue3版本的 markdown 编辑器，配置丰富。
      <a href="https://imzbf.github.io/md-editor-v3/index" target="_blank">md-editor-v3 文档</a>
    </PageHeader>
    <div class="mx-4">
      <md-editor v-model="text" @on-upload-img="onUploadImg" />
    </div>
    <div class="mt-4 text-center"><el-button type="primary">提交</el-button></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const text = ref('Hello Editor!')
const onUploadImg = (files: any) => {
  console.log(files)
}
</script>
