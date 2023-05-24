import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/chart',
    name: 'chart',
    meta: {
      title: 'chart',
      icon: 'ep-pie-chart',
      order: 9
    },
    children: [
      {
        path: 'echart',
        name: 'echart',
        meta: {
          title: 'eChart'
        },
        component: () => import('~/views/chart/EChart.vue')
      }
    ]
  }
]

export default routes
