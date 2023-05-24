<template>
  <ul class="icons-list">
    <li v-for="(item, index) in list" :key="index" class="icon-item">
      <iconify-icon :icon="item" class="text-2xl" />
      <span class="text-xs text-center break-all">{{ item }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  list: string[]
}>()
</script>

<style scoped lang="scss">
.icons-list {
  display: flex;
  flex-wrap: wrap;
  .icon-item {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: calc(10% + 1px);
    height: 84px;
    padding: 8px;
    margin-right: -1px;
    margin-bottom: -1px;
    border: 1px solid var(--el-border-color);
    cursor: pointer;

    &:hover {
      background-color: var(--el-border-color);
    }
  }
}
</style>
