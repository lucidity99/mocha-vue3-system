import request from '~/utils/http/axios'

export default {
  getRoutes: (data: {}) => {
    return request({
      url: '/getRoutes',
      method: 'post',
      data
    })
  },

  getDeptTree: (data: {}) => {
    return request({
      url: '/getDeptTree',
      method: 'post',
      data,
      repeatRequest: false,
      isReturnNativeData: true,
      errorMode: 'hidden'
    })
  },

  getMessageList: (data: {}) => {
    return request({
      url: '/getMessageList',
      method: 'post',
      data
    })
  },

  getDicts: (type: string) => {
    return request({
      url: '/getDicts',
      method: 'get',
      params: { type }
    })
  }
}
