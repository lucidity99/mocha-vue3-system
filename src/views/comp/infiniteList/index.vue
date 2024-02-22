<!--
 * @Author: lucidity99 lucidity929@163.com
 * @Date: 2023-06-14 16:06:09
 * @LastEditors: lucidity99 lucidity929@163.com
 * @LastEditTime: 2024-02-22 23:32:02
 * @FilePath: /mocha-vue3-system/src/views/comp/infiniteList/index.vue
 * @Description:
 *
 *
-->
<template>
  <div class="relative">
    <div class="w-full p-4">
      <el-select v-model="queryForm.type" @change="handleChangeType" clearable>
        <el-option
          v-for="item in [1, 2, 3]"
          :key="item"
          :label="`类型${item}`"
          :value="item"
        ></el-option>
      </el-select>
    </div>

    <el-scrollbar style="height: calc(100vh - 160px)" v-if="infiniteVisible" class="px-4">
      <ul
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
        :infinite-scroll-distance="100"
        id="todoList"
        class="todo-list"
      >
        <li
          v-for="item in todoList"
          :key="item.id"
          class="cursor-pointer todo-item"
          @click="toDetail(item)"
        >
          <div class="text-sm massage-item-hd">
            <el-icon class="mr-1"><Warning /></el-icon>
            <span>{{ item.title }}</span>

            <el-icon size="18" class="icon-delete" @click.stop="handleDelete(item)"
              ><Close
            /></el-icon>
          </div>
          <div class="text-df">{{ item.description }}</div>
          <div class="mt-2 text-xs text-gray-500">{{ item.createTime }}</div>
        </li>
      </ul>

      <!-- loading 动画 start-->
      <div v-if="loading">
        <div class="p-4 ball-pulse">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <!-- loading 动画 end -->

      <el-empty v-if="queryForm.pagenum === 1 && todoList.length === 0 && !loading"></el-empty>

      <p v-else-if="noMore" class="p-4 text-sm text-center text-gray-400">没有更多了</p>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick, onMounted } from 'vue'
import { Close, Warning } from '@element-plus/icons-vue'
import todoApi from '~/api/todo'

const visible = ref(false)
// 控制infiniteScroll重新加载
const infiniteVisible = ref(false)

interface TodoItem {
  id: string
  title: string
  type: string
  description: string
  createTime: string
  isRead: boolean
}

const todoList = ref<TodoItem[]>([])

const loading = ref(false)
const noMore = ref(false)
const refresh = ref(false)
const disabled = computed(() => refresh.value || loading.value || noMore.value)

const queryForm = reactive<{
  pagesize: number
  pagenum: number
  type: string
  isRead?: boolean
}>({
  pagesize: 10,
  pagenum: 1,
  type: ''
})

async function loadData() {
  loading.value = true

  todoApi
    .getTodoList({ ...queryForm })
    .then((res: any) => {
      console.log(res.list.length)
      if (res.list.length > 0) {
        todoList.value = todoList.value.concat(res.list)
        queryForm.pagenum += 1
      } else {
        noMore.value = true
      }
    })
    .finally(() => {
      loading.value = false
    })
}

const load = async () => {
  // 防止重复加载
  if (refresh.value) {
    return
  }
  await loadData()
}

function refreshInfiniteList() {
  refresh.value = true
  noMore.value = false

  todoList.value.length = 0
  infiniteVisible.value = false

  nextTick(() => {
    infiniteVisible.value = true
    refresh.value = false
    queryForm.pagenum = 1
    load()
  })
}

onMounted(() => {
  refreshInfiniteList()
})

function handleDelete(item: TodoItem) {
  todoList.value = todoList.value.filter((val) => val.id !== item.id)

  // 如果删除元素使得下方出现空白，加载更多
  nextTick(() => {
    const el = document.getElementById('todoList')

    const bottom = window.innerHeight - el!.getBoundingClientRect().bottom
    console.log(bottom)
    if (bottom > 0) {
      load()
    }
  })
}

function handleChangeType(e: string) {
  console.log(e)
  refreshInfiniteList()
}

async function toDetail(item: todoItem) {
  visible.value = false
}
</script>

<style lang="scss" scoped>
.todo-item {
  padding: 16px;
  border-bottom: 1px solid var(--el-border-color-light);

  .massage-item-hd {
    position: relative;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    color: var(--el-text-color-regular);
    .icon-delete {
      position: absolute;
      right: 0px;
      display: none !important;
      color: var(--color);
      cursor: pointer;
    }
  }

  &:hover {
    background-color: var(--el-border-color-light);
    .icon-delete {
      display: inline-flex !important;
    }
  }
  &.todo-item-read,
  &.todo-item-read .massage-item-hd {
    color: var(--el-text-color-secondary);
  }
}

.ball-pulse {
  text-align: center;
  > div:nth-child(1) {
    -webkit-animation: scale 0.75s 0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: scale 0.75s 0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }
  > div:nth-child(2) {
    -webkit-animation: scale 0.75s 0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: scale 0.75s 0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }

  > div:nth-child(3) {
    -webkit-animation: scale 0.75s 0.36s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: scale 0.75s 0.36s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }

  > div {
    background-color: var(--el-border-color-light);
    width: 12px;
    height: 12px;
    border-radius: 100%;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
  }
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.5);
  }
  10% {
    transform: scale(1);
  }
}
</style>
