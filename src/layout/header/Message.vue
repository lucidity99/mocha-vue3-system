<template>
  <div class="w-8 cursor-pointer" @click="visible = true">
    <el-badge :value="message" class="item" :hidden="!message">
      <i class="text-xl el-icon-lx-notice"></i>
    </el-badge>
  </div>
  <el-drawer class="no-header" v-model="visible" size="80%" append-to-body>
    <MessageCenter />
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const message: number = 2

let visible = ref(false)

import MessageCenter from '~/views/messageCenter/index.vue'
</script>

<style lang="scss">
.el-drawer.no-header {
  overflow: visible;
  .el-drawer__header {
    height: 0;
    padding: 0;
    margin: 0;
  }
  .el-drawer__close-btn {
    background-color: var(--el-color-primary);
    position: absolute;
    left: -36px;
    top: 30%;
    border-radius: 4px 0 0 4px;
    color: #fff;
    padding: 8px;
  }
  .el-drawer__body {
    padding: 0;
  }
}
</style>
