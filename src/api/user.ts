import request from '~/utils/http/axios'

export function login(data: {}) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
export function fetchUser(data: {}) {
  return request({
    url: '/api/getUser',
    method: 'get',
    data
  })
}
