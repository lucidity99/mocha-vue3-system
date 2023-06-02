import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login } from '~/api/user'
import { UserInfo } from '~/types/index'
import { RouteRecordRaw } from 'vue-router'
import { routeModuleList } from '~/router'
import router from '~/router'
import systemApi from '~/api/system'

export const useUserStore = defineStore(
  'user',
  () => {
    let userid = ref()
    let username = ref('')
    let permiss = ref(['btn_more', 'btn-edit', 'btn-delelte'])
    let role = ref('')
    let routes = ref()

    // 用户登录
    async function userLogin(param: UserInfo) {
      const res = await login({
        username: param.username,
        password: param.password
      })

      if (res.userid) {
        setUserInfo(res)

        return true
      }
      return false
    }

    function setUserInfo(userData: UserInfo) {
      userid.value = userData.userid
      username.value = userData.username
      userData.permiss && (permiss.value = userData.permiss)
      userData.role && (role.value = userData.role)
    }

    // 获取动态路由
    function setAsyncRoutes(data: RouteRecordRaw[]) {
      routes.value = data
    }

    const menuRoutes = computed(() => routes.value.filter((item: RouteRecordRaw) => !item.hidden))

    // 退出登录
    function userLogout() {
      username.value = ''
      role.value = ''
      permiss.value = []
      routes.value = []
    }

    return {
      userid,
      username,
      permiss,
      role,
      routes,
      menuRoutes,
      userLogin,
      userLogout,
      setUserInfo,
      setAsyncRoutes
    }
  },
  {
    persist: true
  }
)
