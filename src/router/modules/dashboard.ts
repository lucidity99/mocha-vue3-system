import { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Layout,
    redirect: '/dashboard/workbench',
    meta: {
      title: 'dashboard',
      icon: 'ep-sunrise',
      order: 1
    },

    children: [
      {
        path: 'workbench',
        name: 'workbench',
        meta: {
          title: 'workbench'
        },
        component: () => import('~/views/dashboard/Workbench.vue')
      },
      {
        path: 'analysis',
        name: 'analysis',
        meta: {
          title: 'analysis'
        },
        component: () => import('~/views/dashboard/Analysis.vue')
      }
    ]
  }
]

export default routes
