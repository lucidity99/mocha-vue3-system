<template>
  <i-ep-search @click="visible = true" class="text-sm text-gray-600 cursor-pointer" />
  <el-dialog
    v-model="visible"
    append-to-body
    :show-close="false"
    class="bg-gray-100 site-search"
    width="600px"
    @open="onOpen"
    @close="onClose"
  >
    <template #header="{ close, titleId, titleClass }">
      <el-input
        placeholder="搜索全站"
        size="large"
        v-model="keyword"
        @input="search"
        ref="inputRef"
      />
    </template>

    <div>
      <ul>
        <li
          v-for="(item, index) in list"
          class="flex items-center p-3 mx-4 mb-1 transition-all bg-white rounded shadow cursor-pointer group hover:bg-indigo-400 hover:text-white"
          @click="goto(item.fullPath)"
        >
          <div>
            <div>{{ item?.meta?.title }} {{ item.name }}</div>
            <div class="text-sm text-gray-400 transition-all group-hover:text-white">
              {{ item.fullPath }}
            </div>
          </div>
          <i-ep-position class="ml-auto text-white text-large" />
        </li>
      </ul>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useRouter, RouteRecordRaw } from 'vue-router'
import { useMagicKeys } from '@vueuse/core'
import { InputInstance } from 'element-plus'
import { deepClone } from '~/utils'
import { useI18n } from 'vue-i18n'

const router = useRouter()

let visible = ref(false)
let keyword = ref()
let list = ref()

const { t } = useI18n()
let flatRouteList: RouteRecordRaw[] = flatJson(router.options.routes)
let localeRouteList: RouteRecordRaw[] = []
let inputRef = ref<InputInstance>()

const keys = useMagicKeys()
const CtrlK = keys['Ctrl+K']
const CommandK = keys['Cmd+K']

watch(CtrlK, (v) => {
  visible.value = true
})

watch(CommandK, (v) => {
  visible.value = true
})

function onOpen() {
  nextTick(() => {
    inputRef.value?.focus()
  })
  localeRouteList = deepClone(flatRouteList)
  localeRouteList.forEach((cur) => {
    cur.meta.title = t('route.' + cur?.meta?.title)
  })
}

function onClose() {
  visible.value = false
  keyword.value = ''
  list.value = []
}

function search() {
  list.value = localeRouteList.filter(
    (val: RouteRecordRaw) =>
      val?.name?.toLowerCase().indexOf(keyword.value.toLowerCase()) > -1 ||
      val?.meta?.title?.toLowerCase().indexOf(keyword.value.toLowerCase()) > -1
  )
}

function goto(path: string) {
  onClose()
  router.push(path)
}

function flatJson(jsonData: RouteRecordRaw[], fp?: '') {
  return jsonData.reduce((pre, cur) => {
    const { children = [], ...item } = cur
    let fullPath = fp ? fp + '/' + cur.path : cur.path
    fullPath = fullPath.replace(/\/+/g, '/')

    return pre.concat([{ ...item, fullPath }], flatJson(children, fullPath))
  }, [] as RouteRecordRaw[])
}
</script>

<style lang="scss">
.site-search {
  .el-dialog__header {
    padding: 16px;
    margin-right: 0;
  }
  .el-dialog__body {
    max-height: 60vh;
    overflow: auto;
    padding: 0 0 16px 0;
    position: relative;
  }
}
</style>
