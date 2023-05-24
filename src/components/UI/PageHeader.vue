<template>
  <div class="p-6">
    <h2 class="mb-2 text-xl">{{ title }}</h2>
    <slot>
      <div>
        {{ desc }}
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  desc?: string
}>()
</script>
