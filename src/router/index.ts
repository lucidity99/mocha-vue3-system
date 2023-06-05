import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('./modules/**/*.ts', { eager: true })

let routeModuleList: RouteRecordRaw[] = []

// 获取路由并排序
Object.values(modules).forEach((key: any) => {
  const mod = key.default || []
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

console.log(routeModuleList)

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard',
    hidden: true,
    meta: {
      title: 'home'
    }
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    meta: {
      title: 'signIn'
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/login/login.vue')
  },
  {
    path: '/403',
    name: '403',
    hidden: true,
    meta: {
      title: '没有权限'
    },
    component: () => import(/* webpackChunkName: "400" */ '../views/403.vue')
  }
]
const lastRoutes = [
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    hidden: true,
    meta: {
      title: '404'
    },
    component: () => import(/* webpackChunkName: "400" */ '../views/404.vue')
  }
]

let routes = constantRoutes

// 前端固定路由模式
if (import.meta.env.VITE_PERMISSION_MODE === 'CONSTANT') {
  routes = [...routeModuleList, ...constantRoutes]
}

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
export { constantRoutes, routeModuleList, lastRoutes }
