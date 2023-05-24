import { ElMessage, ElNotification } from 'element-plus'

// 根据错误代码，获取对应文字
const errorMsgHandler = (errStatus: number): string => {
  if (errStatus === 500) return '服务器内部错误'
  if ((errStatus = 400)) return '没有权限'
  return '未知错误'
}

// 根据mode，返回错误信息
const errorHandler = (errMsg: string, mode: string = 'modal') => {
  const msg = errMsg || '未知错误'

  if (mode === 'modal') {
    ElMessage(msg + '|' + mode)
  }
  if (mode === 'toast') {
    ElNotification({
      title: 'Error',
      message: msg,
      type: 'error'
    })
  }
  if (mode === 'hiden') {
  }
}

export { errorHandler, errorMsgHandler }
