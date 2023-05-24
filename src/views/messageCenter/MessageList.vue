<template>
  <div class="p-4">
    <div class="mb-2">消息通知 （共{{ total }}条）</div>

    <ul>
      <li
        v-for="item in listData"
        :key="item.id"
        class="p-4 mb-2 shadow cursor-pointer bg-white/90 dark:bg-black/95"
      >
        <div class="flex items-center mb-2">
          <el-tag class="mr-2">{{ item.typeName }} </el-tag>
          <div class="font-bold">{{ item.title }}</div>
        </div>

        <div>{{ item.content }}</div>
        <span class="text-xs text-gray-400">{{ dayjs().to(dayjs(item.sendTime)) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

import systemApi from '~/api/system'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

interface MessageItem {
  id: string
  typeName: string
  title: string
  content: string
  sendTime: string
}

let queryForm = reactive({
  read: 0
})

let listData = ref<MessageItem[]>()
let total = ref<number>()

async function getList() {
  const res = await systemApi.getMessageList(queryForm)
  total.value = res.total
  listData.value = res.list
}

onMounted(async () => {
  await getList()
})
</script>
