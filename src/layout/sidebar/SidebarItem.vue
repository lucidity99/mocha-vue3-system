<template>
  <el-sub-menu
    :index="getPath(parentPath, item.path)"
    v-if="item.children && item.children.length > 0"
  >
    <template #title>
      <MoIcon :icon-name="item.meta.icon" v-if="level === 0" class="ml-1 mr-1 text-lg" />
      <span>{{ $t(`route.${item.meta.title}`) }}</span>
    </template>
    <SidebarItem
      :item="item1"
      :parent-path="getPath(parentPath, item.path)"
      :level="level + 1"
      v-for="(item1, index1) in item.children"
    />
  </el-sub-menu>
  <el-menu-item :index="getPath(parentPath, item.path)" v-else>
    <MoIcon :icon-name="item.meta.icon" v-if="level === 0" class="ml-1 mr-1 text-lg" />
    <template #title>{{ $t(`route.${item.meta.title}`) }}</template>
  </el-menu-item>
</template>

<script lang="ts" setup name="SidebarItem">
const props = defineProps({
  item: { type: Object, default: () => {} },
  parentPath: { type: String, default: '' },
  level: { type: Number, default: 0 }
})

function getPath(parentPath: string, path: string) {
  if (parentPath) return `${parentPath}/${path}`
  else return path
}
</script>
