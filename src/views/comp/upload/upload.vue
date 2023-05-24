<template>
  <div class="container">
    <el-card>
      <template #header>
        <h2>支持拖拽</h2>
      </template>
      <p class="mb-2">
        Element Plus自带上传组件。 访问地址：
        <a href="https://element-plus.org/zh-CN/component/upload.html" target="_blank"
          >Element Plus Upload</a
        >
      </p>
      <el-upload
        class="upload-demo"
        drag
        action="http://jsonplaceholder.typicode.com/api/posts/"
        multiple
        :on-change="handle"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
    </el-card>
    <el-card class="mt-4">
      <template #header>
        <div>支持裁剪</div>
      </template>
      <div class="plugins-tips">
        vue-cropperjs：一个封装了 cropperjs 的 Vue 组件。 访问地址：
        <a href="https://github.com/Agontuk/vue-cropperjs" target="_blank">vue-cropperjs</a>。
        示例请查看
        <router-link to="/system/profile">个人中心</router-link>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const handle = (rawFile: any) => {
  console.log(rawFile)
}
</script>

<style scoped>
.content-title {
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
.upload-demo {
  width: 360px;
}
</style>
