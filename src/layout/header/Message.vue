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
