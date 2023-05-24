<template>
  <el-config-provider :locale="locales[useLocale.locale]">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zh from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

import { useLocaleStore } from './store/locale'

const locales = {
  zh: zh,
  en: en
}
const useLocale = useLocaleStore()
</script>
