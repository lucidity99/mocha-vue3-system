<template>
  <div>
    <div class="msg">{{ msg }}</div>
    <el-button id="btnClick" @click="onClick">click me</el-button>
    <div class="box" v-if="visible">hello</div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
let msg = ref('Hello,jest')
let visible = ref(true)
function onClick() {
  msg.value = 'Bye'
  // visible.value = false
}

nextTick(() => {
  visible.value = false
})
</script>
