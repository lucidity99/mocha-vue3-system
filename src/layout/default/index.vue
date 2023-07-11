<template>
  <v-header :class="{ 'header-collapse': sidebar.collapse }" />
  <v-tags :class="{ 'tag-collapse': sidebar.collapse }"></v-tags>
  <v-sidebar class="siderbar" />
  <div class="main-content" :class="{ 'content-collapse': sidebar.collapse }">
    <slot></slot>
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
import vHeader from '../components/header/index.vue'
import vSidebar from '../components/sidebar/index.vue'
import vTags from '../components/tags/index.vue'

const sidebar = useSidebarStore()
const tags = useTagsStore()
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 10;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid var(--el-border-color);

  .logo {
    color: var(--el-color-primary);
  }
}

.el-aside {
  > :deep(.el-menu) {
    position: fixed;
    margin-top: 60px;
    width: 200px;
    border-right: 0 none;
    height: calc(100vh - 60px);
    overflow-y: auto;
  }
  > :deep(.el-menu--collapse) {
    width: 64px;
  }
}

.main-content {
  position: relative;
  margin-left: 200px;
  padding-top: 90px;

  -webkit-transition: left 0.3s ease-in-out;
  transition: margin-left 0.3s ease-in-out;

  background: url(../images/bg.avif) no-repeat top center;

  &.content-collapse {
    margin-left: 64px;
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
  padding: 16px;
}
</style>
