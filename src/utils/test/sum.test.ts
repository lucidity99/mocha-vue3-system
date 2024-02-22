/*
@Author: lucidity99 lucidity929@163.com
@Date: 2024-01-27 14:26:10
 * @LastEditors: lucidity99 lucidity929@163.com
 * @LastEditTime: 2024-01-27 15:30:57
 * @FilePath: /mocha-vue3-system/src/utils/test/sum.test.ts
@Description:
@
@
 */

import sum from './../sum'

describe('sum.js', () => {
  test('两数之和', () => {
    expect(sum(1, 2)).toBe(3)
  })
  test('字符串拼接', () => {
    expect(sum('a', 'b')).toBe('ab')
  })
})

// 模拟一个异步操作
function getName() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('bar')
    }, 1000)
  })
}

describe('test promise', () => {
  // 写法1
  test('style1', async () => {
    const res = await getName()
    expect(res).toBe('bar')
  })
  // 写法2
  test('style2', () => {
    return expect(getName()).resolves.toBe('bar')
  })
  // 写法3
  test('style3', () => {
    return getName().then((res) => {
      expect(res).toBe('bar')
    })
  })
})
