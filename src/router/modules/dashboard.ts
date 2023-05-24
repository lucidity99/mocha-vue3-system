import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: 'dashboard',
      permiss: '1',
      icon: 'ep-sort',
      order: 1
    },
    redirect: '/dashboard/workbench',
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
