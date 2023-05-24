import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/about',
    name: 'about',
    meta: {
      title: 'about',
      icon: 'ep-mic',
      order: 100
    },
    component: () => import('~/views/system/About.vue')
  }
]

export default routes
