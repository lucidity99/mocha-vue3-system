/*
 * @Author: lucidity99 lucidity929@163.com
 * @Date: 2024-01-27 23:27:44
 * @LastEditors: lucidity99 lucidity929@163.com
 * @LastEditTime: 2024-01-27 23:32:15
 * @FilePath: /mocha-vue3-system/src/components/MoDict.spec.ts
 * @Description:
 *
 *
 */
import { shallowMount } from '@vue/test-utils'
import MoDict from './MoDict.vue'

describe('MoDict', () => {
  it('should render correct tag type', () => {
    const wrapper = shallowMount(MoDict, {
      props: {
        value: 'some value',
        dicts: [
          {
            value: 'some value',
            label: '1',
            type: 'primary',
            class: 'tag-primary',
            effect: 'light'
          },
          { value: 'some other value', label: '2', type: '', class: 'tag-danger', effect: 'dark' },
          { value: 'some different value', label: '3', type: 'success', class: '', effect: 'light' }
        ]
      }
    })
    expect(wrapper.find('el-tag').attributes('type')).toBe('primary')
    expect(wrapper.find('el-tag').attributes('class')).toBe('tag-primary')
    expect(wrapper.find('el-tag').attributes('effect')).toBe('light')
  })

  it('should render default tag type if not found in dicts', () => {
    const wrapper = shallowMount(MoDict, {
      props: {
        value: 'nonexistent value',
        dicts: [
          {
            value: 'some value',
            label: '1',
            type: 'primary',
            class: 'tag-primary',
            effect: 'light'
          },
          { value: 'some other value', label: '2', type: '', class: 'tag-danger', effect: 'dark' },
          { value: 'some different value', label: '3', type: 'success', class: '', effect: 'light' }
        ]
      }
    })
    expect(wrapper.find('el-tag').attributes('type')).toBe('')
    expect(wrapper.find('el-tag').attributes('class')).toBe('')
    expect(wrapper.find('el-tag').attributes('effect')).toBe('light')
  })

  it('should render correct tag type if only value is provided', () => {
    const wrapper = shallowMount(MoDict, {
      props: {
        value: 'some value'
      }
    })
    expect(wrapper.find('el-tag').attributes('type')).toBe('')
    expect(wrapper.find('el-tag').attributes('class')).toBe('')
    expect(wrapper.find('el-tag').attributes('effect')).toBe('light')
  })
})
