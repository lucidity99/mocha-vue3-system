<template>
  <Layout :key="key">
    <router-view v-slot="{ Component }">
      <transition name="move" mode="out-in">
        <keep-alive :include="tags.nameList">
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </Layout>
</template>
<script setup lang="ts">
import { getCurrentInstance, h, render, ref } from 'vue'
import { useTagsStore } from '~/store/tags'
import { useThemeStore } from '~/store/theme'
import DefaultLayout from './default/index.vue'
import VerticalLayout from './vertical/index.vue'

const tags = useTagsStore()
const useTheme = useThemeStore()
let key = ref(useTheme.layoutScheme)
let Layout = useTheme.layoutScheme === 'default' ? DefaultLayout : VerticalLayout

useTheme.$subscribe((mutation, state) => {
  Layout = state.layoutScheme === 'default' ? DefaultLayout : VerticalLayout
  key.value = state.layoutScheme
})
</script>
