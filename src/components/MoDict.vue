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
const props = defineProps<{
  value: string
  dicts: any
}>()

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
