<!--
 * @Author: lucidity99 lucidity929@163.com
 * @Date: 2023-04-23 13:20:11
 * @LastEditors: lucidity99 lucidity929@163.com
 * @LastEditTime: 2024-01-01 21:16:50
 * @FilePath: /mocha-vue3-system/src/views/comp/form/BasicForm.vue
 * @Description:
 *
 *
-->
<template>
  <div class="container">
    <el-card>
      <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="选择客户" prop="name">
          <UserSelector v-model="form.name" />
        </el-form-item>
        <el-form-item label="选择器" prop="region">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option key="小明" label="小明" value="小明"></el-option>
            <el-option key="小红" label="小红" value="小红"></el-option>
            <el-option key="小白" label="小白" value="小白"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期时间">
          <div class="flex">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>

            <span class="mx-2" :span="2">-</span>

            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%">
              </el-time-picker>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="城市级联" prop="options">
          <el-cascader :options="options" v-model="form.options"></el-cascader>
        </el-form-item>
        <el-form-item label="选择开关" prop="delivery">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="多选框" prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="小明" name="type"></el-checkbox>
            <el-checkbox label="小红" name="type"></el-checkbox>
            <el-checkbox label="小白" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="单选框" prop="resource">
          <el-radio-group v-model="form.resource">
            <el-radio label="小明"></el-radio>
            <el-radio label="小红"></el-radio>
            <el-radio label="小白"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文本框" prop="desc">
          <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(formRef)">表单提交</el-button>
          <el-button @click="onReset(formRef)">重置表单</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="baseform">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import UserSelector from '~/components/UserSelector.vue'

const options = [
  {
    value: 'guangdong',
    label: '广东省',
    children: [
      {
        value: 'guangzhou',
        label: '广州市',
        children: [
          {
            value: 'tianhe',
            label: '天河区'
          },
          {
            value: 'haizhu',
            label: '海珠区'
          }
        ]
      },
      {
        value: 'dongguan',
        label: '东莞市',
        children: [
          {
            value: 'changan',
            label: '长安镇'
          },
          {
            value: 'humen',
            label: '虎门镇'
          }
        ]
      }
    ]
  },
  {
    value: 'hunan',
    label: '湖南省',
    children: [
      {
        value: 'changsha',
        label: '长沙市',
        children: [
          {
            value: 'yuelu',
            label: '岳麓区'
          }
        ]
      }
    ]
  }
]
const rules: FormRules = {
  name: [{ required: true, message: '请输入表单名称', trigger: 'blur' }]
}
const formRef = ref<FormInstance>()
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: true,
  type: ['小明'],
  resource: '小红',
  desc: '',
  options: []
})
// 提交
const onSubmit = (formEl: FormInstance | undefined) => {
  // 表单校验
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      ElMessage.success('提交成功！')
    } else {
      return false
    }
  })
}
// 重置
const onReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
