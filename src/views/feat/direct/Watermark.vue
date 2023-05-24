<template>
  <div>
    <PageHeader title="水印指令"></PageHeader>
    <div class="h-[300px] m-4 bg-white/90" v-watermark></div>
    <div
      class="h-[300px] m-4 bg-white/90"
      v-watermark="{
        txt: 'mocha vue3 system',
        style: {
          font: '10px gothic',
          color: 'rgba(255,80,0,0.5)'
        }
      }"
    ></div>
  </div>
</template>

<script setup lang="ts"></script>
