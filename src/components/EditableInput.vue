<template>
  <div>
    <span class="inline-flex items-center cursor-pointer" @click="triggerEdit" v-if="!isActive"
      >{{ value }} <el-icon color="#5F45FF" class="ml-2"><EditPen /></el-icon
    ></span>
    <el-input-number
      :min="0"
      :max="9999"
      :controls="false"
      v-model="value"
      class="w-30!"
      v-focus
      @blur="handleSortChange"
      v-else-if="type === 'number'"
    />
    <el-input
      v-model="value"
      class="w-30!"
      v-focus
      @blur="handleSortChange"
      v-else-if="type === 'string'"
    />
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { EditPen } from '@element-plus/icons-vue'
import { ref, computed, nextTick } from 'vue'

const props = defineProps({
  type: { type: String, default: 'string' },
  modelValue: { type: [String, Number], default: '' },
  updateApi: { type: Function, default: () => {} },
  rowData: { type: Object, default: () => {} },
  paramName: { type: String, default: '' }
})

const emits = defineEmits(['success', 'update:rowData', 'update:modelValue'])

const value = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emits('update:modelValue', val)
  }
})

const isActive = ref(false)
const oldValue = ref()

const triggerEdit = () => {
  oldValue.value = props.modelValue
  isActive.value = true
}

const handleSortChange = () => {
  if (oldValue.value === value.value) {
    isActive.value = false
    return
  }
  const postData = { ...props.rowData, [props.paramName]: value.value }
  console.log(postData)
  props
    .updateApi(postData)
    .then((res: any) => {
      console.log(res)
      if (res) {
        ElMessage.success('排序成功')
        isActive.value = false
      }
    })
    .catch(() => {
      value.value = oldValue.value
    })
}
</script>
