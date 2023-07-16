<template>
  <div class="shadow mo-tags backdrop-blur-sm bg-white/75 dark:bg-black/75" v-if="tags.show">
    <el-scrollbar>
      <ul v-click-outside="onClickOutside">
        <li
          v-for="(item, index) in tags.list"
          :key="item.path"
          :class="isActive(item.path) ? 'active' : ''"
        >
          <span
            class="cursor-pointer"
            @click="changeTab(item.path)"
            @contextmenu.prevent="openContext($event, index)"
            >{{ $t(`route.${item.title}`) }}</span
          >
          <i-ep-close @click="removeTag(item.path)"></i-ep-close>
        </li>
      </ul>
    </el-scrollbar>

    <div
      class="fixed flex flex-col px-2 py-1 text-xs leading-8 text-center bg-white rounded shadow-lg"
      :style="{ left: `${contextmenuPositon.left}px`, top: `${contextmenuPositon.top}px` }"
      v-show="contextmenuShow"
    >
      <div @click="closeOther">
        <el-button :icon="Close" link size="small">关闭其他页签</el-button>
      </div>
      <div class="cursor-default" @click="closeAll">
        <el-button :icon="Minus" link size="small">关闭所有页签</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import { useTagsStore } from '~/store/tags'
import { useSidebarStore } from '~/store/sidebar'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { Close, Minus } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const tags = useTagsStore()
const siderbarStore = useSidebarStore()

const isActive = (path: string) => {
  return path === route.fullPath
}

function changeTab(e: string) {
  router.push(e)
}

let contextmenuShow = ref(false)
let contextmenuPositon = ref({ top: 0, left: 0 })
let currentIndex = ref(0)

function openContext(e: Event, index: number) {
  contextmenuShow.value = true
  currentIndex.value = index
  const { top, left } = getParentOffset(e.target)

  contextmenuPositon.value = {
    top: top - 38,
    left: left + e?.target?.clientWidth - (siderbarStore.collapse ? 64 : 200) - 84
  }
}

// 获取父元素的相对位移
function getParentOffset(el: any) {
  let offset = { top: 0, left: 0 }
  offset.top = el.offsetTop
  offset.left = el.offsetLeft

  if (el.offsetParent != null) {
    let offsetParent = getParentOffset(el.offsetParent)
    offset.top += offsetParent.top
    offset.left += offsetParent.left
  }
  return offset
}

const onClickOutside = () => {
  contextmenuShow.value = false
}

function removeTag(e: string) {
  const index = tags.list.findIndex((cur) => cur.path === e)

  tags.delTagsItem(index)
  const item = tags.list[index] ? tags.list[index] : tags.list[index - 1]
  if (item) {
    router.push(item.path)
  } else {
    router.push('/')
  }
}

// 设置标签
const setTags = (route: any) => {
  const isExist = tags.list.some((item) => {
    return item.path === route.fullPath
  })

  if (!isExist) {
    tags.setTagsItem({
      name: route.name,
      title: route.meta.title,
      path: route.fullPath
    })
  }
}
setTags(route)

watch(route, (newVal) => {
  console.log(route)
  setTags(route)
})

// onBeforeRouteUpdate((to) => {
//   console.log(to, 111)
//   setTags(to)
// })

// 关闭全部标签
const closeAll = async () => {
  tags.clearTags()

  await router.push('/')

  setTags(route)
}
// 关闭其他标签
const closeOther = () => {
  const curItem = tags.list.filter((item) => {
    return item.path === route.fullPath
  })
  tags.closeTagsOther(curItem)
}
</script>

<style lang="scss">
.mo-tags {
  position: fixed;
  top: 60px;
  z-index: 1001;
  left: 200px;
  right: 0;
  height: 30px;
  transition: left 0.3s ease-in-out, width 0.3s ease-in-out;

  &.tag-collapse {
    left: 64px;
  }

  ul {
    display: flex;

    li {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      padding-right: 4px;
      height: 24px;
      margin-top: 3px;
      font-size: 12px;

      margin-right: 2px;
      border: 1px solid var(--el-border-color);
      background: var(--el-fill-color-blank);
      border-radius: 2px;

      > span {
        padding: 0 4px 0 8px;
      }

      &.active {
        color: var(--el-color-primary);
      }

      &:hover {
        background-color: var(--el-bg-color-page);
      }
    }
  }
}
</style>
