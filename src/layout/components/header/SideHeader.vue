<template>
  <div
    class="flex flex-col items-center justify-between header backdrop-blur-sm bg-white/75 dark:bg-black/75"
  >
    <div class="text-lg text-center">mocha Vue3 Admin</div>

    <div class="flex flex-col items-center justify-center">
      <SiteSearch class="mb-8" />
      <el-switch
        v-model="darkMode"
        inline-prompt
        :active-icon="Moon"
        :inactive-icon="Sunny"
        class="mb-8"
        @change="toggleDark()"
        style="--el-switch-on-color: #0960bd; --el-switch-off-color: #ff6600"
      />

      <Language class="mb-8" />

      <!-- 消息中心 -->
      <Message class="mb-8" />
      <ThemeSetting class="mb-8" />
      <!-- 用户头像 -->
      <el-avatar class="mb-8" :size="42" :src="imgurl" />
      <!-- 用户名下拉菜单 -->
      <el-dropdown class="mx-2" trigger="click" @command="handleCommand">
        <span class="flex items-center cursor-pointer"> </span>
        <template #dropdown>
          <el-dropdown-menu>
            <a href="https://github.com/lucidity99/mocha-vue3-system" target="_blank">
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>
            <el-dropdown-item command="user">个人中心</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useSidebarStore } from '~/store/sidebar'
import { useRouter } from 'vue-router'
import { SelectOptionItem } from '~/types/index'
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'
import imgurl from '~/assets/images/img.jpg'
import { useUserStore } from '~/store/user'
import SiteSearch from '../SiteSearch.vue'
import Message from '../Message.vue'
import Language from '../Language.vue'
import ThemeSetting from '../ThemeSetting.vue'

const isDark = useDark()
let darkMode = ref(false)
darkMode.value = isDark.value

const toggleDark = useToggle(isDark)

const userStore = useUserStore()

const tenantId = ref('mocha')
const tenantOptions: Array<SelectOptionItem> = reactive([{ value: 'mocha', label: 'mocha' }])

const username: string | null = userStore.username

const sidebar = useSidebarStore()
// 侧边栏折叠
const collapseChage = () => {
  sidebar.handleCollapse()
}

onMounted(() => {
  if (document.body.clientWidth < 1200) {
    collapseChage()
  }
})

// 用户名下拉菜单选择事件
const router = useRouter()
const handleCommand = (command: string) => {
  if (command == 'loginout') {
    userStore.userLogout()
    router.push('/login')
  } else if (command == 'user') {
    router.push('/system/profile')
  }
}
</script>
