<template>
  <el-select v-if="index > 0" v-model="formData.andOr" class="mr-1 w-[80px] flex-shrink-0">
    <el-option v-for="ao in andOrOptions" :key="ao.value" :label="ao.label" :value="ao.value" />
  </el-select>

  <el-select class="mr-1 w-[150px] flex-shrink-0" v-model="formData.code" @change="changeCode">
    <el-option v-for="c in columns" :key="c.code" :label="c.label" :value="c.code" />
  </el-select>

  <el-select
    class="mr-1 w-[100px] flex-shrink-0"
    v-model="formData.condition"
    @change="changeCondition"
    ><el-option v-for="c in conditionOptions" :key="c.value" :label="c.label" :value="c.value"
  /></el-select>

  <component
    :disabled="disabled"
    class="flex-1"
    :is="ctOptions[formData.type as keyof typeof ctOptions]"
    v-model:value="formData.value"
  ></component>
</template>

<script setup lang="ts">
import { ref, reactive, PropType, watch } from 'vue'
import { SearchColumnItem, SearchFormItem } from './type'
import CtInput from './formComponent/CtInput.vue'
import CtSelect from './formComponent/CtSelect.vue'
import CtDate from './formComponent/CtDate.vue'
import { andOrOptions, conditionOptions } from './utils'

const props = defineProps({
  index: { type: Number, default: 0 },

  columns: {
    type: Array as PropType<SearchColumnItem[]>,
    defaut: () => []
  },
  defaultColumn: {
    type: Object,
    default: () => {}
  }
})

const ctOptions = {
  input: CtInput,
  select: CtSelect,
  date: CtDate
}

let formData: SearchFormItem = reactive({
  code: '',
  condition: '',
  value: '',
  type: 'input',
  andOr: 'and'
})

watch(
  () => props.defaultColumn,
  (newVal) => {
    const { code, condition, type, value, andOr } = newVal
    formData.code = code
    formData.condition = condition
    formData.type = type
    formData.value = value || ''
    formData.andOr = andOr
  }
)

function changeCode(e: string) {
  const temp = props.columns ? props.columns.find((cur) => cur.code === e) : null
  if (temp) {
    const { code, condition, type } = temp
    formData.code = code
    formData.condition = condition
    formData.type = type
    formData.value = ''
    disabled.value = condition === 'null'
  }
}

let disabled = ref(false)
function changeCondition(e: string) {
  if (e === 'null') {
    formData.value = ''
  }
  disabled.value = e === 'null'
}

defineExpose({
  formData
})
</script>
