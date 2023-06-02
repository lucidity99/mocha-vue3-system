import { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

const routes: RouteRecordRaw = {
  path: '/permission',
  name: 'permission',
  components: Layout,
  redirect: '/permission/index',
  meta: {
    title: 'permission',
    icon: 'ep-lock',
    order: 4
  },
  children: [
    {
      path: 'index',
      name: 'pagePermiss',
      component: () =>
        import(/* webpackChunkName: "permission" */ '~/views/permission/Permission.vue'),
      meta: {
        title: 'permission'
      }
    }
  ]
}

export default routes
