import request from '~/utils/http/axios'

export default {
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
  }
}
