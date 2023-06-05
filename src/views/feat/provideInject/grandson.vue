<template>
  <div>
    <h4 class="mb-2">我是孙子组件，下面的值来自祖先组件</h4>
    <div class="text-blue-400">{{ message }}，{{ clientName }}</div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

const message = inject('message')
const clientName = inject('clientName')
</script>
