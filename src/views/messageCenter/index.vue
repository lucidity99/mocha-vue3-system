<template>
  <div class="flex h-full">
    <div class="bg-gray-100 shadow-inner w-52 dark:bg-black/50">
      <ul>
        <li
          v-for="(item, index) in messageTypeList"
          :key="item.title"
          class="flex items-center p-4 cursor-pointer hover:text-blue-500"
          :class="currentIndex === index ? 'bg-white dark:bg-gray-200/10' : ''"
          @click="changeType(index)"
        >
          <span>{{ item.title }}</span>
          <span
            v-if="item.count > 0"
            class="px-2 ml-auto text-xs text-white bg-red-600 rounded-full"
            >{{ item.count }}</span
          >
        </li>
      </ul>
    </div>
    <div class="flex-1">
      <component :is="messageTypeList[currentIndex].component"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import MessageList from './MessageList.vue'
import NoticeList from './NoticeList.vue'

import { ref, shallowRef } from 'vue'
let messageTypeList = ref([
  { title: '消息通知', count: 10, component: shallowRef(MessageList) },
  { title: '公告', count: 1, component: shallowRef(NoticeList) },
  { title: '今日需跟进客户', count: 8, component: shallowRef(NoticeList) },
  { title: '待审核合同', count: 0, component: shallowRef(NoticeList) },
  { title: '待回款', count: 0, component: shallowRef(NoticeList) },
  { title: '待发货出库单', count: 0, component: shallowRef(NoticeList) }
])
let currentIndex = ref(0)

function changeType(index: number) {
  currentIndex.value = index
}
</script>
