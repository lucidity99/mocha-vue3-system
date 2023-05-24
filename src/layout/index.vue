<template>
  <v-header :class="{ 'header-collapse': sidebar.collapse }" />
  <v-tags :class="{ 'tag-collapse': sidebar.collapse }"></v-tags>
  <v-sidebar class="siderbar" />
  <div class="main-content" :class="{ 'content-collapse': sidebar.collapse }">
    <router-view v-slot="{ Component }">
      <transition name="move" mode="out-in">
        <keep-alive :include="tags.nameList">
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts">
import { useSidebarStore } from '~/store/sidebar'
import { useTagsStore } from '~/store/tags'
import vHeader from './header/index.vue'
import vSidebar from './sidebar/index.vue'
import vTags from './tags/index.vue'

const sidebar = useSidebarStore()
const tags = useTagsStore()
</script>
