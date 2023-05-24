<template>
  <el-input v-model="modalValue" v-bind="$attrs"></el-input>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: string | number
}>()

const emit = defineEmits(['update:value'])

const modalValue = computed({
  get: () => props.value,
  set: (val) => {
    emit('update:value', val)
  }
})
</script>
