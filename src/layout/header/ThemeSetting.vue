<template>
  <div class="cursor-pointer" @click="visible = true">
    <i-ep-setting />
  </div>
  <el-drawer title="系统外观" v-model="visible" size="300px" append-to-body>
    <div class="flex">
      <div
        v-for="item in themes"
        :style="{ backgroundColor: item.color }"
        class="inline-flex items-center justify-center w-20 h-10 text-white border cursor-pointer"
        @click="changeColor(item.name)"
      >
        {{ item.name }}
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore } from '~/store/theme'

let visible = ref(false)

const useTheme = useThemeStore()

const themes = [
  { name: 'red', color: '#ff2551' },
  { name: 'pink', color: '#f47983' },
  { name: 'green', color: '#0c8918' },
  { name: 'brown', color: '#ae7000' },
  { name: 'grape', color: '#725e82' }
]

function changeColor(theme: string) {
  document.getElementsByTagName('html')[0].className = theme
  useTheme.scheme = theme
}
</script>
