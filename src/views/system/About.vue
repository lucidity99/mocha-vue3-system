<template>
  <div v-watermark>
    <PageHeader :title="$t('common.about')">
      <a target="_blank">mocha Vue3 Admin</a> 是一个基于Vue3.0、Vite、 Element Plus 、TypeScript
      的后台解决方案，目标是为项目开发,提供现成的开箱解决方案及丰富的示例。
    </PageHeader>

    <div class="container">
      <el-card>
        <template #header> 项目信息 </template>
        <div v-color="'red'">sdfsdf</div>
        <el-descriptions border>
          <el-descriptions-item label="版本信息"></el-descriptions-item>
          <el-descriptions-item label="文档地址"></el-descriptions-item>
          <el-descriptions-item label="最后构建时间">{{ lastBuildTime }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="mt-2">
        <template #header> 生产环境依赖 </template>
        <el-descriptions border>
          <el-descriptions-item
            class-name="desc-ct"
            label-class-name="desc-label"
            :label="item"
            v-for="(item, index) in Object.keys(dependencies)"
            >{{ dependencies[item] }}</el-descriptions-item
          >
        </el-descriptions>
      </el-card>
      <el-card class="mt-4">
        <template #header> 开发环境依赖 </template>
        <el-descriptions border>
          <el-descriptions-item
            class-name="desc-ct"
            label-class-name="desc-label"
            :label="item"
            v-for="(item, index) in Object.keys(devDependencies)"
            >{{ devDependencies[item] }}</el-descriptions-item
          >
        </el-descriptions>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
const { pkg, lastBuildTime } = __APP_INFO__
const { dependencies, devDependencies } = pkg
</script>

<style lang="scss">
.desc-ct {
  width: 10%;
}
.desc-label {
  width: 20%;
}
</style>
