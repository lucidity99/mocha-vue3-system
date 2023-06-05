import { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/demo',
    name: 'demo',
    component: Layout,
    meta: {
      title: 'demo',
      icon: 'ep-collection',
      order: 11
    },
    redirect: '/demo/clientList',
    children: [
      {
        path: 'provideAndInject',
        name: 'provide&provideAndInject',
        meta: {
          title: 'provideAndInject'
        },
        component: () =>
          import(/* webpackChunkName: "feat" */ '~/views/demo/provideInject/index.vue')
      },
      {
        path: 'jsx',
        name: 'jsx',
        meta: {
          title: 'jsx'
        },
        component: () => import(/* webpackChunkName: "feat" */ '~/views/demo/jsx/SimpleJxs.vue')
      }
    ]
  }
]

export default routes
