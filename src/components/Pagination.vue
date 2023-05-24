<!-- el-pagination 二次封装 -->
<template>
  <div class="flex justify-end">
    <el-pagination
      v-model:current-page="curPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
  page: { type: Number, default: 1 },
  size: { type: Number, default: 10 },
  total: { type: Number, default: 0 },
  layout: { type: String, default: 'total, sizes, prev, pager, next, jumper' },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 50, 100]
  }
})

const emit = defineEmits(['update:size', 'update:page', 'pagination'])

const pageSize = computed({
  get: () => props.size,
  set: (val) => {
    emit('update:size', val)
  }
})
const curPage = computed({
  get: () => props.page,
  set: (val) => {
    emit('update:page', val)
  }
})

function handleSizeChange() {
  emit('pagination')
}

function handleCurrentChange() {
  emit('pagination')
}
</script>
