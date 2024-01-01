<template>
  <div class="container">
    <el-card>
      <template #header>
        <div class="card-header">带分页的el-selectors</div>
      </template>
      <UserSelector v-model="userId" multiple class="w-90!" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let userId = ref('')
</script>
