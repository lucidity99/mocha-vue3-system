import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login } from '~/api/user'
import { UserInfo } from '~/types/index'

export const useUserStore = defineStore(
  'user',
  () => {
    let username = ref('')
    let userPermiss = ref([])

    // 用户登录
    async function userLogin(param: UserInfo) {
      const { username: name, permiss } = await login({
        username: param.username,
        password: param.password
      })
      if (name) {
        username.value = name
        userPermiss.value = permiss

        return true
      }
      return false
    }

    // 退出登录
    function userLogout() {
      username.value = ''
      userPermiss.value = []
    }

    return { username, userPermiss, userLogin, userLogout }
  },
  {
    persist: true
  }
)
