<template>
  <div class="m-4">
    <el-form :model="queryForm" inline>
      <el-form-item label="关键字" prop="keyword"
        ><el-input v-model="queryForm.keyword"
      /></el-form-item>
      <el-form-item><el-button @click="handleSearch">search</el-button></el-form-item>
    </el-form>
    <el-table :data="tableData" ref="tableRef" v-adaptive v-loading="loading">
      <el-table-column prop="deptName" label="名称" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <MoDict :value="row.status" :dicts="dicts.status" />
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" />
      <el-table-column prop="updated" label="更新时间" />
      <el-table-column prop="created" label="创建时间" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import systemApi from '~/api/system'
import { useDict } from '~/hooks/useDict'
import { useTable } from '~/hooks/useTable'

let queryForm = reactive({
  keyword: ''
})

const { tableData, loading, handleSearch } = useTable(systemApi.getDeptTree, queryForm)

let { dicts } = useDict(['status'])
</script>
