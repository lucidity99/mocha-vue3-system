/*
 * @Author: lucidity99 lucidity929@163.com
 * @Date: 2024-01-27 16:30:46
 * @LastEditors: lucidity99 lucidity929@163.com
 * @LastEditTime: 2024-01-27 23:10:10
 * @FilePath: /mocha-vue3-system/src/views/helloJest/hello.spec.ts
 * @Description:
 *
 *
 */
import hello from './Hello.vue'

import { shallowMount } from '@vue/test-utils' // 明确import shallowMount方法

// 假设你使用"@vue/test-utils"版本为1.1.0
// 假设你的Jest版本为26.6.3
// 假设你的Vue版本为3.0.0

describe('Hello.vue', () => {
  const msg = 'Hello,jest'
  const wrapper = shallowMount(hello, {
    propsData: { msg }
  })
  const msgElement = wrapper.find('.msg')! // 使用非空断言操作符 (!)

  it('renders props.msg when passed', () => {
    // 假设.msg是用于展示msg的元素class名

    expect(msgElement.exists()).toBe(true)
    expect(msgElement.text()).toBe(msg)
  })

  it('should hide the box element after 1000ms', async () => {
    const wrapper = shallowMount(hello)
    const box = wrapper.find('.box')
    // expect(wrapper.classes()).toContain('hello')
    expect(wrapper.vm.visible).toBe(true)
    await wrapper.vm.$nextTick() // wait for the timeout to trigger
    expect(box.classes()).not.toContain('hidden')
    expect(wrapper.vm.visible).toBe(false)
  })
})
