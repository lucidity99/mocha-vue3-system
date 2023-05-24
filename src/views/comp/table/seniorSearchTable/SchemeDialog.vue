<template>
  <el-dialog v-model="dialogVisible" title="Save Scheme" width="500px" draggable>
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="name" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="default" prop="isDefault">
        <el-radio-group v-model="formData.isDefault" class="ml-4">
          <el-radio :label="true">yes</el-radio>
          <el-radio :label="false">no</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="confirm"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { FormInstance } from 'element-plus'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits(['update:visible', 'update'])

let dialogVisible = computed({
  get: () => props.visible,
  set: (val) => {
    emit('update:visible', val)
  }
})

const formRef = ref<FormInstance>()
const formData = reactive({
  title: '',
  isDefault: false
})

const rules = {
  title: [{ required: true }],
  isDefault: [{ required: true }]
}

function confirm() {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (!valid) return false
    emit('update', formData)
    close()
  })
}

function resetForm() {
  if (!formRef.value) return
  formRef.value.resetFields()
}

function close() {
  dialogVisible.value = false
  resetForm()
}
</script>
