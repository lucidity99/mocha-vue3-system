<!--
 * @Author: lucidity99 lucidity929@163.com
 * @Date: 2023-06-02 11:00:11
 * @LastEditors: lucidity99 lucidity929@163.com
 * @LastEditTime: 2024-01-27 23:31:42
 * @FilePath: /mocha-vue3-system/src/components/MoDict.vue
 * @Description:
 *
 *
-->
<template>
  <el-tag :type="tagType" :class="tagClass" :effect="tagEffect">{{ label }}</el-tag>
</template>

<script setup lang="ts">
interface DictItem {
  label: string
  value: string
  type?: string
  class?: string
  effect?: string
}
const props = withDefaults(
  defineProps<{
    value: string
    dicts: DictItem[]
  }>(),
  {
    value: '',
    dicts: () => []
  }
)

let item = <DictItem>{}
if (props.dicts) {
  item = props.dicts.find((val: DictItem) => val.value === props.value) || {
    label: props.value,
    value: props.value
  }
}

const label = item.label
const tagType = item.type || ''
const tagClass = item.class || ''
const tagEffect = item.effect || 'light'
</script>
