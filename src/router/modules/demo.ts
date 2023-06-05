import { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/demo',
    name: 'demo',
    component: Layout,
    meta: {
      title: '示例',
      icon: 'ep-collection',
      order: 11
    },
    redirect: '/demo/clientList',
    children: [
      {
        path: 'clientList',
        name: 'clientList',
        meta: {
          title: 'clientList'
        },
        component: () => import('~/views/demo/ClientList.vue')
      },
      {
        path: 'clientDetails',
        name: 'clientDetails',
        hidden: true,
        meta: {
          title: 'clientDetails'
        },
        component: () => import('~/views/demo/ClientDetails.vue')
      }
    ]
  }
]

export default routes
