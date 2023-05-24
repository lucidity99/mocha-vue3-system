<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      {{ currentLan }}
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="lang in langs" :command="lang">{{ lang.title }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { langs } from '~/locales'
import { useLocaleStore } from '~/store/locale'

const useLocale = useLocaleStore()

let curLocale = useLocale.locale
let currentLan = ref(langs.find((cur) => cur.key === curLocale)?.title || '')

function handleCommand(command: any) {
  currentLan.value = command.title
  useLocale.setLocale(command.key)
}
</script>
