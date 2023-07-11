<template>
  <v-header class="v" :class="{ 'header-collapse': sidebar.collapse }" />
  <v-sidebar class="siderbar" />
  <div class="main-content" :class="{ 'content-collapse': sidebar.collapse }">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { useSidebarStore } from '~/store/sidebar'
import { useTagsStore } from '~/store/tags'
import vHeader from '../components/header/SideHeader.vue'
import vSidebar from '../components/sidebar/index.vue'

const sidebar = useSidebarStore()
const tags = useTagsStore()
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 10;
  width: 80px;
  height: 100vh;
  border-right: 1px solid var(--el-border-color);

  .logo {
    color: var(--el-color-primary);
  }
}

.el-aside {
  position: fixed;
  left: 80px;
  top: 0;
  bottom: 0;
  height: 100vh;

  > :deep(.el-menu) {
    width: 200px;
    border-right: 0 none;
    height: 100vh;
    overflow-y: auto;
    border-right: 1px solid var(--el-border-color);
  }
  > .el-menu--collapse {
    width: 64px;
  }
}

.main-content {
  position: relative;
  margin-left: 280px;

  -webkit-transition: left 0.3s ease-in-out;
  transition: margin-left 0.3s ease-in-out;

  background: url(../images/bg.avif) no-repeat top center;

  &.content-collapse {
    margin-left: 144px;
  }
}

.content {
  width: auto;
  overflow-y: auto;

  &.content-collapse {
    left: 64px;
  }
}

.container {
  margin: 16px;
}
</style>
