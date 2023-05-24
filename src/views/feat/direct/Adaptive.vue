<template>
  <div>
    <PageHeader title="高度自适应"></PageHeader>
    <div class="m-4" v-adaptive="{ bottom: 20 }">
      <div class="p-10 h-30 bg-white/90" v-for="item in 20" :key="item">item {{ item }}</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
