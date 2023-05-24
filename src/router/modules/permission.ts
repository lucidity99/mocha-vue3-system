import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw = {
  path: '/permission',
  name: 'permission',
  meta: {
    title: 'permission',
    icon: 'ep-lock',
    order: 4
  },
  component: () => import(/* webpackChunkName: "permission" */ '~/views/permission/Permission.vue')
}

export default routes
