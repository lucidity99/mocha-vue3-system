import request from '~/utils/http/axios'

export const fetchData = () => {
  return request({
    url: 'https://console-mock.apipost.cn/mock/92e978f3-7c40-4e4a-b24d-0d322e6a4337/getList',
    method: 'get'
  })
}
