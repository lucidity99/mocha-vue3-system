<template>
  <div class="cursor-pointer" @click="visible = true">
    <i-ep-brush />
  </div>
  <el-dialog title="UI主题设置" v-model="visible" width="800px" append-to-body>
    <div class="flex">
      <div class="w-1/2 mr-8">
        <h3 class="text-lg">选择布局</h3>
        <p class="text-gray-400">选择你想要使用的布局</p>
        <div class="flex flex-wrap mt-4 rounded bg-gray-50">
          <div class="w-1/2 p-2" v-for="l in layouts">
            <img :src="l.pic" @click="changeLayout(l.name)" />
          </div>
        </div>
      </div>
      <div class="w-1/2 mr-8">
        <h3 class="text-lg">选择配色方案</h3>
        <p class="text-gray-400">选择一种配色方案</p>
        <div class="flex flex-wrap mt-4">
          <div v-for="item in themes" @click="changeTheme(item.name)" class="flex items-center p-2">
            <span
              :style="{ backgroundColor: item.color }"
              class="inline-flex items-center justify-center w-8 h-8 p-1 rounded cursor-pointer"
              :class="useTheme.scheme === item.name ? ['border-4', 'border-double'] : ''"
            ></span>
          </div>
        </div>

        <h3 class="mt-8 text-lg">自定义配色</h3>
        <p class="text-gray-400">自定义主题颜色</p>
        <div class="mt-4">
          <el-form size="mini" label-width="80px">
            <div class="flex flex-wrap">
              <el-form-item
                prop="primary"
                :label="colors[c as keyof typeof colors].label"
                v-for="c in Object.keys(colors)"
              >
                <el-color-picker
                  v-model="colors[c as keyof typeof colors].value"
                  @change="changeColor($event, colors[c as keyof typeof colors].key)"
                />
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useThemeStore } from '~/store/theme'

let visible = ref(false)

const useTheme = useThemeStore()
const layouts = [
  {
    name: '1',
    pic: 'https://tairo.cssninja.io/img/illustrations/switcher/layout-sidebar-default.svg'
  },
  {
    name: '2',
    pic: 'https://tairo.cssninja.io/img/illustrations/switcher/layout-sidebar-default.svg'
  },
  {
    name: '3',
    pic: 'https://tairo.cssninja.io/img/illustrations/switcher/layout-sidebar-default.svg'
  },
  {
    name: '4',
    pic: 'https://tairo.cssninja.io/img/illustrations/switcher/layout-sidebar-default.svg'
  }
]
const themes = [
  { name: 'blue', color: '#0052d9' },
  { name: 'red', color: '#ff2551' },
  { name: 'pink', color: '#f47983' },
  { name: 'green', color: '#0c8918' },
  { name: 'brown', color: '#ae7000' },
  { name: 'grape', color: '#725e82' }
]

function changeTheme(theme: string) {
  document.getElementsByTagName('html')[0].className = theme
  useTheme.scheme = theme
  setCssVars()
}

const currentCss = getComputedStyle(document.querySelector('html') as Element)

let colors = reactive({
  primary: { label: '主要颜色', value: '', key: '--el-color-primary' },
  info: { label: '次要颜色', value: '', key: '--el-color-info' },
  warning: { label: '警告颜色', value: '', key: '--el-color-warning' },
  danger: { label: '危险颜色', value: '', key: '--el-color-danger' },
  bg: { label: '背景颜色', value: '', key: '--el-bg-color' }
})

function setCssVars() {
  console.log(useTheme.css)
  colors.primary.value =
    useTheme.css['--el-color-primary'] || currentCss.getPropertyValue('--el-color-primary')

  colors.info.value = currentCss.getPropertyValue('--el-color-info')
  colors.warning.value = currentCss.getPropertyValue('--el-color-warning')
  colors.danger.value = currentCss.getPropertyValue('--el-color-danger')
  colors.bg.value = currentCss.getPropertyValue('--el-bg-color')
}

function changeLayout(layout: string) {}

function changeColor(color: string, css: string) {
  document.querySelector('html').className = ''
  document.documentElement.style.setProperty(css, color)
  useTheme.setCustomized(colors)
  useTheme.setScheme('')
}

onMounted(() => {
  setCssVars()
})
</script>
