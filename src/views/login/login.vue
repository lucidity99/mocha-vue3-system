<template>
  <div class="login-wrap">
    <div class="login-left"></div>
    <div class="flex flex-col login-main">
      <div class="p-12 py-20 transition-all rounded hover:shadow-lg hover:bg-indigo-50">
        <h1 class="text-2xl">Welcome back</h1>
        <p class="text-sm text-gray-400">Enter the infomation you entered while registing</p>
        <el-form
          class="mt-8"
          :model="param"
          :rules="rules"
          ref="login"
          label-position="top"
          size="large"
        >
          <el-form-item prop="username" label="用户名">
            <el-input v-model="param.username" placeholder="username"> </el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input
              type="password"
              placeholder="password"
              v-model="param.password"
              @keyup.enter="submitForm(login)"
            >
            </el-input>
          </el-form-item>
          <div class="flex justify-between mb-4">
            <el-checkbox>记住我</el-checkbox>
            <el-link>忘记密码？</el-link>
          </div>
          <div>
            <el-button class="w-full" type="primary" @click="submitForm(login)">登录</el-button>
          </div>
          <div class="mt-4 text-sm text-gray-300">Tips : 用户名和密码任意</div>

          <!-- <div class="relative mt-4 text-center">
          <span class="relative z-10 px-2 text-sm text-gray-500 bg-white">or</span>
          <div class="absolute z-0 w-full border-b top-3"></div>
        </div> -->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useTagsStore } from '../../store/tags'
import { useUserStore } from '~/store/user'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { Lock, User } from '@element-plus/icons-vue'
import { UserInfo } from '~/types/index'

const router = useRouter()
const param = reactive<UserInfo>({
  username: 'admin',
  password: '123123'
})

const rules: FormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const userStore = useUserStore()
const login = ref<FormInstance>()
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      const result = await userStore.userLogin(param)

      if (result) {
        router.push('/')
      }
    }
  })
}

const tags = useTagsStore()
tags.clearTags()
</script>

<style scoped lang="scss">
.login-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
}
.login-left {
  position: absolute;
  width: 50%;
  height: 100vh;
  background-image: url(~/assets/images/login-vector.png);
  background-size: contain;
  background-position: 80% center;
  background-repeat: no-repeat;
}
.login-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: calc(50% + 100px);
  width: 460px;

  height: 100%;
}
</style>
