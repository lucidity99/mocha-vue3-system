<template>
  <div>
    <div class="flex p-4 m-2 rounded shadow-lg mo-senior-search bg-white/90 dark:bg-black/90">
      <div class="relative flex-1">
        <div class="search-form">
          <ul>
            <li
              v-for="(i, index) in maxCount"
              :key="i"
              :class="index < showCount ? 'flex' : 'hidden'"
            >
              <SearchItem
                :columns="listColumns"
                :defaultColumn="defaultColumns[index]"
                :index="index"
                :ref="(el:any) => setRef(el, index)"
              />
            </li>
          </ul>
          <div>
            <el-select class="main-option" v-model="searchParams.andOr">
              <el-option
                v-for="ao in andOrOptions"
                :key="ao.value"
                :label="ao.label"
                :value="ao.value"
              />
            </el-select>
          </div>
        </div>
        <div class="pt-2 mt-2 text-center border-t dark:border-t-white/10">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button plain @click="reset">重置</el-button>

          <el-button
            size="small"
            @click="triggerSave"
            class="absolute cursor-pointer bottom-1 right-20"
            >保存条件</el-button
          >

          <MoIcon
            :icon-name="collapsed ? 'ep-d-arrow-right' : 'ep-d-arrow-left'"
            @click="collapsed = !collapsed"
            class="absolute cursor-pointer right-1 bottom-2 text-primary"
          />
          <MoIcon
            :icon-name="showMore ? 'ep-top-left' : 'ep-bottom-right'"
            @click="showMore = !showMore"
            class="absolute cursor-pointer right-8 bottom-2 text-primary"
          />
        </div>
      </div>
      <div class="flex-shrink-0 w-48 pl-2 ml-2 border-l dark:border-l-white/10" v-show="collapsed">
        <SearchScheme :data="searchSchemes" @change="changeScheme" />
      </div>
    </div>

    <SchemeDialog v-model:visible="showSave" @update="saveScheme"></SchemeDialog>

    <div class="m-2 shadow bg-white/90 dark:bg-black/90">
      <div class="p-2 mb-2 border-b dark:border-b-gray-800">打印搜索参数：</div>
      <div class="p-2 text-xs">
        <pre>
        {{ searchParams }}
      </pre
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, ComponentPublicInstance, toRef } from 'vue'
import demoList from './demoList'
import { SearchColumnItem, SearchFormItem } from './type'
import SearchItem from './SearchItem.vue'
import SearchScheme from './SearchScheme.vue'
import { andOrOptions } from './utils'
import MoIcon from '~/components/MoIcon.vue'
import SchemeDialog from './SchemeDialog.vue'

// 备选参与搜素的项目
let listColumns = reactive<SearchColumnItem[]>([])
listColumns = demoList

// 初始渲染的搜索条件，这里还没加入默认查询方案
let defaultColumns = ref<SearchFormItem[]>(
  listColumns
    .filter((cur) => cur.isDefault)
    .map((cur) => {
      return {
        code: cur.code,
        condition: cur.condition,
        value: '',
        type: cur.type,
        andOr: cur.andOr
      }
    })
)

// 组合搜索条件
const searchParams = reactive({
  andOr: 'and',
  params: [{}]
})

let itemRefs: Array<any> = []
function setRef(el: HTMLElement | ComponentPublicInstance, index: number) {
  itemRefs[index] = el
}

function getSearchParmas() {
  searchParams.params = []
  itemRefs.forEach((element) => {
    if (element?.formData?.code) {
      searchParams.params.push(element.formData)
    }
  })
}

function search() {
  getSearchParmas()
}
function reset() {}

// 查询方案
let searchSchemes = ref([])
const strSchemes = localStorage.getItem('searchSchemes')
if (strSchemes) searchSchemes.value = JSON.parse(strSchemes)

let showSave = ref(false)
function triggerSave() {
  showSave.value = true
}

function saveScheme(payload: {}) {
  const { title, isDefault } = payload

  getSearchParmas()
  searchSchemes.value.push({
    title,
    isDefault,
    data: searchParams
  })

  localStorage.setItem('searchSchemes', JSON.stringify(searchSchemes.value))
}

function changeScheme(payload: []) {
  searchParams.andOr = payload.andOr
  defaultColumns.value = payload.params
}

let collapsed = ref(true)
let showMore = ref(true)
const maxCount = 6
let showCount = computed(() => {
  return showMore.value ? maxCount : 2
})
</script>

<style lang="scss" scoped>
.mo-senior-search {
  .search-form {
    position: relative;
    ul {
      display: flex;
      flex-wrap: wrap;
    }
    li {
      display: flex;
      margin-bottom: 4px;
      width: calc(50% - 44px);
      &:first-child {
        padding-left: 84px;
      }
      &:nth-child(2n) {
        margin-left: 88px;
      }
    }
    .main-option {
      position: absolute;
      left: calc(50% - 36px);
      top: calc(50% - 18px);
      width: 72px;
    }
  }
}
</style>
