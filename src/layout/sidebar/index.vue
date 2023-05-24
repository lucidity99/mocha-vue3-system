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
import { useRouter } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import { useSidebarStore } from '~/store/sidebar'

const router = useRouter()
const items = router.options.routes
  .find((val) => val.name === 'Home')
  ?.children?.filter((val) => !val.hidden)

const sidebar = useSidebarStore()
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
