<template>
  <div class="p-4 m-4 bg-white">
    <h2>我是父组件</h2>
    <Son class="p-4 m-4 border" />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import Son from './son.vue'
import clientApi from '~/api/client'

let clientData = ref()
let clientName = ref('')

provide('message', 'hello')
provide('clientName', clientName)

async function getClientDetails() {
  clientData.value = await clientApi.getClientDetails('1')
  clientName.value = clientData.value.name
}

getClientDetails()
</script>
