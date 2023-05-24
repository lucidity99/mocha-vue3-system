<template>
  <el-select v-model="modalValue" v-bind="$attrs"></el-select>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  value: string
}>()

const emit = defineEmits(['update:value'])

const modalValue = computed({
  get: () => props.value,
  set: (val) => {
    emit('update:value', val)
  }
})
</script>
