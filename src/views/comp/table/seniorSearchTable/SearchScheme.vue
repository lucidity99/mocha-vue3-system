<template>
  <h3>查询方案</h3>
  <div class="flex flex-wrap flex-shrink-0">
    <el-tag
      class="relative p-1 pr-5 mt-1 mr-1 text-sm cursor-pointer"
      v-for="(q, index) in querySchemes"
      :key="q.title"
      :type="q.title === active ? '' : 'info'"
      @click="changeScheme(index)"
    >
      <div class="max-w-[60px] truncate">{{ q.title }}</div>
      <i-ep-close
        class="absolute text-xs top-1 right-1 hover:bg-red-500 hover:rounded-lg hover:text-white"
        @click="deleteScheme(index)"
      />
    </el-tag>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { SchemeItem } from './type'

const props = withDefaults(
  defineProps<{
    data: SchemeItem[]
  }>(),
  {
    data: () => []
  }
)

const emit = defineEmits(['update:data', 'change'])

let querySchemes = computed({
  get: () => props.data,
  set: (val) => {
    emit('update:data', val)
  }
})

let active = ref('')

active.value = props.data.find((cur) => cur.isDefault)?.title || ''

function changeScheme(index: number) {
  const item = props.data[index]
  active.value = item.title
  emit('change', props.data[index].data)
}

function deleteScheme(index: number) {
  querySchemes.value.splice(index, 1)
  localStorage.setItem('searchSchemes', JSON.stringify(querySchemes.value))
}
</script>
