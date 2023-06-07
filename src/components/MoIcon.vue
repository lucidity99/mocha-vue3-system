<template>
  <iconify-icon :icon="iconName"></iconify-icon>
</template>

<script setup lang="ts">
import { addCollection } from 'iconify-icon'
import ep from '@iconify-json/ep/icons.json'

const props = withDefaults(defineProps<{ iconName: string }>(), {
  iconName: ''
})

addCollection(ep)
</script>
