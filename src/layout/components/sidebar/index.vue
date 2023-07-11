<template>
  <el-aside width="200px">
    <el-menu
      class="shadow bg-white/75 dark:bg-black/75 backdrop-blur-sm"
      :class="sidebar.collapse"
      :collapse="sidebar.collapse"
      router
    >
      <SidebarItem :item="item" v-for="item in items" :key="item.name" />
    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router'
import router from '~/router'
import { useSidebarStore } from '~/store/sidebar'
import { useUserStore } from '~/store/user'
import SidebarItem from './SidebarItem.vue'

const sidebar = useSidebarStore()
const useUser = useUserStore()

let items = <RouteRecordRaw[]>[]

if (import.meta.env.VITE_PERMISSION_MODE === 'CONSTANT') {
  items = router.options.routes.filter((r) => !r.hidden)
} else {
  items = useUser.menuRoutes
}

items = items.sort(
  (a: RouteRecordRaw, b: RouteRecordRaw) => (a?.meta?.order || 0) - (b?.meta?.order || 0)
)
</script>
