<template>
  <div class="p-10 text-center">
    <div class="mb-20 text-xxl">404</div>
    <div class="mb-20">您访问的页面不存在</div>
    <div>
      <router-link to="/">
        <el-button type="primary" class="mr-10">返回首页</el-button>
      </router-link>
      <el-button type="primary" @click="goBack">返回上一页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="403">
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => {
  router.go(-2)
}
</script>

<style scoped></style>
