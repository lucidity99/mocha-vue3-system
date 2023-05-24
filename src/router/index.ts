import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import { useUserStore } from '~/store/user'
import Home from '~/layout/index.vue'

const modules = import.meta.glob('./modules/**/*.ts', { eager: true })

const routeModuleList: RouteRecordRaw[] = []

Object.values(modules).forEach((key: any) => {
  const mod = key.default || []
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
  routeModuleList.sort((a, b) => {
    const orderA = a?.meta?.order || 0
    const orderB = b?.meta?.order || 0
    return orderA - orderB
  })
})

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'home'
    },
    component: Home,
    redirect: '/dashboard/workbench',
    children: [...routeModuleList]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'signIn'
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/login/login.vue')
  },
  {
    path: '/403',
    name: '403',
    meta: {
      title: '没有权限'
    },
    component: () => import(/* webpackChunkName: "403" */ '../views/403.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  document.title = `${to.meta.title} | mocha vue3 admin`
  const role = userStore.username

  if (!role && to.path !== '/login') {
    next('/login')
  } else if (to.meta.permiss && !userStore.userPermiss.includes(to.meta.permiss)) {
    // 如果没有权限，则进入403
    next('/403')
  } else {
    next()
  }
})

export default router
