<template>
  <div class="container">
    <el-form :model="queryForm" inline>
      <el-form-item label="关键字" prop="keyword"
        ><el-input v-model="queryForm.keyword"
      /></el-form-item>
      <el-form-item><el-button @click="search">search</el-button></el-form-item>
    </el-form>
    <el-table :data="listData" ref="tableRef" row-key="deptId" v-adaptive>
      <el-table-column prop="deptName" label="名称" sortable />
      <el-table-column prop="status" label="状态" sortable>
        <template #default="{ row, $index }">
          <el-tag>{{ row.status === '0' ? '禁用' : '正常' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" sortable />
      <el-table-column prop="updated" label="更新时间" sortable />
      <el-table-column prop="created" label="创建时间" sortable />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import systemApi from '~/api/system'

let listData = ref([])
let queryForm = reactive({
  keyword: ''
})

function getDataList() {
  systemApi.getDeptTree(queryForm).then((res) => {
    listData.value = res
  })
}

onMounted(() => {
  getDataList()
})

function search() {
  getDataList()
}
</script>
