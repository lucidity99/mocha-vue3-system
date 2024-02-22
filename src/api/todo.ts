/*
 * @Author: lucidity99 lucidity929@163.com
 * @Date: 2024-02-22 22:57:33
 * @LastEditors: lucidity99 lucidity929@163.com
 * @LastEditTime: 2024-02-22 22:57:52
 * @FilePath: /mocha-vue3-system/src/api/todo.ts
 * @Description:
 *
 *
 */
import request from '~/utils/http/axios'

export default {
  getTodoList(params: {}) {
    return request({
      url: 'getTodoList',
      params
    })
  }
}
