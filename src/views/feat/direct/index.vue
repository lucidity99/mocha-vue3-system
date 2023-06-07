<template>
  <div class="m-4">
    <el-card>
      <template #header>v-inputNumber 数字输入指令</template>
      <div class="flex justify-around">
        <div>
          <div>限制输入数字</div>
          <el-input v-model="inputValue1" v-inputNumber class="w-48" />
        </div>
        <div>
          <div>限制输入数字,保留3位小数</div>
          <el-input v-model="inputValue2" v-inputNumber="{ decimal: 3 }" class="w-48" />
        </div>
      </div>
    </el-card>

    <el-card class="mt-4">
      <template #header>v-tooptip 提示信息指令</template>
      <div class="flex justify-around">
        <div v-tooptip="{ message: '我是一个说明', effect: 'dark' }">我有一个说明文字</div>
        <div v-tooptip="{ message: '我是一个说明', position: 'right' }">我有一个说明文字在右边</div>
      </div>
    </el-card>

    <el-card class="mt-4">
      <template #header>v-copy 拷贝指令</template>
      <div class="flex justify-around">
        <div v-copy>222</div>
        <div><el-tag v-copy="{ position: 'out' }">343434</el-tag></div>
      </div>
    </el-card>

    <el-card class="mt-4">
      <template #header>v-throttle 节流指令</template>
      <div class="flex justify-around">
        <el-button type="primary" v-throttle @click="testThrottle(100)"
          >点击我（间隔1秒）！</el-button
        >
        <el-button type="primary" v-throttle="{ time: 3000 }" @click="testThrottle(200)"
          >点击我(间隔3秒)！</el-button
        >
      </div>
    </el-card>

    <el-card class="mt-4">
      <template #header>v-debounce 防抖指令</template>
      <div class="flex justify-around">
        <el-button type="success" v-debounce="{ func: () => testDebounce() }"
          >点击我（间隔1秒）！</el-button
        >
        <el-button type="success" v-debounce="{ time: 3000, func: () => testDebounce() }"
          >点击我(间隔3秒)！</el-button
        >
      </div>
      <div class="mt-4 text-center" v-if="debounceFlag">{{ now }}</div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let inputValue1 = ref(0)
let inputValue2 = ref(0)

function testThrottle(num) {
  console.log('throttle', num)
}

let debounceFlag = ref(false)
let now = ref(new Date())

function testDebounce() {
  debounceFlag.value = true
  console.log(111)
  now.value = new Date()
}
</script>
