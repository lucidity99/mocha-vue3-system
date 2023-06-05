import { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

const routes: RouteRecordRaw = {
  path: '/permission',
  name: 'permissions',
  component: Layout,
  redirect: '/permission/index',
  meta: {
    title: 'permission',
    icon: 'ep-lock',
    order: 4
  },
  children: [
    {
      path: 'index',
      name: 'buttonPermission',
      component: () =>
        import(/* webpackChunkName: "permission" */ '~/views/permission/ButtonPermission.vue'),
      meta: {
        title: 'permission'
      }
    }
  ]
}

export default routes
