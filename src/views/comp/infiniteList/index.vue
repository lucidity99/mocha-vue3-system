<template>
  <div id="a">
    <div class="w-40 h-20" v-for="(item, index) in count">{{ item }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
let count = ref(20)

window.addEventListener('scroll', () => {
  const el = document.getElementById('a')
  const m = document.querySelector('.main-content')
  console.log(
    window.innerHeight,
    el?.offsetHeight,
    el?.clientHeight,
    m?.clientHeight,
    m?.scrollTop,
    window.scrollY
  )
})
</script>
