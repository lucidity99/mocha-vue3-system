import request from '~/utils/http/axios'

export default {
  // 获取客户列表数据
  getClientList(data: {}) {
    return request({
      url: 'getClientList',
      method: 'post',
      data
    })
  },

  // 获取客户详情
  getClientDetails(id: string) {
    return request({
      url: 'getClientDetails',
      method: 'get',
      params: { id }
    })
  },

  // 删除客户
  deleteClient(data: []) {
    return request({})
  }
}
