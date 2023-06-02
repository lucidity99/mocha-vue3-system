<template>
  <el-aside width="200px" class="fixed top-[60px] h-full">
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
</script>

<style lang="scss" scoped>
.el-aside {
  > .el-menu {
    position: fixed;
    width: 200px;
    border-right: 0 none;
    height: calc(100vh - 60px);
    overflow-y: auto;
  }
  > .el-menu--collapse {
    width: 64px;
  }
}
</style>
