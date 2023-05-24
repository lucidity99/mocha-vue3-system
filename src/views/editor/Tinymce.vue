<template>
  <div>
    <PageHeader title="富文本编辑器 Tinymce">
      Version 4 and later of the tinymce-vue package supports Vue.js 3.x, but does not support
      Vue.js 2.x.
      <a href="https://www.tiny.cloud/docs/tinymce/6/vue-cloud/" target="_blank"
        >tiny docs
      </a></PageHeader
    >
    <div class="mx-4" v-loading="loading">
      <Editor v-model="content" :api-key="apiKey" :init="init" />
      <div class="mt-4 text-center"><el-button @click="save">保存</el-button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Editor from '@tinymce/tinymce-vue'

const apiKey = 'xxx'
const example_image_upload_handler = (blobInfo, progress) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = false
    xhr.open('POST', 'https://mock.apifox.cn/m1/2700315-0-default/uploadTiny')

    xhr.upload.onprogress = (e) => {
      progress((e.loaded / e.total) * 100)
    }

    xhr.onload = () => {
      if (xhr.status === 403) {
        reject({ message: 'HTTP Error: ' + xhr.status, remove: true })
        return
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        reject('HTTP Error: ' + xhr.status)
        return
      }

      const json = JSON.parse(xhr.responseText)

      if (!json || typeof json.location != 'string') {
        reject('Invalid JSON: ' + xhr.responseText)
        return
      }

      resolve(json.location)
    }

    xhr.onerror = () => {
      reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status)
    }

    const formData = new FormData()
    formData.append('file', blobInfo.blob(), blobInfo.filename())

    xhr.send(formData)
  })

let loading = ref(true)
function afterInit() {
  loading.value = false
}

const init = {
  language: 'zh_CN',
  plugins: 'lists link image table code help wordcount',
  init_instance_callback: afterInit,
  toolbar: [
    // 数组写法
    'undo redo | formatselect | bold italic underline strikethrough | fontsizeselect | hr bullist numlist outdent indent blockquote subscript superscript | alignleft | aligncenter | alignright | image media | selectall codesample fullscreen preview searchreplace',
    'table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol'
  ],
  // images_upload_url: 'https://mock.apifox.cn/m1/2700315-0-default/uploadTiny',
  // images_upload_base_path: '/demo',
  images_upload_handler: example_image_upload_handler
}

let content = ref()
function save() {
  console.log(content.value)
}
</script>
