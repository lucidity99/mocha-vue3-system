import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

export function useTable(loadDataFunc: Function, queryForm: {}, deleteDataFunc: Function) {
  let loading = ref(true)
  let tableData = ref()
  let total = ref(0)

  const pagination = reactive({
    page: 1,
    pageSize: 20
  })

  const getData = async () => {
    loading.value = true
    const res = await loadDataFunc({ ...queryForm, ...pagination })
    tableData.value = res.list
    total.value = res.total
    loading.value = false
  }

  onMounted(() => {
    getData()
  })

  // 搜索
  const handleSearch = () => {
    pagination.page = 1
    getData()
  }

  // 切换页码
  const handlePageChange = (val: number) => {
    pagination.page = val
    getData()
  }

  let multipleSelection = ref([])
  const handleSelectionChange = (val: []) => {
    multipleSelection.value = val
  }

  // 单个删除、批量删除
  const handleDelete = (id?: string) => {
    let ids: string[] | null = null
    if (id !== undefined) {
      ids = [id]
    } else {
      ids = multipleSelection.value
    }
    if (!ids || ids.length === 0) {
      ElMessage.warning('请选择需要删除的数据！')
      return
    }
    ElMessageBox.confirm('确定删除？此操作不可恢复。', '提示', {
      type: 'warning'
    })
      .then(async () => {
        await deleteDataFunc({ ids })

        ElMessage.success('删除成功')
        getData()
      })
      .catch(() => {})
  }

  // 导出表格数据
  const handleExport = () => {
    ElMessageBox.confirm('确定导出所选数据？', '提示')
      .then(() => {
        ElNotification({
          title: '数据导出',
          message: '正在为您导出数据，请稍后',
          position: 'bottom-right'
        })
      })
      .catch(() => {})
  }

  return {
    loading,
    tableData,
    total,
    pagination,
    getData,
    handleSearch,
    handleExport,
    handleSelectionChange,
    handlePageChange,
    handleDelete
  }
}
